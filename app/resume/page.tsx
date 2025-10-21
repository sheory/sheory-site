"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

const features = [
  {
    title: "Criar currículo",
    description:
      "Monte um currículo técnico com foco nas suas habilidades reais e mantenha tudo atualizado com facilidade.",
    available: true,
  },
  {
    title: "Comparar com vaga",
    description:
      "Analise seu currículo frente à vaga e veja onde pode se destacar ou evoluir.",
    available: false,
  },
  {
    title: "Simular entrevista",
    description:
      "Gere perguntas e respostas com base na vaga e no seu perfil para treinar com propósito.",
    available: false,
  },
]

export default function ResumeToolkitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d021f] via-[#100726] to-[#0a0a14] text-gray-200 flex flex-col">
      <Navbar /> {/* navbar global */}

      <main className="flex flex-col items-center justify-center flex-1 px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Resume Toolkit
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Crie, compare e treine para suas entrevistas — uma suíte rápida e
            inteligente para currículos técnicos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 max-w-6xl mx-auto w-full">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                className={`relative overflow-hidden text-center p-8 rounded-2xl border transition-all duration-500 ${
                  feature.available
                    ? "bg-gradient-to-br from-purple-800/20 via-purple-700/10 to-transparent border-white/10 hover:border-purple-400/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] cursor-pointer"
                    : "bg-white/[0.03] opacity-80 border-white/5"
                }`}
              >
                <div className="relative space-y-4">
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                      feature.available
                        ? "bg-purple-500/20 text-purple-300"
                        : "bg-gray-600/20 text-gray-400"
                    }`}
                  >
                    {feature.available ? "Disponível agora" : "🚀 Em breve"}
                  </div>

                  <h3
                    className={`text-xl font-semibold ${
                      feature.available ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed ${
                      feature.available ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {feature.description}
                  </p>

                  {feature.available && (
                    <Link href="/resume/builder">
                      <Button className="mt-4 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-400 hover:to-purple-500 text-white font-medium px-6 py-2 rounded-full shadow-[0_0_25px_rgba(217,70,239,0.4)] transition-all hover:scale-105">
                        Acessar
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="text-center text-gray-500 text-sm py-8">
        © {new Date().getFullYear()} Sheory.dev
      </footer>
    </div>
  )
}
