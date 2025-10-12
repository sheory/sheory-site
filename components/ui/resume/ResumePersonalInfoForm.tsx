"use client"

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import clsx from "clsx"

export function ResumePersonalInfoForm({ formData, setFormData, atsData }: any) {
  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }))
  }

  // usa atsData.missing (novo nome vindo do backend)
  const missing = atsData?.missing || []

  const borderColor = (field: string) => {
    const lowerField = field.toLowerCase()
    // mapeia mensagens do ATS para campos correspondentes
    if (
      missing.some(
        (msg: string) =>
          (lowerField === "github" && msg.toLowerCase().includes("github")) ||
          (lowerField === "linkedin" && msg.toLowerCase().includes("linkedin")) ||
          (lowerField === "desiredrole" && msg.toLowerCase().includes("cargo")) ||
          (lowerField === "email" && msg.toLowerCase().includes("e-mail")) ||
          (lowerField === "fullName" && msg.toLowerCase().includes("nome"))
      )
    ) {
      return "border-red-500/60 focus-visible:ring-red-500"
    }
    return "border-white/10 focus-visible:ring-primary"
  }

  return (
    <Card className="p-6 bg-[#111115] border border-white/10">
      <h3 className="text-lg font-semibold mb-4 text-[#b388ff]">
        Informações Pessoais
      </h3>

      <div className="space-y-4">
        {[
          { key: "fullName", label: "Nome Completo" },
          { key: "desiredRole", label: "Cargo Desejado" },
          { key: "phone", label: "Telefone" },
          { key: "city", label: "Cidade" },
          { key: "email", label: "Email" },
          { key: "linkedin", label: "LinkedIn" },
          { key: "github", label: "GitHub" },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="text-sm text-gray-300">{label}</label>
            <Input
              value={formData[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className={clsx(
                "mt-1 text-white placeholder:text-gray-500 bg-[#1a1a1f] border rounded-md transition-colors",
                borderColor(key)
              )}
              placeholder={`Digite seu ${label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
