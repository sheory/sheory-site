"use client"

import type React from "react"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Footer() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <footer ref={ref as React.RefObject<HTMLElement>} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A12] to-[#050508]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      {/* Enhanced ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-500/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-6">
          <div
            className={`text-2xl sm:text-3xl font-bold gradient-text transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            sheory.dev
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="https://github.com"
              target="_blank"
              className={`text-gray-400 hover:text-white transition-all duration-700 delay-200 hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(139,92,246,0.6)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              aria-label="GitHub"
            >
              <Github size={24} />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className={`text-gray-400 hover:text-white transition-all duration-700 delay-300 hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(139,92,246,0.6)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </Link>
            <Link
              href="mailto:contact@sheory.dev"
              className={`text-gray-400 hover:text-white transition-all duration-700 delay-400 hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(139,92,246,0.6)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              aria-label="Email"
            >
              <Mail size={24} />
            </Link>
          </div>

          <p
            className={`text-gray-400 text-sm text-center transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            © 2025 sheory.dev – Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
