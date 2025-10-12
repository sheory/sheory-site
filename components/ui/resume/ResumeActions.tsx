"use client"

import { Button } from "@/components/ui/button"
import { Save, Download, Share2 } from "lucide-react"
import * as htmlToImage from "html-to-image"
import jsPDF from "jspdf"

export function ResumeActions() {
  const handleDownloadPDF = async () => {
    const preview = document.getElementById("resume-preview")
    if (!preview) return

    try {
      // Remove visual dos highlights temporariamente
      const highlights = preview.querySelectorAll(".highlight")
      highlights.forEach((el) => {
        (el as HTMLElement).style.background = "transparent"
        ;(el as HTMLElement).style.border = "none"
      })

      // Gera imagem a partir do DOM (com html-to-image)
      const dataUrl = await htmlToImage.toPng(preview, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      })

      // Cria PDF com a imagem
      const pdf = new jsPDF("p", "pt", "a4")
      const img = new Image()
      img.src = dataUrl

      await new Promise((resolve) => (img.onload = resolve))

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (img.height * pdfWidth) / img.width
      pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("curriculo.pdf")
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
    } finally {
      // Restaura os highlights
      const highlights = preview.querySelectorAll(".highlight")
      highlights.forEach((el) => {
        (el as HTMLElement).style.background = ""
        ;(el as HTMLElement).style.border = ""
      })
    }
  }

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
        onClick={handleDownloadPDF}
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
