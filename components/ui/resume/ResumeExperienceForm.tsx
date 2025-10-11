"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, MinusCircle, Trash2 } from "lucide-react"
import type { ResumeFormData, Experience } from "@/app/curriculo/page"

interface Props {
  formData: ResumeFormData
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>
}

export function ResumeExperienceForm({ formData, setFormData }: Props) {
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      role: "",
      location: "Remote",
      startDate: "",
      endDate: "Present",
      responsibilities: [""],
    }
    setFormData((prev) => ({ ...prev, experiences: [...prev.experiences, newExp] }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const addResponsibility = (expId: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === expId ? { ...exp, responsibilities: [...exp.responsibilities, ""] } : exp,
      ),
    }))
  }

  const updateResponsibility = (expId: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === expId
          ? { ...exp, responsibilities: exp.responsibilities.map((r, i) => (i === index ? value : r)) }
          : exp,
      ),
    }))
  }

  const removeResponsibility = (expId: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === expId
          ? { ...exp, responsibilities: exp.responsibilities.filter((_, i) => i !== index) }
          : exp,
      ),
    }))
  }

  const removeExperience = (id: string) => {
    setFormData((prev) => ({ ...prev, experiences: prev.experiences.filter((exp) => exp.id !== id) }))
  }

  return (
    <Card className="p-6 bg-[#1a1a1f] border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold gradient-text">Experiências Profissionais</h3>
        <Button
          onClick={addExperience}
          className="cursor-pointer"
          style={{ backgroundColor: "var(--accent-lilac)" }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar
        </Button>
      </div>

      <div className="space-y-6">
        {formData.experiences.map((exp) => (
          <div key={exp.id} className="p-4 bg-[#0d0d0f] border border-white/10 rounded-md space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white"
                  placeholder="Nome da Empresa"
                />
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white"
                  placeholder="Cargo"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                    className="px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white"
                    placeholder="Local"
                  />
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    className="px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white"
                    placeholder="MM/YYYY"
                  />
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    className="px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white"
                    placeholder="MM/YYYY"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Responsabilidades</label>
                  {exp.responsibilities.map((resp, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => updateResponsibility(exp.id, index, e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white text-sm"
                        placeholder="Descreva uma responsabilidade..."
                      />
                      <button
                        onClick={() => removeResponsibility(exp.id, index)}
                        className="cursor-pointer text-[var(--accent-lilac)] hover:text-[#9b6dfb]"
                      >
                        <MinusCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <Button
                    onClick={() => addResponsibility(exp.id)}
                    variant="outline"
                    size="sm"
                    className="cursor-pointer w-full"
                    style={{ borderColor: "var(--accent-cyan)", color: "var(--accent-cyan)" }}
                  >
                    <Plus className="h-3 w-3 mr-2" />
                    Adicionar Responsabilidade
                  </Button>
                </div>
              </div>

              <button
                onClick={() => removeExperience(exp.id)}
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
