"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const blogPosts = [
  {
    id: 1,
    title: "O Futuro do Desenvolvimento Web",
    category: "Technology",
    image: "/futuristic-web-development.png",
    date: "15 Jan 2025",
  },
  {
    id: 2,
    title: "Design Systems Modernos",
    category: "Design",
    image: "/modern-design-system.png",
    date: "10 Jan 2025",
  },
  {
    id: 3,
    title: "IA e Desenvolvimento",
    category: "AI & ML",
    image: "/ai-development-technology.jpg",
    date: "5 Jan 2025",
  },
]

export function BlogPreviewSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="blog" ref={ref as React.RefObject<HTMLElement>} className="relative py-32 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A12] via-[#1a1a2e] to-[#1a1a2e]" />
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-purple-500/10 via-pink-500/5 to-transparent" />

      <div
        className={`absolute top-20 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-[120px] transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      />
      <div
        className={`absolute bottom-20 right-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-[120px] transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"
        }`}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6 mb-20">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-purple-500/30 glass-light transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-sm text-gray-300 font-medium">Insights & Articles</span>
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-bold text-white transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Latest from the <span className="gradient-text">Blog</span>
          </h2>
          <p
            className={`text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Artigos sobre tecnologia, design e desenvolvimento
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-700 hover:scale-[1.02] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${400 + index * 150}ms`,
              }}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image background */}
              <div className="relative h-[400px] overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Glassmorphic content overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* Category tag at top */}
                  <div className="flex justify-start">
                    <div
                      className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span className="text-xs text-white font-medium">{post.category}</span>
                    </div>
                  </div>

                  {/* Title and button at bottom */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white leading-tight">{post.title}</h3>

                    {/* Button appears on hover */}
                    <div
                      className={`transition-all duration-300 ${
                        hoveredCard === post.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    >
                      <Button
                        size="sm"
                        className="gradient-primary text-white font-semibold px-6 py-2 text-sm rounded-full border-0 hover:scale-105 transition-transform"
                      >
                        Read Article
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className={`gradient-secondary text-white font-semibold px-8 py-6 text-base rounded-full group border-0 transition-all duration-1000 delay-1000 hover:scale-105 hover:shadow-[0_0_60px_rgba(139,92,246,0.6)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Ver todos os artigos
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
