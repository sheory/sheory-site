import { NextResponse } from "next/server"
import pdf from "pdf-parse"
import { mkdir, writeFile } from "fs/promises"
import path from "path"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const file = data.get("file") as File
    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = path.join(process.cwd(), "public/uploads")
    await mkdir(uploadsDir, { recursive: true })
    await writeFile(path.join(uploadsDir, file.name), buffer)

    const parsed = await pdf(buffer)
    const rawText = parsed.text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    // --- 🧠 Extrai nome, headline e cidade (antes de Summary/Resumo) ---
    const linesAll = rawText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)

    const summaryIndex = linesAll.findIndex((l) =>
      /(Resumo|Summary)/i.test(l)
    )

    let fullName = ""
    let headline = ""
    let city = ""

    if (summaryIndex > 2) {
      fullName = linesAll[summaryIndex - 3] || ""
      headline = linesAll[summaryIndex - 2] || ""
      city = linesAll[summaryIndex - 1] || ""
    } else {
      // fallback se não achar Summary/Resumo
      const likelyName = linesAll.find((l) =>
        /^[A-Z][A-Za-zÀ-ÿ'’\-]+(\s[A-Z][A-Za-zÀ-ÿ'’\-]+)+$/.test(l)
      )
      const nameIndex = linesAll.indexOf(likelyName || "")
      fullName = likelyName || ""
      headline = linesAll[nameIndex + 1] || ""
      city = linesAll[nameIndex + 2] || ""
    }

    // --- Corta o texto para começar em "Experiência" ---
    const blocks = rawText.split(/\n\s*\n/).map((b) => b.trim())
    const expStartIndex = blocks.findIndex(
      (b) =>
        /Experi[êe]ncia|Experience/i.test(b) &&
        (b.match(/\d{4}/g)?.length ?? 0) > 0
    )
    const expText =
      expStartIndex !== -1 ? blocks.slice(expStartIndex).join("\n\n") : rawText

    // --- Linhas preservadas da seção de experiência ---
    const lines = expText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)

    const startIndex = lines.findIndex((l) =>
      /Experi[êe]ncia|Experience/i.test(l)
    )
    const endIndex =
      lines.findIndex((l, i) =>
        i > startIndex
          ? /(Forma[cç][aã]o|Education|Acad[êe]mica|Academic|Educaci[oó]n)/i.test(
              l
            )
          : false
      ) || lines.length

    const expLines = lines.slice(startIndex + 1, endIndex)

    // --- Regex de datas ---
    const dateRegex =
      /([A-Za-zçÇ]{3,15}\sde?\s?\d{4}|\b\d{4}\b)\s*[-–]\s*([A-Za-zçÇ]{3,15}\sde?\s?\d{4}|\b\d{4}\b|Present|Atual|Hoje)/i

    const experiences = []
    let current: any = null
    let collectingRole = false
    let collectingDescription = false

    for (let i = 0; i < expLines.length; i++) {
      const line = expLines[i]

      // Detecta nova empresa (ignora palavras isoladas e países)
      const isCompany =
        /^[A-Z][A-Za-zÀ-ÿ'’&.\s-]+$/.test(line) &&
        !/Experience/i.test(line) &&
        !dateRegex.test(line) &&
        !/^Page\s\d+/i.test(line) &&
        !/^(Brazil|Brasil|United States|USA|Canada|Portugal|Spain|France|Germany)$/i.test(line)

      if (isCompany) {
        if (current) experiences.push(current)
        current = {
          company: line,
          role: "",
          startDate: "",
          endDate: "",
          location: "",
          responsibilities: [],
        }
        collectingRole = true
        collectingDescription = false
        continue
      }

      if (!current) continue

      // --- Cargo (role) até encontrar data ---
      if (collectingRole && !dateRegex.test(line)) {
        current.role += (current.role ? " " : "") + line
        continue
      }

      // --- Datas ---
      if (dateRegex.test(line)) {
        const m = line.match(dateRegex)
        current.startDate = m?.[1] || ""
        current.endDate = m?.[2] || ""
        collectingRole = false
        collectingDescription = true
        continue
      }

      // --- Localização ---
      if (
        /^([A-Z][a-zÀ-ÿ]+(?:,\s?[A-Z][a-zÀ-ÿ]+){0,2}|Brazil|Brasil|United States|Canada|Portugal|Spain|France|Germany)$/i.test(
          line
        )
      ) {
        current.location = line
        continue
      }

      // --- Ignora páginas ---
      if (/^Page\s\d+/i.test(line)) continue

      // --- Responsabilidades ---
      if (collectingDescription && line.length > 3) {
        const last = current.responsibilities[current.responsibilities.length - 1]
        if (last && last.length < 80) {
          current.responsibilities[current.responsibilities.length - 1] = `${last} ${line}`
        } else {
          current.responsibilities.push(line)
        }
      }
    }

    if (current) experiences.push(current)

    // --- Educação ---
    const eduIndex = lines.findIndex((l) =>
      /(Forma[cç][aã]o|Education|Acad[êe]mica|Academic|Educaci[oó]n)/i.test(l)
    )
    const eduLines = eduIndex !== -1 ? lines.slice(eduIndex + 1) : []
    const eduText = eduLines.join(" ")
    const eduMatch = eduText.match(
      /([A-Z].+?)\s*,\s*(.+?)\s*\((\d{4}\s*[-–]\s*\d{4})\)/
    )
    const education = []
    if (eduMatch) {
      education.push({
        institution: (eduMatch[1] || "").trim(),
        degree: (eduMatch[2] || "").trim(),
        period: (eduMatch[3] || "").trim(),
        location: "",
      })
    }

    // --- Retorno final ---
    return NextResponse.json({
      success: true,
      fullName,
      headline,
      city,
      experiences,
      education,
      preview: expLines.slice(0, 40).join("\n"),
    })
  } catch (error: any) {
    console.error("Error while parsing PDF:", error)
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    )
  }
}
