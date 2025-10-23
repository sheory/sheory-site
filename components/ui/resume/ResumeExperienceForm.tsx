"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, MinusCircle } from "lucide-react"
import type { ResumeFormData, Experience } from "@/app/resume/builder/page"
import clsx from "clsx"

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
      location: "",
      startDate: "",
      endDate: "",
      responsibilities: [""],
    }
    setFormData((prev) => ({ ...prev, experiences: [...prev.experiences, newExp] }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }))
  }

  const removeResponsibility = (id: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              responsibilities: exp.responsibilities.filter((_, i) => i !== index),
            }
          : exp
      ),
    }))
  }

  const updateResponsibility = (id: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              responsibilities: exp.responsibilities.map((r, i) =>
                i === index ? value : r
              ),
            }
          : exp
      ),
    }))
  }

  const addResponsibility = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id
          ? { ...exp, responsibilities: [...exp.responsibilities, ""] }
          : exp
      ),
    }))
  }

  const removeExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }))
  }

  return (
    <Card className="p-6 bg-[#1a1a1f] border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold gradient-text">Experiências</h3>
        <Button
          onClick={addExperience}
          className="cursor-pointer bg-indigo-500/20 border border-indigo-500/40 hover:bg-indigo-500/30 text-indigo-300"
        >
          <Plus className="h-4 w-4 mr-2" /> Adicionar
        </Button>
      </div>

      <div className="space-y-4">
        {formData.experiences.map((exp) => (
          <div key={exp.id} className="p-4 bg-[#0d0d0f] border border-white/10 rounded-md space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white placeholder:text-gray-500"
                  placeholder="Empresa"
                />
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white placeholder:text-gray-500"
                  placeholder="Cargo"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                    className="px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white placeholder:text-gray-500"
                    placeholder="Local"
                  />
                  <input
                    type="text"
                    value={`${exp.startDate} - ${exp.endDate}`}
                    onChange={(e) => {
                      const [start, end] = e.target.value.split("-").map((s) => s.trim())
                      updateExperience(exp.id, "startDate", start)
                      updateExperience(exp.id, "endDate", end || "")
                    }}
                    className="px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white placeholder:text-gray-500"
                    placeholder="Período (Ex: 2020 - 2023)"
                  />
                </div>

                <div className="space-y-2">
                  {exp.responsibilities.map((r, i) => {
                    const canRemove = exp.responsibilities.length > 1
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={r}
                          onChange={(e) => updateResponsibility(exp.id, i, e.target.value)}
                          className="flex-1 px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white placeholder:text-gray-500"
                          placeholder="Responsabilidade ou resultado"
                        />
                        <button
                          type="button"
                          onClick={() => canRemove && removeResponsibility(exp.id, i)}
                          disabled={!canRemove}
                          className={clsx(
                            "p-2 rounded-md border border-white/10 hover:text-gray-300 hover:bg-gray-500/10 transition-colors",
                            !canRemove && "opacity-40 cursor-not-allowed"
                          )}
                          aria-label="Remover responsabilidade"
                          title={canRemove ? "Remover" : "Mantenha ao menos uma responsabilidade"}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </button>
                      </div>
                    )
                  })}

                  <Button
                    onClick={() => addResponsibility(exp.id)}
                    size="sm"
                    className="mt-1 cursor-pointer bg-indigo-500/20 border border-indigo-500/40 hover:bg-indigo-500/30 text-indigo-300"
                  >
                    + Adicionar responsabilidade
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
