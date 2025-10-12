"use client"

import { useEffect, useState } from "react"
import { ResumeHeader } from "@/components/ui/resume/ResumeHeader"
import { ResumeScore } from "@/components/ui/resume/ResumeScore"
import { ResumePersonalInfoForm } from "@/components/ui/resume/ResumePersonalInfoForm"
import { ResumeSkillsForm } from "@/components/ui/resume/ResumeSkillsForm"
import { ResumeExperienceForm } from "@/components/ui/resume/ResumeExperienceForm"
import { ResumeEducationForm } from "@/components/ui/resume/ResumeEducationForm"
import { ResumeActions } from "@/components/ui/resume/ResumeActions"
import { ResumePreview } from "@/components/ui/resume/ResumePreview"

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

export default function CurriculoPage() {
  const [formData, setFormData] = useState<ResumeFormData>({
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

  const [atsData, setAtsData] = useState<any>(null)

  // 🔹 Restaurar dados do localStorage ao carregar
  useEffect(() => {
    const saved = localStorage.getItem("resumeFormData")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFormData(parsed)
      } catch (err) {
        console.error("Erro ao restaurar dados do localStorage:", err)
      }
    }
  }, [])

  // 🔹 Salvar automaticamente no localStorage a cada alteração
  useEffect(() => {
    if (formData) {
      localStorage.setItem("resumeFormData", JSON.stringify(formData))
    }
  }, [formData])

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <ResumeHeader setFormData={setFormData} />

        {/* Card de Score ATS */}
        <ResumeScore resumeData={formData} onAtsUpdate={setAtsData} />

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulários */}
          <div className="space-y-8">
            <ResumePersonalInfoForm
              formData={formData}
              setFormData={setFormData}
              atsData={atsData}
            />
            <ResumeSkillsForm formData={formData} setFormData={setFormData} />
            <ResumeExperienceForm formData={formData} setFormData={setFormData} />
            <ResumeEducationForm formData={formData} setFormData={setFormData} />
            <ResumeActions />
          </div>

          {/* Preview */}
          <ResumePreview formData={formData} atsData={atsData} />
        </div>
      </div>
    </div>
  )
}
