"use client"

import { useEffect, useState } from "react"
import { ResumeScore } from "@/components/ui/resume/ResumeScore"
import { ResumePersonalInfoForm } from "@/components/ui/resume/ResumePersonalInfoForm"
import { ResumeSkillsForm } from "@/components/ui/resume/ResumeSkillsForm"
import { ResumeExperienceForm } from "@/components/ui/resume/ResumeExperienceForm"
import { ResumeEducationForm } from "@/components/ui/resume/ResumeEducationForm"
import { ResumeActions } from "@/components/ui/resume/ResumeActions"
import { ResumePreview } from "@/components/ui/resume/ResumePreview"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export interface Experience {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  responsibilities: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  location: string
  period: string
}

export interface ResumeFormData {
  fullName: string
  desiredRole: string
  email: string
  phone: string
  linkedin: string
  github: string
  city: string
  skills: string[]
  experiences: Experience[]
  education: Education[]
}

export default function ResumeBuilderPage() {
  const [formData, setFormData] = useState<ResumeFormData>({
    fullName: "Sheory Martins",
    desiredRole: "Backend Developer",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    city: "",
    skills: ["Python", "FastAPI"],
    experiences: [
      {
        id: "exp1",
        company: "Fintech",
        role: "Backend Developer",
        location: "Remote",
        startDate: "Jul 2022",
        endDate: "Apr 2023",
        responsibilities: ["APIs, microservices, performance"],
      },
    ],
    education: [],
  })

  const [atsData, setAtsData] = useState<any>(null)

  // Restaura dados salvos localmente
  useEffect(() => {
    const saved = localStorage.getItem("resumeFormData")
    if (saved) setFormData(JSON.parse(saved))
  }, [])

  // Salva automaticamente no localStorage
  useEffect(() => {
    localStorage.setItem("resumeFormData", JSON.stringify(formData))
  }, [formData])

  // Limpar dados
  const handleClear = () => {
    if (confirm("Deseja limpar todos os dados do currículo?")) {
      setFormData({
        fullName: "",
        desiredRole: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        city: "",
        skills: [],
        experiences: [],
        education: [],
      })
      setAtsData(null)
      localStorage.removeItem("resumeFormData")
    }
  }

  // Gerar PDF
  const handleGeneratePDF = async () => {
    const el = document.getElementById("resume-preview")
    if (!el) return
    const html2pdf = (await import("html2pdf.js")).default
    html2pdf()
      .from(el)
      .set({
        margin: 0.5,
        filename: `${formData.fullName || "curriculo"}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait" },
      })
      .save()
  }

  // Placeholder IA
  const handleAIEnhance = () => {
    alert("✨ Em breve: aprimoramento automático com IA!")
  }

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_left,_#0a0a12_0%,_#1b1528_60%)]">
      {/* === Header fixo === */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="glass-light rounded-full px-6 py-3 flex items-center justify-between border border-white/10 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <div className="text-white font-bold">Sheory.dev</div>
            <div className="text-sm text-white/60">/resume/builder</div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/resume" className="text-sm text-white/80 hover:text-white">
              Voltar
            </Link>
            <button className="text-sm text-white/80 hover:text-white">Ajuda</button>
            <button className="p-2 rounded-full bg-white/10">🌙</button>
          </div>
        </div>
      </header>

      {/* === Conteúdo principal === */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-28">
        {/* Score ATS */}
        <div className="mb-12">
          <ResumeScore resumeData={formData} onAtsUpdate={setAtsData} />
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Coluna esquerda - Forms */}
          <div className="space-y-8">
            <ResumePersonalInfoForm
              formData={formData}
              setFormData={setFormData}
              atsData={atsData}
            />
            <ResumeSkillsForm formData={formData} setFormData={setFormData} />
            <ResumeExperienceForm formData={formData} setFormData={setFormData} />
            <ResumeEducationForm formData={formData} setFormData={setFormData} />
            <ResumeActions
              onGeneratePDF={handleGeneratePDF}
              onClear={handleClear}
              onAIEnhance={handleAIEnhance}
            />
          </div>

          {/* Coluna direita - Preview */}
          <div className="lg:sticky lg:top-20 h-fit">
            <ResumePreview formData={formData} atsData={atsData} />
          </div>
        </div>
      </div>
    </div>
  )
}
