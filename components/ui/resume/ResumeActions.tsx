"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, RefreshCcw, FileText, Wand2 } from "lucide-react"
import { motion } from "framer-motion"

interface ResumeActionsProps {
  onGeneratePDF?: () => void
  onClear?: () => void
  onAIEnhance?: () => void
  disabled?: boolean
}

export function ResumeActions({
  onGeneratePDF,
  onClear,
  onAIEnhance,
  disabled,
}: ResumeActionsProps) {
  return (
    <Card className="relative p-8 bg-gradient-to-br from-[#0a0a0f]/90 to-[#111115]/90 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

      <div className="relative">
        <h3 className="text-lg font-semibold text-white mb-6">Ações</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Gerar PDF */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col"
          >
            <Button
              onClick={onGeneratePDF}
              disabled={disabled}
              className="flex items-center justify-center gap-2 
                bg-transparent 
                border border-cyan-500/50 
                text-cyan-300 
                hover:bg-cyan-500/10 
                hover:border-cyan-400 
                hover:text-cyan-200 
                transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Gerar PDF</span>
            </Button>
          </motion.div>

          {/* Aprimorar com IA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col"
          >
            <Button
              onClick={onAIEnhance}
              disabled={disabled}
              className="flex items-center justify-center gap-2 
                bg-transparent 
                border border-purple-500/50 
                text-purple-300 
                hover:bg-purple-500/10 
                hover:border-purple-400 
                hover:text-purple-200 
                transition-all"
            >
              <Wand2 className="w-4 h-4" />
              <span>Aprimorar com IA</span>
            </Button>
          </motion.div>

          {/* Limpar Dados */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col"
          >
            <Button
              onClick={onClear}
              disabled={disabled}
              variant="outline"
              className="flex items-center justify-center gap-2 border border-red-500/40 text-red-300 hover:bg-red-500/10 transition-all"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Limpar Dados</span>
            </Button>
          </motion.div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          💡 Dica: use a opção <span className="text-purple-300 font-medium">“Aprimorar com IA”</span> para deixar seu
          currículo mais competitivo.
        </p>
      </div>
    </Card>
  )
}
