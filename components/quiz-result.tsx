"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink, RefreshCw, Sparkles } from "lucide-react"

type Career = "Recruiter" | "QA" | "Designer" | "Front-end" | "Back-end" | "Fullstack" | "PM" | "PO"

interface CareerInfo {
  title: string
  subtitle: string
  description: string
  traits: string[]
  roadmapUrl: string
}

const careerData: Record<Career, CareerInfo> = {
  Recruiter: {
    title: "O Conector de Pessoas",
    subtitle: "Tech Recruiter",
    description:
      "Você tem um talento natural para entender pessoas e conectá-las aos lugares certos. Na área de tecnologia, tech recruiters são essenciais para construir times incríveis, identificando talentos e garantindo que cada pessoa encontre seu lugar ideal. Você não precisa programar para fazer a diferença na tech.",
    traits: [
      "Empatia e habilidade de comunicação",
      "Capacidade de identificar potencial nas pessoas",
      "Interesse genuíno em ajudar outros a crescerem",
      "Habilidade de fazer conexões significativas",
    ],
    roadmapUrl: "https://4dayweek.io/career-path/technical-recruiter",
  },
  QA: {
    title: "O Guardião dos Detalhes",
    subtitle: "Quality Assurance (QA)",
    description:
      "Você tem um olhar aguçado para detalhes e uma habilidade natural de perceber o que pode dar errado antes que aconteça. Como QA, você seria responsável por garantir que tudo funcione perfeitamente, encontrando bugs e assegurando a qualidade dos produtos antes de chegarem aos usuários.",
    traits: [
      "Atenção meticulosa aos detalhes",
      "Pensamento analítico e crítico",
      "Paciência e persistência",
      "Capacidade de documentar e comunicar problemas claramente",
    ],
    roadmapUrl: "https://roadmap.sh/qa",
  },
  Designer: {
    title: "O Criador de Experiências",
    subtitle: "UX/UI Designer",
    description:
      "Você tem sensibilidade estética e se preocupa com a experiência das pessoas. Como designer de UX/UI, você criaria interfaces bonitas e intuitivas, pensando em cada detalhe da jornada do usuário. Seu trabalho tornaria a tecnologia mais acessível e agradável para todos.",
    traits: [
      "Senso estético e criatividade",
      "Empatia com usuários",
      "Atenção à experiência e usabilidade",
      "Capacidade de transformar ideias complexas em soluções simples",
    ],
    roadmapUrl: "https://roadmap.sh/ux-design",
  },
  "Front-end": {
    title: "O Construtor Visual",
    subtitle: "Desenvolvedor Front-end",
    description:
      "Você gosta de ver as coisas ganhando forma e funcionando na prática. Como desenvolvedor front-end, você construiria a parte visual dos sites e aplicativos que as pessoas usam todos os dias. É uma área perfeita para quem gosta de criar, testar e ver resultados imediatos.",
    traits: [
      "Curiosidade e vontade de experimentar",
      "Atenção aos detalhes visuais",
      "Satisfação em ver resultados tangíveis",
      "Interesse em aprender tecnologias novas",
    ],
    roadmapUrl: "https://roadmap.sh/frontend",
  },
  "Back-end": {
    title: "O Arquiteto Lógico",
    subtitle: "Desenvolvedor Back-end",
    description:
      "Você gosta de entender como as coisas funcionam por trás dos panos e resolver problemas complexos com lógica. Como desenvolvedor back-end, você construiria a estrutura que faz tudo funcionar: bancos de dados, servidores e toda a lógica que processa informações.",
    traits: [
      "Pensamento lógico e analítico",
      "Gosto por resolver problemas complexos",
      "Interesse em entender sistemas e estruturas",
      "Paciência para trabalhar em desafios de longo prazo",
    ],
    roadmapUrl: "https://roadmap.sh/backend",
  },
  Fullstack: {
    title: "O Equilibrador",
    subtitle: "Desenvolvedor Fullstack",
    description:
      "Você gosta de variedade e de entender como todas as partes se conectam. Como desenvolvedor fullstack, você trabalharia tanto no front-end quanto no back-end, tendo uma visão completa de como um produto funciona. É ideal para quem gosta de aprender de tudo um pouco.",
    traits: [
      "Versatilidade e adaptabilidade",
      "Curiosidade ampla",
      "Capacidade de ver o quadro completo",
      "Gosto por aprender constantemente",
    ],
    roadmapUrl: "https://roadmap.sh/full-stack",
  },
  PM: {
    title: "O Estrategista",
    subtitle: "Product Manager (PM)",
    description:
      "Você tem visão estratégica e gosta de liderar projetos do início ao fim. Como Product Manager, você definiria o que construir, por que construir e como medir o sucesso. Você seria a ponte entre negócios, design e tecnologia, tomando decisões que impactam o produto.",
    traits: [
      "Visão estratégica e de negócios",
      "Capacidade de tomar decisões difíceis",
      "Habilidade de comunicação e liderança",
      "Interesse em entender usuários e mercado",
    ],
    roadmapUrl: "https://roadmap.sh/product-manager",
  },
  PO: {
    title: "O Orquestrador",
    subtitle: "Product Owner (PO)",
    description:
      "Você é organizado e gosta de garantir que tudo saia conforme o planejado. Como Product Owner, você priorizaria tarefas, organizaria o backlog e garantiria que o time esteja sempre trabalhando no que é mais importante. Você seria essencial para manter projetos no caminho certo.",
    traits: [
      "Organização e planejamento",
      "Capacidade de priorizar",
      "Habilidade de trabalhar com times",
      "Foco em resultados e entregas",
    ],
    roadmapUrl: "https://www.watchmycompetitor.com/resources/a-product-owner-roadmap-a-step-by-step-guide/",
  },
}

interface QuizResultProps {
  career: Career
  onRestart: () => void
}

export function QuizResult({ career, onRestart }: QuizResultProps) {
  const result = careerData[career]

  return (
    <Card className="p-8 sm:p-12 bg-[#1a1a1f] border-white/10">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 rounded-full bg-[var(--accent-lilac)]/10 mb-2">
            <Sparkles className="h-12 w-12" style={{ color: "var(--accent-lilac)" }} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--accent-lilac)" }}>
            {result.title}
          </h2>
          <p className="text-xl sm:text-2xl font-semibold" style={{ color: "var(--accent-cyan)" }}>
            {result.subtitle}
          </p>
        </div>

        {/* Description */}
        <div className="space-y-6">
          <p className="text-lg text-gray-300 leading-relaxed">{result.description}</p>

          {/* Traits */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Características que combinam com você:</h3>
            <ul className="space-y-3">
              {result.traits.map((trait, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "var(--accent-cyan)" }}
                  />
                  <span className="text-gray-300 leading-relaxed">{trait}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-lg bg-[#0d0d0f]/50 border border-white/10">
            <p className="text-sm text-gray-400 italic leading-relaxed">
              Lembre-se: este teste é um guia para autoconhecimento, não uma definição absoluta. Você pode se
              identificar com várias áreas, e está tudo bem! O importante é começar por onde faz mais sentido para você
              agora.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a href={result.roadmapUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button
              size="lg"
              className="w-full text-base font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: "var(--accent-lilac)",
                color: "#0d0d0f",
              }}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Ver roadmap da área
            </Button>
          </a>
          <Button
            size="lg"
            variant="outline"
            onClick={onRestart}
            className="flex-1 text-base font-semibold border-white/20 hover:bg-white/5 bg-transparent"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Refazer o teste
          </Button>
        </div>
      </div>
    </Card>
  )
}
