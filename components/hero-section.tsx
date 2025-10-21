"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden
        bg-gradient-to-b from-[#1a1a2e] via-[#0f0f1a] to-[#0A0A12]
        before:absolute before:inset-x-0 before:top-0 before:h-96 before:bg-gradient-to-b before:from-purple-500/5 before:via-transparent before:to-transparent before:pointer-events-none
        after:absolute after:inset-0 after:bg-[radial-gradient(closest-side_at_50%_40%,_rgba(220,170,250,0.08)_0%,_rgba(140,80,200,0.04)_40%,_rgba(0,0,0,0)_70%)] after:blur-[160px] after:opacity-90
        animate-background-shift"
      >
      {/* folded light surfaces */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-[600px] max-w-6xl">
          <div
            className={`absolute inset-0 folded-surface opacity-40 parallax transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-40" : "translate-y-20 opacity-0"
            }`}
            style={{
              clipPath:
                "polygon(0 40%, 10% 35%, 20% 38%, 30% 33%, 40% 36%, 50% 30%, 60% 34%, 70% 29%, 80% 32%, 90% 28%, 100% 30%, 100% 100%, 0 100%)",
            }}
          />
          <div
            className={`absolute inset-0 folded-surface opacity-30 parallax transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-30" : "translate-y-20 opacity-0"
            }`}
            style={{
              clipPath:
                "polygon(0 45%, 10% 42%, 20% 45%, 30% 40%, 40% 43%, 50% 38%, 60% 41%, 70% 37%, 80% 40%, 90% 36%, 100% 38%, 100% 100%, 0 100%)",
            }}
          />
          <div
            className={`absolute inset-0 folded-surface opacity-20 parallax transition-all duration-1000 delay-400 ${
              isVisible ? "translate-y-0 opacity-20" : "translate-y-20 opacity-0"
            }`}
            style={{
              clipPath:
                "polygon(0 50%, 10% 48%, 20% 51%, 30% 47%, 40% 50%, 50% 45%, 60% 48%, 70% 44%, 80% 47%, 90% 43%, 100% 45%, 100% 100%, 0 100%)",
            }}
          />
        </div>
      </div>

      {/* Light orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-[150px] animate-pulse-glow"
        style={{ animationDelay: "4s" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div
            className={`inline-flex items-center space-x-2 glass-light px-5 py-2.5 rounded-full border border-purple-500/30 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
            <span className="text-sm text-blue-400 font-medium">Resume Builder & Dev Hub</span>
          </div>

          <h1
            className={`text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Construa, aprenda e compartilhe.
          </h1>

          <p
            className={`text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Aqui você encontra projetos, artigos e ferramentas criadas por uma desenvolvedora que acredita em aprendizado coletivo e tecnologia acessível.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/#resume">
              <Button
                size="lg"
                className={`gradient-primary text-white font-semibold px-8 py-6 text-base rounded-full group border-0 transition-all duration-1000 delay-600 hover:scale-105 hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Criar Currículo

                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/#blog">
              <Button
                size="lg"
                variant="outline"
                className={`border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white px-8 py-6 text-base rounded-full backdrop-blur-sm transition-all duration-1000 delay-700 hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Ver blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
