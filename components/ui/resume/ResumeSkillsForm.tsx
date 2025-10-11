"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, MinusCircle } from "lucide-react"
import type { ResumeFormData } from "@/app/curriculo/page"

interface Props {
  formData: ResumeFormData
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>
}

export function ResumeSkillsForm({ formData, setFormData }: Props) {
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
      setNewSkill("")
    }
  }

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  return (
    <Card className="p-6 bg-[#1a1a1f] border-white/10">
      <h3 className="text-xl font-semibold mb-4 gradient-text">Skills</h3>
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
            className="flex-1 px-3 py-2 bg-[#0d0d0f] border border-white/10 rounded-md text-white"
            placeholder="Ex: Python, FastAPI, Docker..."
          />
          <Button
            onClick={addSkill}
            className="cursor-pointer bg-transparent border"
            style={{ borderColor: "var(--accent-lilac)", color: "var(--accent-lilac)" }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-[#0d0d0f] border border-white/10 rounded-full"
            >
              <span className="text-sm text-white">{skill}</span>
              <button
                onClick={() => removeSkill(index)}
                className="cursor-pointer text-[var(--accent-lilac)] hover:text-[#9b6dfb]"
              >
                <MinusCircle className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
