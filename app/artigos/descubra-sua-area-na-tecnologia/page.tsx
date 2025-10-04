import { CareerQuiz } from "@/components/career-quiz"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ArticlePage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/artigos"
          className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-80 transition-opacity"
          style={{ color: "var(--accent-cyan)" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para artigos
        </Link>

        <article className="prose prose-invert max-w-none">
          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight gradient-text">
              Descubra sua área na tecnologia
            </h1>
            <p className="text-gray-400 text-lg">04 de outubro de 2025</p>
          </header>

          <div className="space-y-6 text-lg leading-relaxed text-gray-300">
            <p>
              Quando pensamos em trabalhar com tecnologia, muitas vezes vem à mente a imagem de alguém programando o dia
              todo. Mas a verdade é que o mundo da TI é muito mais amplo e diverso do que isso.
            </p>

            <p>
              Existem profissionais que trabalham conectando pessoas aos times certos, outros que garantem que tudo
              funcione perfeitamente, alguns que criam experiências visuais incríveis, e muitos outros papéis essenciais
              que fazem a tecnologia acontecer.
            </p>

            <p>
              O segredo está em entender como você pensa, como resolve problemas e o que te deixa satisfeito ao final do
              dia. Cada pessoa tem um jeito único de enxergar o mundo, e isso pode ser seu maior diferencial na área de
              tecnologia.
            </p>

            <div className="my-12 p-8 rounded-lg bg-[#1a1a1f] border border-white/10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "var(--accent-lilac)" }}>
                Quer descobrir qual tipo de mente combina com o mundo da tecnologia?
              </h2>
              <p className="text-gray-300 mb-6">
                Preparei um teste rápido e leve para te ajudar a identificar qual área da TI tem mais a ver com seu
                jeito de pensar e trabalhar. Não é um teste técnico, é sobre autoconhecimento.
              </p>
              <p className="text-sm text-gray-400 italic">Faça o teste abaixo e descubra seu caminho na tecnologia</p>
            </div>
          </div>
        </article>

        <div className="mt-16">
          <CareerQuiz />
        </div>
      </div>
    </div>
  )
}
