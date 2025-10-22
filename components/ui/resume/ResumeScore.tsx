"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { AlertTriangle, Info, CheckCircle2, Zap, TrendingUp } from "lucide-react"
import clsx from "clsx"
import ReactECharts from "echarts-for-react"

/* =======================
   Paleta igual ao Grade Gauge (ECharts)
   ======================= */
const GAUGE = {
  red:   "#FF6E76",
  amber: "#FDDD60",
  cyan:  "#58D9F9",
  green: "#7CFFB2",
}

const ATS_GRADIENT = `linear-gradient(90deg,
  ${GAUGE.red} 0%,
  ${GAUGE.amber} 33.33%,
  ${GAUGE.cyan} 66.66%,
  ${GAUGE.green} 100%
)`

const TRACK_COLOR = "rgba(12,12,16,0.90)" // trilho escuro para cobrir a parte não preenchida

interface ResumeScoreProps {
  resumeData: any
  onAtsUpdate?: (data: any) => void
}

/* =======================
   Gauge estilo oficial "Grade" (doc ECharts)
   - sem labels "Grade A/B/C/D"
   - menos riscos (apenas pequenos)
   ======================= */
function AtsGradeGaugeDocStyle({ score }: { score: number }) {
  const v = Math.max(0, Math.min(100, score)) / 100 // doc usa 0..1

  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "70%"],
        radius: "108%",
        min: 0,
        max: 1,
        // menos divisões gerais => menos riscos totais
        splitNumber: 6,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, GAUGE.red],
              [0.5,  GAUGE.amber],
              [0.75, GAUGE.cyan],
              [1.0,  GAUGE.green],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 20,
          offsetCenter: [0, "-60%"],
          itemStyle: { color: "auto" },
        },
        // apenas riscos pequenos
        axisTick: {
          length: 6,
          splitNumber: 2,
          lineStyle: { color: "auto", width: 2 },
        },
        // sem riscos grandes
        splitLine: { show: false },
        // remove Grade A/B/C/D
        axisLabel: { show: false },
        title: {
          offsetCenter: [0, "-12%"],
          fontSize: 14,
          color: "#8b8f9b",
          text: "ATS SCORE",
        },
        detail: {
          fontSize: 36,
          offsetCenter: [0, "-30%"],
          valueAnimation: true,
          formatter(val: number) {
            return Math.round(val * 100) + ""
          },
          color: "inherit",
        },
        data: [{ value: v, name: "ATS SCORE" }],
      },
    ],
    backgroundColor: "transparent",
  }

  return (
    <ReactECharts
      option={option}
      style={{ width: 620, height: 360 }} // meia-lua grande para equiparar às barras
      notMerge
      lazyUpdate
    />
  )
}

/* =======================
   Componente principal
   ======================= */
export function ResumeScore({ resumeData, onAtsUpdate }: ResumeScoreProps) {
  const [ats, setAts] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [hasData, setHasData] = useState(false)

  // Verifica se há dados preenchidos
  useEffect(() => {
    const filled =
      resumeData?.fullName ||
      resumeData?.desiredRole ||
      resumeData?.email ||
      (resumeData?.experiences?.length ?? 0) > 0 ||
      (resumeData?.education?.length ?? 0) > 0
    setHasData(!!filled)
  }, [resumeData])

  // Chama a API de ATS
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

  const getSeverityIcon = (msg: string) => {
    if (/inclua|adicione|falta|ausente/i.test(msg))
      return <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
    if (/use|melhore/i.test(msg))
      return <Info className="w-4 h-4 text-yellow-400 shrink-0" />
    return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
  }

  // Tela inicial (sem dados)
  if (!hasData)
    return (
      <Card className="p-12 bg-gradient-to-br from-[#0a0a0f] to-[#111115] border-white/5 text-center w-full max-w-none mx-auto mb-12 relative overflow-hidden">
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
            Preencha o formulário para calcular seu score ATS e receber recomendações personalizadas.
          </p>
        </div>
      </Card>
    )

  // Loading
  if (loading || !ats)
    return (
      <Card className="p-12 bg-gradient-to-br from-[#0a0a0f] to-[#111115] border-white/5 text-center w-full max-w-none mx-auto mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 animate-pulse" />
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
          <p className="text-gray-400 text-sm font-medium">Calculando pontuação ATS...</p>
        </div>
      </Card>
    )

  // Dados processados
  const barData = Object.entries(ats.sections || {}).map(([key, value]) => ({
    categoria: key,
    valor: value as number,
  }))
  const score = ats.score ?? 0

  return (
    <Card className="w-full max-w-none mx-auto bg-gradient-to-br from-[#0a0a0f]/95 to-[#111115]/95 border border-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden mb-12 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      <div className="relative p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs uppercase tracking-wider text-purple-300 font-semibold">
                Análise ATS
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">Pontuação do Currículo</h3>
            <p className="text-sm text-gray-400 mt-1">Otimize seu currículo para sistemas de rastreamento</p>
          </div>
        </div>

        {/* Gauge + Barras */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-10">
          {/* Gauge (doc style) */}
          <div className="w-full flex justify-center">
            <AtsGradeGaugeDocStyle score={score} />
          </div>

          {/* Barras laterais (gradiente igual ao gauge) */}
          <div className="flex-1 w-full space-y-5">
            {barData.map((item, index) => (
              <motion.div
                key={item.categoria}
                className="space-y-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] text-gray-300 font-medium">{item.categoria}</span>
                  <span className="text-[13px] text-gray-200 font-semibold tabular-nums">{item.valor}</span>
                </div>

                <div className="relative h-3 rounded-full overflow-hidden">
                  {/* gradiente sempre por baixo */}
                  <div className="absolute inset-0" style={{ background: ATS_GRADIENT }} />
                  {/* borda sutil (inset) */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
                  />
                  {/* cobertura da parte NÃO preenchida */}
                  <motion.div
                    className="absolute top-0 right-0 h-full"
                    style={{ background: TRACK_COLOR }}
                    initial={{ width: "100%" }}
                    animate={{ width: `${100 - item.valor}%` }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recomendações */}
        {ats.insights?.length > 0 && (
          <div className="space-y-4 mb-8">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recomendações</h4>
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
                  <p className="text-sm text-gray-200 leading-relaxed flex-1">{msg}</p>
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
                <h4 className="text-base font-bold text-white">Como alcançar 100 pontos</h4>
                <p className="text-xs text-gray-400">Siga estas recomendações para maximizar seu score</p>
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
                  <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </Card>
  )
}
