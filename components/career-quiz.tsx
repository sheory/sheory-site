"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { QuizResult } from "@/components/quiz-result"
import { Sparkles } from "lucide-react"

type Career = "Recruiter" | "QA" | "Designer" | "Front-end" | "Back-end" | "Fullstack" | "PM" | "PO"

interface Option {
  text: string
  career: Career
}

interface Question {
  id: number
  question: string
  options: Option[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quando você enfrenta um desafio novo, qual é sua primeira reação?",
    options: [
      { text: "Tento entender as pessoas envolvidas e o que cada uma precisa.", career: "Recruiter" },
      { text: "Analiso o que pode dar errado e como evitar.", career: "QA" },
      { text: "Penso em como deixar tudo mais agradável e fácil de entender.", career: "Designer" },
      { text: "Imagino como posso montar uma solução que funcione na prática.", career: "Front-end" },
      { text: "Quero entender a causa real do problema e resolver de forma eficiente.", career: "Back-end" },
      { text: "Tento enxergar o quadro completo e ver como cada parte se conecta.", career: "Fullstack" },
      { text: "Faço um plano pra atingir o objetivo.", career: "PM" },
      { text: "Organizo as prioridades pra garantir que tudo ande.", career: "PO" },
    ],
  },
  {
    id: 2,
    question: "Como você prefere trabalhar?",
    options: [
      { text: "Conversando e trocando ideias com as pessoas.", career: "Recruiter" },
      { text: "Seguindo um plano e verificando cada detalhe.", career: "QA" },
      { text: "Criando algo visual e expressivo.", career: "Designer" },
      { text: "Testando e vendo o resultado acontecer.", career: "Front-end" },
      { text: "Trabalhando em silêncio pra resolver algo complexo.", career: "Back-end" },
      { text: "Alternando entre tarefas diferentes, adoro variedade.", career: "Fullstack" },
      { text: "Liderando pessoas e tomando decisões.", career: "PM" },
      { text: "Organizando e acompanhando o progresso.", career: "PO" },
    ],
  },
  {
    id: 3,
    question: "O que mais te dá satisfação ao final do dia?",
    options: [
      { text: "Ter ajudado alguém ou conectado pessoas.", career: "Recruiter" },
      { text: "Ver que tudo saiu certinho, sem erros.", career: "QA" },
      { text: "Saber que algo ficou bonito e agradável de usar.", career: "Designer" },
      { text: "Ver algo que eu fiz funcionando direitinho.", career: "Front-end" },
      { text: "Resolver um problema que parecia impossível.", career: "Back-end" },
      { text: "Ver várias partes funcionando juntas por causa do meu esforço.", career: "Fullstack" },
      { text: "Ver o impacto de uma decisão que eu tomei.", career: "PM" },
      { text: "Ver o time cumprindo o que planejamos.", career: "PO" },
    ],
  },
  {
    id: 4,
    question: "Qual dessas frases mais parece contigo?",
    options: [
      { text: "Eu entendo rápido o que as pessoas precisam.", career: "Recruiter" },
      { text: "Eu percebo falhas que os outros nem notam.", career: "QA" },
      { text: "Tenho olhar pra estética e pra experiência.", career: "Designer" },
      { text: "Sou curioso(a) e gosto de ver algo ganhando forma.", career: "Front-end" },
      { text: "Gosto de entender o porquê das coisas.", career: "Back-end" },
      { text: "Curto aprender de tudo um pouco.", career: "Fullstack" },
      { text: "Sou bom(a) em enxergar o caminho e liderar.", career: "PM" },
      { text: "Gosto de planejar e acompanhar o que está sendo feito.", career: "PO" },
    ],
  },
  {
    id: 5,
    question: "Se você pudesse escolher um tipo de desafio pra resolver, qual te deixaria mais empolgado(a)?",
    options: [
      { text: "Ajudar pessoas a se encaixarem bem em um lugar ou equipe.", career: "Recruiter" },
      { text: "Encontrar falhas antes que elas causem problemas.", career: "QA" },
      { text: "Criar algo que as pessoas usem com facilidade e gostem de ver.", career: "Designer" },
      { text: "Construir algo que funcione de forma prática e direta.", career: "Front-end" },
      { text: "Entender o motivo de algo não funcionar e corrigir com lógica.", career: "Back-end" },
      { text: "Juntar várias partes diferentes e ver tudo ganhando forma.", career: "Fullstack" },
      { text: "Planejar o caminho pra chegar num objetivo.", career: "PM" },
      { text: "Fazer com que um grupo consiga cumprir um plano junto.", career: "PO" },
    ],
  },
  {
    id: 6,
    question: "Quando alguém te pede ajuda, em qual tipo de situação você sente que é realmente útil?",
    options: [
      { text: "Quando é sobre entender pessoas e resolver conflitos.", career: "Recruiter" },
      { text: "Quando precisa descobrir por que algo não está dando certo.", career: "QA" },
      { text: "Quando alguém quer deixar algo mais bonito e fácil de usar.", career: "Designer" },
      { text: "Quando alguém quer transformar uma ideia em algo que funcione.", career: "Front-end" },
      { text: "Quando precisa achar uma solução lógica pra um problema complicado.", career: "Back-end" },
      { text: "Quando há muita coisa diferente pra organizar e conectar.", career: "Fullstack" },
      { text: "Quando alguém precisa de direção pra tomar uma decisão.", career: "PM" },
      { text: "Quando precisa de ajuda pra colocar um plano em prática com outras pessoas.", career: "PO" },
    ],
  },
]

