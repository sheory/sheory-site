"use client"

import type React from "react"
import Image from "next/image"
import { Mail, Linkedin, Github, MapPin } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const skills = [
  "Python",
  "FastAPI",
  ".NET",
  "Angular",
  "Flask",
  "Django",
  "Azure",
  "AWS",
  "Docker",
  "Kubernetes",
  "Kafka",
  "RabbitMQ",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Git",
  "Jenkins",
]

const experiences = [
  {
    title: "Senior Fullstack Developer",
    company: "Multinacional de tecnologia e inovação",
    location: "Remoto",
    period: "Jun 2025 - Presente",
    description: [
      "Desenvolvimento fullstack com Python, FastAPI, .NET, Angular e PostgreSQL",
      "Arquitetura e deploy de soluções na Azure Cloud",
      "Liderança técnica em projetos de grande escala para operações globais",
    ],
  },
  {
    title: "Senior Backend Developer | Tech Leader",
    company: "Empresa de Tecnologia",
    location: "Remoto",
    period: "Nov 2024 - Jun 2025",
    description: [
      "Liderança de desenvolvimento backend para projetos de clientes diversos",
      "Arquitetura end-to-end utilizando AWS Lambda, CloudWatch, SQS e RDS",
      "Gestão de performance e alta disponibilidade com MySQL, DocumentDB e Python",
    ],
  },
  {
    title: "Backend Developer PL",
    company: "Plataforma de Comunicação",
    location: "Remoto",
    period: "Abr 2023 - Nov 2024",
    description: [
      "Desenvolvimento com Python, Flask e FastAPI com alta cobertura de testes",
      "Otimização de queries MongoDB e PostgreSQL melhorando performance significativamente",
      "Refatoração de monolito aumentando eficiência e escalabilidade",
    ],
  },
  {
    title: "Backend Developer",
    company: "Fintech",
    location: "Remoto",
    period: "Jul 2022 - Abr 2023",
    description: [
      "Microserviços Python e FastAPI para soluções de crédito e empréstimos",
      "Deploy com Jenkins, AWS e Rancher para features de grande porte",
      "Monitoramento com Splunk e OpenTelemetry, caching com Redis",
    ],
  },
]

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="relative py-32 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#0f0f1a] to-[#0A0A12]" />
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />

      {/* Ambient glow effects */}
      <div
        className={`absolute top-40 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      />
      <div
        className={`absolute bottom-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"
        }`}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center space-y-6 mb-20">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-purple-500/30 glass-light transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-sm text-gray-300 font-medium">About Me</span>
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-bold text-white transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Sobre <span className="gradient-text">mim</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column - Profile info */}
          <div
            className={`lg:col-span-4 space-y-8 transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Profile card */}
            <div className="glass rounded-3xl p-8 space-y-6 glow-hover">
              {/* Profile image */}
              <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-purple-500/30">
                <Image src="/professional-developer-portrait.jpeg" alt="Sheory Martins" fill className="object-cover" />
              </div>

              {/* Name and title */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-white">Sheory Martins</h3>
                <p className="text-base gradient-text-alt font-medium">Backend Developer | Python Developer</p>
              </div>

              {/* Contact info */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <a
                  href="mailto:sheoryd@gmail.com"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">sheoryd@gmail.com</span>
                </a>
                <a
                  href="https://linkedin.com/in/sheory-martins"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                >
                  <Linkedin className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">linkedin.com/in/sheory-martins</span>
                </a>
                <a
                  href="https://github.com/sheory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                >
                  <Github className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">github.com/sheory</span>
                </a>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">Bahia, Brasil</span>
                </div>
              </div>
            </div>

            {/* Skills section */}
            <div className="glass rounded-3xl p-8 space-y-6 glow-hover">
              <h4 className="text-xl font-bold text-white">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-white border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Experience timeline */}
          <div
            className={`lg:col-span-8 space-y-8 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Experiência Profissional</h3>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-8 border-l-2 border-purple-500/30 hover:border-purple-500/50 transition-colors"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-[#0A0A12]" />

                  {/* Experience card */}
                  <div className="glass rounded-2xl p-6 space-y-4 glow-hover">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                        <p className="text-sm gradient-text-alt font-medium">{exp.company}</p>
                        <p className="text-xs text-gray-400 mt-1">{exp.location}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{exp.period}</span>
                    </div>

                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2 text-sm text-gray-300">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
