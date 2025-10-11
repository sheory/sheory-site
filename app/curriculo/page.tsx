"use client"

import { useState } from "react"
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
  const [formData, setFormData] = useState({
    fullName: "",
    desiredRole: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    city: "",
    skills: [] as string[],
    experiences: [] as Experience[],
    education: [] as Education[],
  })

  const [atsScore] = useState(0)

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <ResumeHeader setFormData={setFormData}/>
        <ResumeScore atsScore={atsScore} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ResumePersonalInfoForm formData={formData} setFormData={setFormData} />
            <ResumeSkillsForm formData={formData} setFormData={setFormData} />
            <ResumeExperienceForm formData={formData} setFormData={setFormData} />
            <ResumeEducationForm formData={formData} setFormData={setFormData} />
            <ResumeActions />
          </div>

          <ResumePreview formData={formData} />
        </div>
      </div>
    </div>
  )
}
