"use client"

import { Button } from "@/components/ui/button"
import { Save, Download, Share2 } from "lucide-react"

export function ResumeActions() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Button
        className="cursor-pointer"
        style={{ backgroundColor: "var(--accent-cyan)", color: "#0d0d0f" }}
      >
        <Save className="mr-2 h-4 w-4" />
        Salvar Versão
      </Button>

      <Button
        variant="outline"
        className="cursor-pointer bg-transparent"
        style={{ borderColor: "var(--accent-lilac)", color: "var(--accent-lilac)" }}
      >
        <Download className="mr-2 h-4 w-4" />
        Baixar PDF
      </Button>

      <Button
        variant="outline"
        className="cursor-pointer bg-transparent"
        style={{ borderColor: "var(--accent-cyan)", color: "var(--accent-cyan)" }}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Gerar Link Público
      </Button>
    </div>
  )
}
