"use client"

import React from "react"
import ReactECharts from "echarts-for-react"

export default function AtsGradeGaugeDocStyle({ score }: { score: number }) {
  const v = Math.max(0, Math.min(100, score)) / 100 // doc usa 0..1

  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "75%"],
        radius: "90%",
        min: 0,
        max: 1,
        splitNumber: 6,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, "#FF6E76"],
              [0.5, "#FDDD60"],
              [0.75, "#58D9F9"],
              [1, "#7CFFB2"],
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
        axisTick: {
          length: 6,
          splitNumber: 2,
          lineStyle: { color: "auto", width: 2 },
        },
        splitLine: {
            show: false,
        },
        axisLabel: {
          show: false
        },
        title: {
          offsetCenter: [0, "-10%"],
          fontSize: 16,
          text: "ATS SCORE", // pode trocar por 'Grade Rating' se quiser 100% igual
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, "-35%"],
          valueAnimation: true,
          formatter(val: number) {
            return Math.round(val * 100) + "" // igual à doc (sem "/100")
          },
          color: "inherit",
        },
        data: [{ value: v, name: "ATS SCORE" }],
      },
    ],
    backgroundColor: "transparent",
  }

  return (
    <ReactECharts option={option} style={{ width: 560, height: 340 }} notMerge lazyUpdate />
  )
}
