"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, HelpCircle, Lock } from "lucide-react"
import Link from "next/link"

export function LinkedInImport() {
  return (
    <Card className="p-5 bg-gradient-to-br from-[#0a0a0f]/90 to-[#111115]/90 border border-white/10 rounded-2xl backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-6">
            <Button
                disabled
                aria-disabled
                title="Em breve"
                className="group inline-flex items-center gap-2 rounded-full px-4 py-2
                bg-cyan-500/5 border border-dotted border-cyan-300/70 text-cyan-200
                disabled:opacity-60 disabled:pointer-events-auto disabled:cursor-not-allowed"
            >
                <Linkedin className="h-4 w-4" />
                <span className="">Upload currículo LinkedIn</span>
            </Button>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                            text-[11px] text-gray-300/80 bg-white/5 border border-white/10">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-400/80" />
                Em breve
            </span>
            {/* Separador visual só em telas médias+ */}
            <span className="hidden md:block w-px h-6 bg-white/10" />

            <div className="flex items-center gap-2 text-gray-400 text-sm ml-2">
                <HelpCircle className="h-4 w-4" />
                <Link href="/guia/importar-linkedin" className="hover:text-gray-300">
                Não sabe importar? Aprenda aqui
                </Link>
            </div>
        </div>

        <div className="text-xs text-transparent">.</div>
      </div>
    </Card>
  )
}
