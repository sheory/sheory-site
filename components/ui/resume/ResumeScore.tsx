"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { AlertTriangle, Info, CheckCircle2, Zap } from "lucide-react"
import clsx from "clsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ResumeScoreProps {
  resumeData: any
  onAtsUpdate?: (data: any) => void
}

export function ResumeScore({ resumeData, onAtsUpdate }: ResumeScoreProps) {
  const [ats, setAts] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [hasData, setHasData] = useState(false)

  // Detecta se o formulário está vazio
  useEffect(() => {
    const filled =
      resumeData?.fullName ||
      resumeData?.desiredRole ||
      resumeData?.email ||
      (resumeData?.experiences?.length ?? 0) > 0 ||
      (resumeData?.education?.length ?? 0) > 0
    setHasData(!!filled)
  }, [resumeData])

  // Atualiza score automaticamente
  useEffect(() => {
    if (!hasData) return
    const timeout = setTimeout(async () => {
      setLoading(true)
      const res = await fetch("/api/ats-validator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      })
      const data = await res.json()
      setAts(data)
      if (onAtsUpdate) onAtsUpdate(data)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timeout)
  }, [resumeData, hasData, onAtsUpdate])

  const getColor = (value: number) => {
    if (value < 50) return "from-red-500 to-orange-400"
    if (value < 75) return "from-yellow-400 to-blue-400"
    return "from-emerald-400 to-green-400"
  }

  const getGlowColor = (score: number) => {
    if (score < 50) return "shadow-[0_0_40px_rgba(239,68,68,0.25)]"
    if (score < 75) return "shadow-[0_0_40px_rgba(251,191,36,0.25)]"
    return "shadow-[0_0_40px_rgba(16,185,129,0.25)]"
  }

  const tooltips = {
    Structure: "Verifica se seu currículo possui nome, headline, experiências e formação.",
    Clarity: "Avalia uso de verbos fortes e clareza nas responsabilidades.",
    Impact: "Pontua presença de resultados mensuráveis (%, métricas, conquistas).",
    Skills: "Checa diversidade e relevância das habilidades técnicas.",
    Professionalism: "Analisa tom profissional, presença de LinkedIn e ausência de clichês.",
  }

  const getSeverityIcon = (msg: string) => {
    if (/inclua|falta|ausente|adicione/i.test(msg))
      return <AlertTriangle className="w-4 h-4 text-red-400 mt-[2px]" />
    if (/use|melhore/i.test(msg))
      return <Info className="w-4 h-4 text-yellow-400 mt-[2px]" />
    return <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-[2px]" />
  }

  // Estado inicial (sem dados)
  if (!hasData)
    return (
      <div className="mb-16 flex justify-center">
        <Card className="p-6 bg-[#111115] border-white/10 text-center w-full max-w-md mx-auto">
          <p className="text-sm uppercase tracking-wide text-gray-400 mb-2">
            ATS Score
          </p>
          <h2 className="text-6xl font-bold text-gray-500">0/100</h2>
          <p className="text-sm text-gray-500 mt-4">
            Preencha o formulário para calcular seu ATS
          </p>
        </Card>
      </div>
    )

  // Loading
  if (loading || !ats)
    return (
      <Card className="p-6 bg-[#111115] border-white/10 text-center mb-16">
        <p className="text-gray-400 text-sm">Calculando ATS Score...</p>
      </Card>
    )

  // Card principal
  return (
    <motion.div
      className={clsx(
        "relative rounded-2xl w-full max-w-md mx-auto p-[2px] transition-all duration-700 mb-16",
        getGlowColor(ats.score)
      )}
    >
      <Card className="p-6 bg-[#111115] border border-white/10 shadow-2xl rounded-2xl backdrop-blur-md">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-sm uppercase tracking-wide text-gray-400">
            ATS Score
          </p>
          <motion.h2
            className={clsx(
              "text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r",
              getColor(ats.score)
            )}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {ats.score}/100
          </motion.h2>
        </div>

        {/* Progress principal */}
        <Progress value={ats.score} className="h-2 mb-6 bg-neutral-800" />

        {/* Breakdown */}
        <TooltipProvider delayDuration={100}>
          <div className="space-y-3 mb-6">
            {Object.entries(ats.sections || {}).map(([section, value]) => (
              <Tooltip key={section}>
                <TooltipTrigger asChild>
                  <div className="flex justify-between items-center text-sm cursor-help">
                    <span className="text-gray-400 capitalize">{section}</span>
                    <div className="flex items-center gap-2 w-[160px]">
                      <div className="w-full h-1.5 bg-neutral-800 rounded">
                        <div
                          className={clsx(
                            "h-1.5 rounded bg-gradient-to-r",
                            getColor(value as number)
                          )}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-300 w-8 text-right">
                        {value}
                      </span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="text-xs text-gray-200 bg-neutral-900 border border-white/10"
                >
                  {tooltips[section as keyof typeof tooltips]}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        {/* ⚠️ Sugestões / Insights */}
        {ats.insights?.length > 0 && (
          <div className="mt-6 space-y-3">
            {ats.insights.map((msg: string, i: number) => (
              <motion.div
                key={i}
                className={clsx(
                  "flex items-start gap-3 p-3 rounded-xl border transition-all duration-200",
                  /inclua|adicione|ausente|falta/i.test(msg)
                    ? "border-red-900/50 bg-red-900/10 hover:bg-red-900/20"
                    : /use|melhore/i.test(msg)
                    ? "border-yellow-900/50 bg-yellow-900/10 hover:bg-yellow-900/20"
                    : "border-emerald-900/50 bg-emerald-900/10 hover:bg-emerald-900/20"
                )}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {getSeverityIcon(msg)}
                <p className="text-sm text-gray-200 leading-snug">{msg}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* 💡 Como chegar a 100 pontos */}
        {ats.missing?.length > 0 && (
          <motion.div
            className="mt-8 border-t border-white/10 pt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-sm text-gray-400 mb-3">
              Como chegar a <span className="text-white font-semibold">100 pontos</span>:
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              {ats.missing.map((item: string, index: number) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Zap className="w-4 h-4 text-yellow-400 mt-[2px]" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}
