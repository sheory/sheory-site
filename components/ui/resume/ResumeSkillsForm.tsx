"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeFormData } from "@/app/resume/builder/page"
import { useState } from "react"

interface Props {
  formData: ResumeFormData
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>
}

export function ResumeSkillsForm({ formData, setFormData }: Props) {
  const [skillInput, setSkillInput] = useState("")

  const addSkill = () => {
    const newSkill = skillInput.trim()
    if (!newSkill) return
    if (formData.skills.includes(newSkill)) return
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }))
    setSkillInput("")
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  return (
    <Card className="p-6 bg-[#1a1a1f] border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold gradient-text">Skills</h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {formData.skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d0d0f] border border-white/10 text-white text-sm"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="text-[var(--accent-lilac)] hover:text-[#9b6dfb]"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

     <div className="flex gap-2">
      <input
        type="text"
        value={skillInput}
        onChange={(e) => setSkillInput(e.target.value)}
        placeholder="Adicionar nova skill"
        className="flex-1 px-3 py-2 bg-[#1a1a1f] border border-white/10 rounded-md text-white"
      />
      <button
        onClick={addSkill}
        className="p-3 rounded-md text-white transition-all cursor-pointer"
        style={{
          background:
            "linear-gradient(#1a1a1f, #1a1a1f) padding-box, linear-gradient(135deg, #ff6ac1, #9b6dfb) border-box",
          border: "1.5px solid transparent",
          boxShadow: "0 0 10px rgba(155,109,251,0.2)",
        }}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>

    </Card>
  )
}
