import sys, re, json, unicodedata, pdfplumber

def normalize(s: str) -> str:
    return unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode("utf-8").lower()

def extract_text(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += (page.extract_text() or "") + "\n"
    return text


def segment_sections(text):
    """Divide o texto em seções (Experiência, Educação etc.)."""
    sections = {"header": []}
    normalized = text.replace("\r", "").split("\n")
    current = "header"

    for line in normalized:
        clean = line.strip()
        if not clean:
            continue
        n = normalize(clean)

        if re.search(r"\b(resumo|summary)\b", n):
            current = "summary"
            sections[current] = []
            continue
        if re.search(r"\b(experiencia|experience|work experience)\b", n):
            current = "experience"
            sections[current] = []
            continue
        if re.search(r"\b(formacao|education|academic|formacao academica)\b", n):
            current = "education"
            sections[current] = []
            continue

        sections.setdefault(current, []).append(clean)

    return sections


# Cabeçalho (já ok)
def extract_header_info(lines):
    full_text = " ".join(lines)
    email = re.search(r"[\w\.-]+@[\w\.-]+\.\w+", full_text)
    city = re.search(r"[A-Z][a-z]+,?\s?(Bahia|Brasil|Brazil)", full_text)

    linkedin_match = re.search(
        r"(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9\-\_]+", full_text, re.I
    )
    linkedin = linkedin_match.group(0) if linkedin_match else ""

    name = ""
    headline = ""
    for i in range(len(lines) - 1):
        if re.search(r"(Resumo|Summary)", lines[i], re.I):
            name = lines[i - 2] if i >= 2 else ""
            headline = lines[i - 1] if i >= 1 else ""
            break

    if not name:
        name = next((l for l in lines if re.match(r"^[A-Z][a-z]+(\s[A-Z][a-z]+)+$", l)), "")
    if not headline:
        headline = next((l for l in lines if "|" in l or "developer" in l.lower()), "")

    name = re.sub(r"(?i)(contato|contact)\s*", "", name)
    return {
        "fullName": name.strip(),
        "headline": headline.strip(),
        "email": email.group(0) if email else "",
        "linkedin": linkedin.strip(),
        "city": city.group(0) if city else ""
    }


# 💼 EXPERIÊNCIAS
def extract_experiences(lines):
    """
    Extrai experiências de trabalho de PDFs do LinkedIn.
    Detecta empresas, cargos multilinha e responsabilidades.
    Evita falsos positivos (ex: tecnologias).
    Trata quebra entre páginas ("Page X of Y").
    """
    experiences = []
    block = []
    skip_next_company_check = False  # impede quebrar logo após "Page X of Y"

    # termos técnicos comuns que não devem ser tratados como empresa
    tech_words = {
        "python", "aws", "azure", "google", "redis", "mongodb", "postgresql",
        "mysql", "fastapi", "flask", "django", "javascript", "typescript",
        "react", "vue", "node", "kafka", "docker", "kubernetes", "jenkins",
        "rancher", "html", "css", "jquery", "github", "git", "splunk", "datadog"
    }

    def looks_like_company(line):
        """Heurística para detectar se uma linha é uma empresa."""
        clean = line.strip()
        if not clean:
            return False
        if len(clean.split()) > 6:
            return False
        if "|" in clean or "@" in clean or re.search(r"\d{4}", clean):
            return False
        words = {w.lower() for w in re.findall(r"[A-Za-zÀ-ÿ]+", clean)}
        if words & tech_words:
            return False
        return bool(re.match(r"^[A-Z]", clean))

    def flush_block():
        """Processa o bloco atual e adiciona como experiência válida."""
        nonlocal block
        if not block:
            return

        # ignora cabeçalhos de página
        block = [l.strip() for l in block if l.strip() and not re.match(r"^Page\s*\d+\s*of\s*\d+", l, re.I)]
        if not block:
            return

        company, role, period = "", "", ""
        responsibilities = []

        # Empresa = primeira linha
        company = block[0]

        # Lista de meses em inglês e português
        months = [
            "january", "february", "march", "april", "may", "june", "july",
            "august", "september", "october", "november", "december",
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ]

        # 🔍 Detecta linha de datas (que contenha mês)
        date_idx = None
        for i, l in enumerate(block):
            if any(m in l.lower() for m in months):
                period = l
                date_idx = i
                break

        # 🔹 Limpa o período — remove parênteses tipo "(2 years 3 months)"
        if period:
            period = re.sub(r"\([^)]*\)", "", period).strip()

        # 🔹 Role = todas as linhas entre a empresa e a data
        if date_idx:
            role = " ".join(block[1:date_idx]).strip()
            resp_lines = block[date_idx + 1:]
        else:
            # fallback se não encontrar mês
            role = " ".join(block[1:3]).strip()
            resp_lines = block[3:]

        # 🔹 Responsabilidades = tudo após a linha de data
        if resp_lines:
            paragraph = " ".join(resp_lines)
            paragraph = re.sub(r"\s*•\s*", " ", paragraph)
            paragraph = re.sub(re.escape(role), "", paragraph, flags=re.I)
            responsibilities = [paragraph.strip()]

        # Validação mínima
        if company and (role or responsibilities):
            experiences.append({
                "company": company.strip(),
                "role": role.strip(),
                "period": period.strip(),
                "responsibilities": responsibilities,
            })

    # percorre as linhas detectando início de novos blocos
    for line in lines:
        clean = line.strip()
        if not clean:
            continue

        # ignora cabeçalhos de página
        if re.match(r"^Page\s*\d+\s*of\s*\d+", clean, re.I):
            skip_next_company_check = True
            continue

        # detecta nova empresa
        if looks_like_company(clean) and not skip_next_company_check:
            flush_block()
            block = [clean]
        else:
            block.append(clean)
            skip_next_company_check = False

    flush_block()
    return experiences


# 🎓 EDUCAÇÃO
def extract_education(lines):
    education = []
    block = []
    for line in lines:
        if not line.strip():
            continue
        if re.match(r"^[A-Z]{2,}.*$", line):
            if block:
                education.append(block)
            block = [line]
        else:
            block.append(line)
    if block:
        education.append(block)

    parsed = []
    for blk in education:
        institution = blk[0]
        degree = ""
        period = ""
        for l in blk[1:]:
            if re.search(r"\d{4}", l):
                period = l
            else:
                degree += " " + l
        parsed.append({
            "institution": institution.strip(),
            "degree": degree.strip(),
            "period": period.strip(),
        })
    return parsed


def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No file path provided"}))
        return

    pdf_path = sys.argv[1]
    try:
        text = extract_text(pdf_path)
        sections = segment_sections(text)
        header = extract_header_info(sections.get("header", []))
        experiences = extract_experiences(sections.get("experience", []))
        education = extract_education(sections.get("education", []))

        print(json.dumps({
            **header,
            "experiences": experiences,
            "education": education
        }, ensure_ascii=False, indent=2))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)


if __name__ == "__main__":
    main()
