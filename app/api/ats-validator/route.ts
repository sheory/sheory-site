import { NextResponse } from "next/server"

const actionVerbs = [
  "developed", "created", "built", "designed", "implemented",
  "led", "managed", "organized", "coordinated", "increased", "improved",
  "optimized", "achieved", "delivered", "mentored", "supported", "launched",
  "desenvolvi", "criei", "liderei", "implementei", "otimizei",
  "coordenei", "melhorei", "realizei", "gerenciei"
]

const impactWords = [
  "improved", "increased", "reduced", "grew", "achieved", "boosted",
  "delivered", "scaled", "aumentei", "reduzi", "melhorei", "ampliei",
  "otimizei", "entreguei", "alcancei"
]

const skillWords = [
  "python", "javascript", "typescript", "react", "angular", "vue", "node",
  "fastapi", "flask", "django", "aws", "azure", "gcp", "docker", "kubernetes",
  "sql", "mongodb", "postgresql", "mysql", "redis", "leadership",
  "communication", "teamwork", "creativity", "project management",
  "marketing", "design", "excel", "gestao", "comunicacao", "organizacao",
  "colaboracao", "planejamento"
]

const buzzwords = [
  "apaixonado", "apaixonada", "dinamico", "inovador", "criativo", "dedicado",
  "motivado", "passionate", "innovative", "dynamic", "hardworking",
  "enthusiastic", "results-driven"
]

export async function POST(req: Request) {
  try {
    const resume = await req.json()
    const result = calculateATSScore(resume)
    return NextResponse.json(result)
  } catch (err: any) {
    console.error("Erro no ATS Validator:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function calculateATSScore(resume: any) {
  const experiences = resume.experiences || []
  const education = resume.education || []
  const headline = resume.desiredRole || ""
  const fullName = resume.fullName || ""

  const text = [
    headline,
    fullName,
    resume.email,
    resume.linkedin,
    resume.github,
    ...(experiences.map((e: any) => [
      e.role,
      e.company,
      e.responsibilities?.join(" ") || ""
    ]).flat()),
    ...(education.map((e: any) => [e.institution, e.degree]).flat())
  ].join(" ").toLowerCase()

  // --- STRUCTURE ---
  let structure = 0
  if (fullName) structure += 20
  if (headline) structure += 20
  if (experiences.length > 0) structure += 40
  if (education.length > 0) structure += 20

  // --- CLARITY ---
  const verbMatches = actionVerbs.filter(v => text.includes(v))
  const unclearPhrases = (text.match(/responsavel|responsible for|helped with|participava/i) || [])
  let clarity = Math.min(100, verbMatches.length * 10)
  clarity -= unclearPhrases.length * 10
  if (clarity < 0) clarity = 0

  // --- IMPACT ---
  const hasNumbers = /\d+[%\+]?/.test(text)
  const hasImpact = impactWords.some(w => text.includes(w))
  let impact = (hasNumbers ? 60 : 0) + (hasImpact ? 40 : 0)
  impact = Math.min(impact, 100)

  // --- SKILLS ---
  const skillCount = skillWords.filter(s => text.includes(s)).length
  const skills = skillCount >= 10 ? 100 : skillCount >= 5 ? 80 : skillCount >= 2 ? 60 : 40

  // --- PROFESSIONALISM ---
  let professionalism = 0
  if (resume.email && /\S+@\S+\.\S+/.test(resume.email)) professionalism += 20
  if (/linkedin\.com\/in\//i.test(text)) professionalism += 20
  if (!buzzwords.some(w => text.includes(w))) professionalism += 20
  if (headline.length > 10) professionalism += 20
  if (experiences.some((e: any) => e.startDate && e.endDate)) professionalism += 20
  professionalism = Math.min(professionalism, 100)

  // --- FINAL SCORE ---
  let score =
    structure * 0.25 +
    clarity * 0.25 +
    impact * 0.25 +
    skills * 0.15 +
    professionalism * 0.10

  score = Math.round(score)
  if (score > 100) score = 100

  // --- INSIGHTS / WARNINGS ---
  const insights: string[] = []
  if (impact < 50)
    insights.push("Inclua resultados mensuráveis (ex: reduziu tempo de resposta em 30%).")
  if (clarity < 50)
    insights.push("Use verbos fortes para demonstrar impacto (ex: desenvolvi, implementei, otimizei).")
  if (skills < 60)
    insights.push("Liste suas principais habilidades técnicas e interpessoais.")
  if (!resume.email)
    insights.push("Inclua um e-mail profissional no currículo.")
  if (!resume.linkedin && !/linkedin\.com\/in\//i.test(text))
    insights.push("Adicione seu LinkedIn no cabeçalho.")
  if (!resume.github)
    insights.push("Inclua seu GitHub ou portfólio profissional.")
  if (buzzwords.some(w => text.includes(w)))
    insights.push("Evite clichês como 'dinâmico' ou 'apaixonado por tecnologia'.")

  // --- COMO CHEGAR A 100 ---
  const missing: string[] = []
  if (!resume.desiredRole)
    missing.push("Inclua um cargo desejado ou headline clara.")
  if (unclearPhrases.length > 0)
    missing.push("Evite termos genéricos como 'responsável por' e prefira ações diretas.")
  if (!resume.github)
    missing.push("Inclua seu GitHub ou portfólio profissional.")

  // --- HIGHLIGHTS ---
  const highlights: any[] = []
  unclearPhrases.forEach((p) =>
    highlights.push({
      type: "clarity",
      severity: "warning",
      text: p,
      suggestion: "Substitua por verbos de ação (ex: 'Developed', 'Implemented', 'Led')."
    })
  )

  return {
    score,
    sections: { structure, clarity, impact, skills, professionalism },
    insights,
    missing,
    highlights
  }
}
