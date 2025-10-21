"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const features = [
  {
    title: "Crie seu currículo",
    description:
      "Monte um currículo técnico com foco nas suas habilidades reais e mantenha tudo atualizado com facilidade.",
    tag: "Builder",
    available: true,
  },
  {
    title: "Compare com a vaga",
    description:
      "Analise seu currículo frente à vaga e veja onde pode se destacar ou evoluir.",
    tag: "Analyzer",
    available: false,
  },
  {
    title: "Prepare-se para a entrevista",
    description:
      "Gere perguntas e respostas com base na vaga e no seu perfil para treinar com propósito.",
    tag: "Interview Prep",
    available: false,
  },
]

export function ResumePreviewSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section
      id="resume"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 sm:py-40 overflow-hidden bg-gradient-to-b from-[#f8f8fa] via-[#fcfcff] to-[#fffaf5]"
    >
      {/* Luz de fundo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] h-[70vh] max-w-full rounded-full pointer-events-none blur-[48px]"
        style={{
          background:
            "radial-gradient(closest-side at 50% 40%, rgba(255,250,245,0.92) 0%, rgba(255,250,245,0.7) 6%, rgba(220,170,250,0.16) 22%, rgba(180,120,240,0.10) 34%, rgba(140,80,200,0.06) 48%, rgba(0,0,0,0) 68%)",
          opacity: 0.9,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Títulos */}
        <div className="text-center space-y-6 mb-20">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-[#0A0A12] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Crie, analise e evolua seu currículo técnico.
          </h2>
          <p
            className={`text-xl sm:text-2xl font-semibold gradient-text transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Do aprendizado à prática
          </p>
          <p
            className={`text-base text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            A ferramenta de currículo do sheory.dev foi feita para quem quer crescer na tecnologia
            com propósito: criando, comparando e se preparando de forma inteligente e acessível.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto items-stretch">
          {features.map((feature, index) => {
            const card = (
              <Card
                key={index}
                className={`relative overflow-hidden flex flex-col justify-between text-center p-12 border border-gray-200/40 bg-white/80 backdrop-blur-xl shadow-[0_0_30px_rgba(140,120,255,0.1)] transition-all duration-700 h-full ${
                  feature.available
                    ? "hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(140,120,255,0.2)] cursor-pointer"
                    : "opacity-85 saturate-[0.7] cursor-default"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${500 + index * 200}ms` }}
              >
                <div className="flex flex-col flex-grow justify-center space-y-6">
                  <div
                    className={`inline-flex items-center justify-center space-x-2 px-3 py-1.5 rounded-full mx-auto ${
                      feature.available
                        ? "bg-gradient-to-r from-purple-100/60 to-pink-100/60"
                        : "bg-gray-100"
                    } border border-purple-200/30`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        feature.available ? "bg-purple-500" : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        feature.available ? "text-gray-600" : "text-gray-500"
                      }`}
                    >
                      {feature.available ? feature.tag : "Em breve"}
                    </span>
                  </div>

                  <h3
                    className={`text-2xl font-bold leading-tight ${
                      feature.available ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`text-sm ${
                      feature.available ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </Card>
            )

            return feature.available ? (
              <Link key={index} href="/resume/builder" className="block h-full">
                {card}
              </Link>
            ) : (
              <div key={index} className="h-full">
                {card}
              </div>
            )
          })}
        </div>

        {/* Botão principal */}
        <div className="text-center">
          <Link href="/resume">
            <Button
              size="lg"
              className={`gradient-primary text-white font-semibold px-8 py-6 text-base rounded-full group border-0 transition-all duration-1000 delay-1000 hover:scale-105 hover:shadow-[0_0_60px_rgba(139,92,246,0.4)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Explorar ferramenta
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