// Utility function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function CareerQuiz() {
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Career[]>([])
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  const [showResult, setShowResult] = useState(false)

  // Initialize shuffled questions when quiz starts
  useEffect(() => {
    if (started && shuffledQuestions.length === 0) {
      // Shuffle questions
      const questionsShuffled = shuffleArray(questions)
      // Shuffle options within each question
      const questionsWithShuffledOptions = questionsShuffled.map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
      setShuffledQuestions(questionsWithShuffledOptions)
    }
  }, [started, shuffledQuestions.length])

  const handleStart = () => {
    setStarted(true)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setShuffledQuestions([])
  }

  const handleAnswer = (career: Career) => {
    const newAnswers = [...answers, career]
    setAnswers(newAnswers)

    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setStarted(false)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setShuffledQuestions([])
  }

  const calculateResult = (): Career => {
    const counts: Record<Career, number> = {
      Recruiter: 0,
      QA: 0,
      Designer: 0,
      "Front-end": 0,
      "Back-end": 0,
      Fullstack: 0,
      PM: 0,
      PO: 0,
    }

    answers.forEach((answer) => {
      counts[answer]++
    })

    let maxCount = 0
    let result: Career = "Front-end"

    Object.entries(counts).forEach(([career, count]) => {
      if (count > maxCount) {
        maxCount = count
        result = career as Career
      }
    })

    return result
  }

  if (!started) {
    return (
      <Card className="p-8 sm:p-12 bg-[#1a1a1f] border-white/10">
        <div className="text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-[var(--accent-lilac)]/10 mb-4">
            <Sparkles className="h-12 w-12" style={{ color: "var(--accent-lilac)" }} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">Qual tipo de mente combina com a área de TI?</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Um teste rápido de autoconhecimento para descobrir como seu jeito de pensar e resolver problemas se conecta
            a diferentes áreas da tecnologia.
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              onClick={handleStart}
              className="text-base px-8 py-6 font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: "var(--accent-lilac)",
                color: "#0d0d0f",
              }}
            >
              Começar o teste
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  if (showResult) {
    return <QuizResult career={calculateResult()} onRestart={handleRestart} />
  }

  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100
  const currentQ = shuffledQuestions[currentQuestion]

  return (
    <Card className="p-6 sm:p-8 bg-[#1a1a1f] border-white/10">
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              Pergunta {currentQuestion + 1} de {shuffledQuestions.length}
            </span>
            <span className="font-medium" style={{ color: "var(--accent-cyan)" }}>
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="pt-4">
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 leading-relaxed">{currentQ?.question}</h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.career)}
                className="w-full text-left p-4 rounded-lg border border-white/10 bg-[#0d0d0f]/50 hover:border-[var(--accent-lilac)] hover:bg-[var(--accent-lilac)]/5 transition-all group"
              >
                <span className="text-base leading-relaxed group-hover:text-[var(--accent-lilac)] transition-colors">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
