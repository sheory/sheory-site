import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, BookOpen } from "lucide-react"

export default function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative px-4 py-20 sm:py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance gradient-text">
            Oi, eu sou Sheory
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed text-balance max-w-3xl mx-auto">
            Engenheira de software com o propósito de ajudar pessoas a entender e conquistar seu espaço na tecnologia — de forma acessível e gratuita.
          </p>
          <div className="pt-4">
            <Link href="/artigos/descubra-sua-area-na-tecnologia">
              <Button
                size="lg"
                className="text-base sm:text-lg px-8 py-6 font-semibold transition-all hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: "var(--accent-lilac)",
                  color: "#0d0d0f",
                }}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                <span className="gradient-text" style={{ WebkitTextFillColor: "#0d0d0f", color: "#0d0d0f" }}>
                  Descubra sua área na tecnologia
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-4 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <Link href="/artigos/descubra-sua-area-na-tecnologia" className="group cursor-pointer">
            <Card className="p-6 sm:p-8 h-full transition-all hover:scale-105 hover:border-[var(--accent-lilac)] bg-[#1a1a1f] border-white/10">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-[var(--accent-lilac)]/10">
                  <Sparkles className="h-8 w-8" style={{ color: "var(--accent-lilac)" }} />
                </div>
                <h3 className="text-xl font-semibold gradient-text">Descubra sua área na tecnologia</h3>
                <p className="text-gray-400 leading-relaxed">
                  Faça um teste rápido e descubra qual área da TI combina com seu jeito de pensar
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/artigos" className="group cursor-pointer">
            <Card className="p-6 sm:p-8 h-full transition-all hover:scale-105 hover:border-[var(--accent-cyan)] bg-[#1a1a1f] border-white/10">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-[var(--accent-cyan)]/10">
                  <BookOpen className="h-8 w-8" style={{ color: "var(--accent-cyan)" }} />
                </div>
                <h3 className="text-xl font-semibold">Artigos e Dicas</h3>
                <p className="text-gray-400 leading-relaxed">
                  Conteúdos práticos para quem quer começar ou crescer na área de tecnologia
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </section>
    </>
  )
}