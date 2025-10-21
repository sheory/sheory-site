"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
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
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }))
  }

  const removeEducation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  return (
    <Card className="relative p-8 bg-gradient-to-br from-[#0a0a0f]/90 to-[#111115]/90 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden">
      {/* fundo gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="relative">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Educação</h3>
          <Button
            onClick={addEducation}
            className="cursor-pointer bg-indigo-500/20 border border-indigo-500/40 hover:bg-indigo-500/30 text-indigo-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>

        {/* Lista de formações */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {formData.education.map((edu) => (
            <motion.div
              key={edu.id}
              className="p-5 bg-[#0d0d0f]/70 border border-white/10 rounded-xl space-y-3"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, "institution", e.target.value)
                    }
                    placeholder="Instituição"
                    className="w-full px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white text-sm placeholder:text-gray-500"
                  />
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, "degree", e.target.value)
                    }
                    placeholder="Curso"
                    className="w-full px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white text-sm placeholder:text-gray-500"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) =>
                        updateEducation(edu.id, "location", e.target.value)
                      }
                      placeholder="Local"
                      className="px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white text-sm placeholder:text-gray-500"
                    />
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) =>
                        updateEducation(edu.id, "period", e.target.value)
                      }
                      placeholder="2019 - 2024"
                      className="px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white text-sm placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <button
                  onClick={() => removeEducation(edu.id)}
                  className="cursor-pointer ml-3 text-indigo-400 hover:text-indigo-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Card>
  )
}
