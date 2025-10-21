"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { AlertTriangle, Info, CheckCircle2, Zap, TrendingUp } from "lucide-react"
import clsx from "clsx"

interface ResumeScoreProps {
  resumeData: any
  onAtsUpdate?: (data: any) => void
}

export function ResumeScore({ resumeData, onAtsUpdate }: ResumeScoreProps) {
  const [ats, setAts] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [hasData, setHasData] = useState(false)

  // === Verifica se o usuário preencheu dados do currículo
  useEffect(() => {
    const filled =
      resumeData?.fullName ||
      resumeData?.desiredRole ||
      resumeData?.email ||
      (resumeData?.experiences?.length ?? 0) > 0 ||
      (resumeData?.education?.length ?? 0) > 0
    setHasData(!!filled)
  }, [resumeData])

  // === Chamada para a API do ATS Validator
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

  // === Utilitários de cor e gradiente
  const getColor = (value: number) => {
    if (value < 50) return "#ef4444"
    if (value < 75) return "#f59e0b"
    return "#10b981"
  }

  const getGradient = (value: number) => {
    if (value < 50) return "linear-gradient(135deg, #ef4444, #f87171)"
    if (value < 75) return "linear-gradient(135deg, #f59e0b, #fbbf24)"
    return "linear-gradient(135deg, #10b981, #34d399)"
  }

  const getSeverityIcon = (msg: string) => {
    if (/inclua|adicione|falta|ausente/i.test(msg))
      return <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
    if (/use|melhore/i.test(msg))
      return <Info className="w-4 h-4 text-yellow-400 shrink-0" />
    return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
  }

  // === Tela inicial (sem dados)
  if (!hasData)
    return (
      <Card className="p-12 bg-gradient-to-br from-[#0a0a0f] to-[#111115] border-white/5 text-center w-full max-w-6xl mx-auto mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              Avaliação ATS
            </p>
          </div>
          <h2 className="text-7xl font-bold text-gray-600 mb-4">0/100</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Preencha o formulário para calcular seu score ATS e receber
            recomendações personalizadas.
          </p>
        </div>
      </Card>
    )

  // === Tela de loading
  if (loading || !ats)
    return (
      <Card className="p-12 bg-gradient-to-br from-[#0a0a0f] to-[#111115] border-white/5 text-center w-full max-w-6xl mx-auto mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 animate-pulse" />
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
          <p className="text-gray-400 text-sm font-medium">
            Calculando pontuação ATS...
          </p>
        </div>
      </Card>
    )

  // === Dados processados
  const barData = Object.entries(ats.sections || {}).map(([key, value]) => ({
    categoria: key,
    valor: value,
  }))
  const score = ats.score ?? 0
  const radius = 90
  const circumference = Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-[#0a0a0f]/95 to-[#111115]/95 border border-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden mb-12 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      <div className="relative p-10">
        {/* === Header === */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs uppercase tracking-wider text-purple-300 font-semibold">
                Análise ATS
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Pontuação do Currículo
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Otimize seu currículo para sistemas de rastreamento
            </p>
          </div>
        </div>

        {/* === Gauge + Barras === */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 mb-10">
          {/* Gauge semicircular */}
          <div className="relative w-[280px] h-[200px] flex items-center justify-center shrink-0">
            <div
              className="absolute inset-0 blur-3xl opacity-30 rounded-full"
              style={{ background: getGradient(score) }}
            />

            <svg viewBox="0 0 200 110" className="relative w-full h-full">
              <path
                d="M10 100 A90 90 0 0 1 190 100"
                stroke="#1a1a1f"
                strokeWidth="18"
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M10 100 A90 90 0 0 1 190 100"
                stroke="url(#gaugeGradient)"
                strokeWidth="18"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                filter="url(#glow)"
                style={{
                  transition:
                    "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </svg>

            <div className="absolute bottom-6 flex flex-col items-center">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">
                ATS SCORE
              </p>
              <h2
                className="text-6xl font-black leading-none mb-1"
                style={{
                  background: getGradient(score),
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {score}
              </h2>
              <p className="text-2xl font-bold text-gray-600">/100</p>
            </div>
          </div>

          {/* Barras laterais */}
          <div className="flex-1 w-full space-y-5">
            {barData.map((item, index) => (
              <motion.div
                key={item.categoria}
                className="space-y-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-300 capitalize">
                    {item.categoria}
                  </span>
                  <span className="text-sm font-bold text-white tabular-nums">
                    {item.valor}
                  </span>
                </div>
                <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      width: `${item.valor}%`,
                      background: getGradient(item.valor),
                      boxShadow: `0 0 20px ${getColor(item.valor)}40`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.valor}%` }}
                    transition={{
                      duration: 1,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recomendações */}
        {ats.insights?.length > 0 && (
          <div className="space-y-4 mb-8">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Recomendações
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ats.insights.map((msg: string, i: number) => (
                <motion.div
                  key={i}
                  className={clsx(
                    "flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]",
                    /inclua|adicione|ausente|falta/i.test(msg)
                      ? "border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/30"
                      : /use|melhore/i.test(msg)
                      ? "border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 hover:border-yellow-500/30"
                      : "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/30"
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  {getSeverityIcon(msg)}
                  <p className="text-sm text-gray-200 leading-relaxed flex-1">
                    {msg}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Como alcançar 100 pontos */}
        {ats.missing?.length > 0 && (
          <motion.div
            className="border-t border-white/10 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Como alcançar 100 pontos
                </h4>
                <p className="text-xs text-gray-400">
                  Siga estas recomendações para maximizar seu score
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              {ats.missing.map((item: string, index: number) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Zap className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300 leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </Card>
  )
}
