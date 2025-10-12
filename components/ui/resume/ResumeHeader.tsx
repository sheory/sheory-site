"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Linkedin, HelpCircle, Loader2, CheckCircle2 } from "lucide-react"
import { useState, useRef } from "react"
import type { ResumeFormData } from "@/app/curriculo/page"

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>
}

export function ResumeHeader({ setFormData }: Props) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => fileInputRef.current?.click()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setSuccess(false)

    try {
      // 📤 Envia o PDF para o novo parser gratuito (pdfplumber)
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/resume-parser", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      console.log("📄 Dados retornados do parser:", data)

      if (!res.ok || data.error) {
        throw new Error(data.error || "Falha ao processar o PDF")
      }

      // 🧠 Atualiza os campos retornados
      setFormData((prev) => ({
        ...prev,
        fullName: data.fullName || prev.fullName,
        desiredRole: data.headline || prev.desiredRole,
        email: data.email || prev.email,
        linkedin: data.linkedin || prev.linkedin,
        city: data.city || prev.city,
        experiences: Array.isArray(data.experiences)
          ? data.experiences.map((exp: any) => ({
              id: crypto.randomUUID(),
              company: exp.company || "",
              role: exp.role || "",
              startDate: exp.period?.split(" - ")[0] || "",
              endDate: exp.period?.split(" - ")[1] || "",
              location: exp.location || "",
              responsibilities: exp.responsibilities || [],
            }))
          : prev.experiences,
        education: Array.isArray(data.education)
          ? data.education.map((edu: any) => ({
              id: crypto.randomUUID(),
              institution: edu.institution || "",
              degree: edu.degree || "",
              location: edu.location || "",
              period: edu.period || "",
            }))
          : prev.education,
        skills: Array.isArray(data.skills) ? data.skills : prev.skills,
      }))

      // 🎉 Feedback visual
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error("❌ Erro ao enviar PDF:", err)
      alert("Não foi possível processar o arquivo. Verifique se é o PDF exportado do LinkedIn.")
    } finally {
      setLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold mb-4 gradient-text">
        Crie seu Currículo Profissional
      </h1>
      <p className="text-lg text-gray-300 mb-6">
        Monte seu currículo seguindo padrões ATS e melhore com IA
      </p>

      <div className="flex justify-center gap-4 items-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
          className="hidden"
        />

        <Button
          onClick={handleButtonClick}
          variant="outline"
          disabled={loading}
          className="cursor-pointer bg-transparent"
          style={{
            borderColor: "var(--accent-cyan)",
            color: "var(--accent-cyan)",
          }}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...
            </>
          ) : success ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-400" /> Importado com sucesso!
            </>
          ) : (
            <>
              <Linkedin className="mr-2 h-4 w-4" /> Upload currículo LinkedIn
            </>
          )}
        </Button>

        <Link
          href="/ajuda/importar-linkedin"
          className="flex items-center gap-2 text-gray-400 hover:text-[var(--accent-cyan)] transition-colors cursor-pointer"
        >
          <HelpCircle className="h-4 w-4" />
          <span className="text-sm">Não sabe importar? Aprenda aqui</span>
        </Link>
      </div>
    </div>
  )
}
