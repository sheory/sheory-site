import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"

export default function ArticlesPage() {
  const articles = [
    {
      slug: "descubra-sua-area-na-tecnologia",
      title: "Descubra sua área na tecnologia",
      description:
        "Um guia completo para entender qual área da TI combina com seu jeito de pensar e resolver problemas.",
      date: "2025-01-15",
      featured: true,
    },
  ]

  return (
    <div className="min-h-screen px-4 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Artigos</h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Conteúdos práticos e inspiradores para quem quer começar ou crescer na área de tecnologia
          </p>
        </div>

        <div className="space-y-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/artigos/${article.slug}`}>
              <Card className="p-6 sm:p-8 transition-all hover:scale-[1.02] hover:border-[var(--accent-lilac)] bg-[#1a1a1f] border-white/10 group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {article.featured && (
                        <span
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-lilac)]/10 border border-[var(--accent-lilac)]/20"
                          style={{ color: "var(--accent-lilac)" }}
                        >
                          <Sparkles className="h-3 w-3" />
                          Destaque
                        </span>
                      )}
                      <span className="text-sm text-gray-400">
                        {new Date(article.date).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold group-hover:text-[var(--accent-cyan)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed">{article.description}</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-[var(--accent-cyan)] group-hover:translate-x-2 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
