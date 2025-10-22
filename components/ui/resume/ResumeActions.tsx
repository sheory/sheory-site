"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RefreshCcw, FileText, Wand2 } from "lucide-react"
import { motion } from "framer-motion"
import clsx from "clsx"

interface ResumeActionsProps {
  onGeneratePDF?: () => void
  onClear?: () => void
  onAIEnhance?: () => void
  disabled?: boolean
  aiComingSoon?: boolean
}

export function ResumeActions({
  onGeneratePDF,
  onClear,
  onAIEnhance,
  disabled,
  aiComingSoon = true,
}: ResumeActionsProps) {
  const aiDisabled = disabled || aiComingSoon

  return (
    <Card className="relative p-8 bg-gradient-to-br from-[#0a0a0f]/90 to-[#111115]/90 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

      <div className="relative">
        <h3 className="text-lg font-semibold text-white mb-6">Ações</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Gerar PDF */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="flex flex-col">
            <Button
              onClick={onGeneratePDF}
              disabled={disabled}
              className={clsx(
                "flex items-center justify-center gap-2 transition-all",
                "bg-transparent border text-cyan-300",
                disabled
                  ? "border-cyan-500/30 opacity-60 cursor-not-allowed"
                  : "border-cyan-500/50 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-200"
              )}
            >
              <FileText className="w-4 h-4" />
              <span>Gerar PDF</span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={aiDisabled ? undefined : { scale: 1.05 }}
            whileTap={aiDisabled ? undefined : { scale: 0.97 }}
            className="flex flex-col items-stretch"
          >
            <Button
              onClick={onAIEnhance}
              disabled={aiDisabled}
              aria-disabled={aiDisabled}
              className={clsx(
                "flex items-center justify-center gap-2 transition-all",
                "bg-transparent border text-purple-300",
                aiDisabled
                  ? "border-purple-500/30 opacity-60 cursor-not-allowed"
                  : "border-purple-500/50 hover:bg-purple-500/10 hover:border-purple-400 hover:text-purple-200"
              )}
            >
              <Wand2 className="w-4 h-4" />
              <span>Aprimorar com IA</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="flex flex-col">
            <Button
              onClick={onClear}
              disabled={disabled}
              className={clsx(
                "flex items-center justify-center gap-2 transition-all",
                "bg-transparent border text-red-300",
                disabled
                  ? "border-red-500/30 opacity-60 cursor-not-allowed"
                  : "border-red-500/40 hover:bg-red-500/10 hover:border-red-400"
              )}
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Limpar Dados</span>
            </Button>
          </motion.div>
        </div>

        {/* Dica / aviso */}
        {!aiDisabled ? (
          <p className="text-xs text-gray-400 text-center mt-6">
            💡 Dica: use <span className="text-purple-300 font-medium">“Aprimorar com IA”</span> para deixar seu
            currículo mais competitivo.
          </p>
        ) : (
          <p className="text-xs text-gray-500 text-center mt-6 italic">
            Recurso de aprimoramento com IA <span className="text-gray-300 not-italic font-medium">em breve</span>.
          </p>
        )}
      </div>
    </Card>
  )
}
