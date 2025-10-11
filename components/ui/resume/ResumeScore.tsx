"use client"

import { Card } from "@/components/ui/card"

export function ResumeScore({ atsScore }: { atsScore: number }) {
  return (
    <div className="mb-8 flex justify-center">
      <Card className="p-6 bg-[#1a1a1f] border-white/10 inline-block">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">ATS Score</p>
          <p className="text-4xl font-bold text-gray-500">{atsScore}/100</p>
          <p className="text-sm text-gray-400 mt-4">Preencha o formulário para calcular</p>
        </div>
      </Card>
    </div>
  )
}
