"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeFormData, Education } from "@/app/curriculo/page"

interface Props {
  formData: ResumeFormData
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>
}

export function ResumeEducationForm({ formData, setFormData }: Props) {
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      location: "",
      period: "",
    }
    setFormData((prev) => ({ ...prev, education: [...prev.education, newEdu] }))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setFormData((prev) => ({ ...prev, education: prev.education.filter((edu) => edu.id !== id) }))
  }

  return (
    <Card className="p-6 bg-[#1a1a1f] border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold gradient-text">Educação</h3>
        <Button
          onClick={addEducation}
          className="cursor-pointer"
          style={{ backgroundColor: "var(--accent-lilac)" }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar
        </Button>
      </div>

      <div className="space-y-4">
        {formData.education.map((edu) => (
          <div key={edu.id} className="p-4 bg-[#0d0d0f] border border-white/10 rounded-md space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white"
                  placeholder="Instituição"
                />
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white"
                  placeholder="Curso"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                    className="px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white"
                    placeholder="Local"
                  />
                  <input
                    type="text"
                    value={edu.period}
                    onChange={(e) => updateEducation(edu.id, "period", e.target.value)}
                    className="px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white"
                    placeholder="2019 - 2024"
                  />
                </div>
              </div>
              <button
                onClick={() => removeEducation(edu.id)}
                className="cursor-pointer ml-2 text-[var(--accent-lilac)] hover:text-[#9b6dfb]"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
