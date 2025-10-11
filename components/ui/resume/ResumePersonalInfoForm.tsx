"use client"

import { Card } from "@/components/ui/card"
import type { ResumeFormData } from "@/app/curriculo/page"

interface Props {
  formData: ResumeFormData
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>
}
export function ResumePersonalInfoForm({ formData, setFormData }: Props) {
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="p-6 bg-[#1a1a1f] border-white/10">
      <h3 className="text-xl font-semibold mb-4 gradient-text">Informações Pessoais</h3>
      <div className="space-y-4">
        {[
          { label: "Nome Completo", field: "fullName", placeholder: "Sheory Martins" },
          { label: "Cargo Desejado", field: "desiredRole", placeholder: "Back-end Developer | Python Developer" },
          { label: "Telefone", field: "phone", placeholder: "+55-7498111-8451" },
          { label: "Cidade", field: "city", placeholder: "Bahia, Brasil" },
          { label: "Email", field: "email", placeholder: "sheoryd@gmail.com" },
          { label: "LinkedIn", field: "linkedin", placeholder: "linkedin.com/in/sheory-martins" },
          { label: "GitHub", field: "github", placeholder: "github.com/sheory" },
        ].map(({ label, field, placeholder }) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-2 text-gray-200">{label}</label>
            <input
              type="text"
              value={(formData as any)[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full px-3 py-2 bg-[#0d0d0f] border border-white/10 rounded-md text-white"
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
