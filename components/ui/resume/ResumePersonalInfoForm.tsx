"use client"

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import clsx from "clsx"
import { motion } from "framer-motion"

interface ResumePersonalInfoFormProps {
  formData: any
  setFormData: (updater: any) => void
  atsData?: any
}

export function ResumePersonalInfoForm({
  formData,
  setFormData,
  atsData,
}: ResumePersonalInfoFormProps) {
  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }))
  }

  const missing = atsData?.missing || []

  const borderColor = (field: string) => {
    const lower = field.toLowerCase()
    if (
      missing.some(
        (msg: string) =>
          (lower === "github" && msg.toLowerCase().includes("github")) ||
          (lower === "linkedin" && msg.toLowerCase().includes("linkedin")) ||
          (lower === "desiredrole" && msg.toLowerCase().includes("cargo")) ||
          (lower === "email" && msg.toLowerCase().includes("e-mail")) ||
          (lower === "fullname" && msg.toLowerCase().includes("nome"))
      )
    )
      return "border-red-500/60 ring-red-500/20"
    return "border-white/10 focus-visible:ring-[var(--accent-lilac)]"
  }

  return (
    <Card className="relative p-8 bg-gradient-to-br from-[#0a0a0f]/90 to-[#111115]/90 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      <div className="relative space-y-6">
        <h3 className="text-lg font-semibold text-white">
          Informações Pessoais
        </h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {[
            { key: "fullName", label: "Nome Completo" },
            { key: "desiredRole", label: "Cargo" },
            { key: "phone", label: "Telefone" },
            { key: "city", label: "Cidade" },
            { key: "email", label: "Email" },
            { key: "linkedin", label: "LinkedIn" },
            { key: "github", label: "GitHub" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="text-sm text-gray-400">{label}</label>
              <Input
                value={formData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={`Digite seu ${label.toLowerCase()}`}
                className={clsx(
                  "mt-1 text-white placeholder:text-gray-500 bg-[#0d0d0f]/80 border rounded-md transition-all focus-visible:ring-2",
                  borderColor(key)
                )}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </Card>
  )
}
