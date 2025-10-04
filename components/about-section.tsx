import Image from "next/image"
import { Mail, Linkedin, Github, MapPin } from "lucide-react"

export default function AboutSection() {
  return (
    <section
      id="sobre-mim"
      className="px-4 py-16 flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-left gradient-text">Sobre mim</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start space-y-6">
            <Image
              src="/images/profile.jpeg"
              alt="Sheory Martins - Backend Developer"
              width={280}
              height={280}
              className="w-64 h-64 object-cover rounded-2xl"
              priority
            />

            <div className="text-center lg:text-left space-y-2">
              <h3 className="text-2xl font-bold text-white">Sheory Martins</h3>
              <p className="text-lg gradient-text font-semibold">Backend Developer | Python Developer</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 w-full">
              <a
                href="mailto:sheoryd@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-[var(--accent-cyan)] transition-colors cursor-pointer"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm">sheoryd@gmail.com</span>
              </a>
              <a
                href="https://linkedin.com/in/sheory-martins"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-[var(--accent-cyan)] transition-colors cursor-pointer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-sm">linkedin.com/in/sheory-martins</span>
              </a>
              <a
                href="https://github.com/sheory"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-[var(--accent-cyan)] transition-colors cursor-pointer"
              >
                <Github className="h-5 w-5" />
                <span className="text-sm">github.com/sheory</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-5 w-5" />
                <span className="text-sm">Bahia, Brasil</span>
              </div>
            </div>

            {/* Skills */}
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-3 text-white">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[
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
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--accent-lilac)]/10 text-[var(--accent-lilac)] border border-[var(--accent-lilac)]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience & Education */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-[var(--accent-lilac)] to-[var(--accent-cyan)] rounded-full"></span>
                Experiência Profissional
              </h4>
              <div className="space-y-6">
                {/* Current Role */}
                <div className="relative pl-6 border-l-2 border-white/10">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--accent-lilac)]"></div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h5 className="text-lg font-semibold text-white">Senior Fullstack Developer</h5>
                      <span className="text-sm text-gray-400">Jun 2024 - Presente</span>
                    </div>
                    <p className="text-sm text-[var(--accent-lilac)] font-medium">
                      Multinacional de tecnologia e inovação • Remoto
                    </p>
                    <ul className="text-sm text-gray-300 space-y-1 leading-relaxed list-disc list-inside">
                      <li>Desenvolvimento fullstack com Python, FastAPI, .NET, Angular e PostgreSQL</li>
                      <li>Arquitetura e deploy de soluções na Azure Cloud</li>
                      <li>Liderança técnica em projetos de grande escala para operações globais</li>
                    </ul>
                  </div>
                </div>

                {/* Vonbz */}
                <div className="relative pl-6 border-l-2 border-white/10">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--accent-cyan)]"></div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h5 className="text-lg font-semibold text-white">Senior Backend Developer | Tech Leader</h5>
                      <span className="text-sm text-gray-400">Nov 2024 - Jun 2024</span>
                    </div>
                    <p className="text-sm text-[var(--accent-cyan)] font-medium">Empresa de Tecnologia • Remoto</p>
                    <ul className="text-sm text-gray-300 space-y-1 leading-relaxed list-disc list-inside">
                      <li>Liderança de desenvolvimento backend para projetos de clientes diversos</li>
                      <li>Arquitetura end-to-end utilizando AWS Lambda, CloudWatch, SQS e RDS</li>
                      <li>Gestão de performance e alta disponibilidade com MySQL, DocumentDB e Python</li>
                    </ul>
                  </div>
                </div>

                {/* Zenvia */}
                <div className="relative pl-6 border-l-2 border-white/10">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--accent-lilac)]"></div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h5 className="text-lg font-semibold text-white">Backend Developer PL</h5>
                      <span className="text-sm text-gray-400">Abr 2023 - Nov 2024</span>
                    </div>
                    <p className="text-sm text-[var(--accent-lilac)] font-medium">
                      Plataforma de Comunicação • Remoto
                    </p>
                    <ul className="text-sm text-gray-300 space-y-1 leading-relaxed list-disc list-inside">
                      <li>Desenvolvimento com Python, Flask e FastAPI com alta cobertura de testes</li>
                      <li>Otimização de queries MongoDB e PostgreSQL melhorando performance significativamente</li>
                      <li>Refatoração de monolito aumentando eficiência e escalabilidade</li>
                    </ul>
                  </div>
                </div>

                {/* Serasa Experian */}
                <div className="relative pl-6 border-l-2 border-white/10">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--accent-cyan)]"></div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h5 className="text-lg font-semibold text-white">Backend Developer</h5>
                      <span className="text-sm text-gray-400">Jul 2022 - Abr 2023</span>
                    </div>
                    <p className="text-sm text-[var(--accent-cyan)] font-medium">Fintech • Remoto</p>
                    <ul className="text-sm text-gray-300 space-y-1 leading-relaxed list-disc list-inside">
                      <li>Microserviços Python e FastAPI para soluções de crédito e empréstimos</li>
                      <li>Deploy com Jenkins, AWS e Rancher para features de grande porte</li>
                      <li>Monitoramento com Splunk e OpenTelemetry, caching com Redis</li>
                    </ul>
                  </div>
                </div>

                {/* SenseData */}
                <div className="relative pl-6 border-l-2 border-white/10">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--accent-lilac)]"></div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h5 className="text-lg font-semibold text-white">Backend Developer</h5>
                      <span className="text-sm text-gray-400">Set 2021 - Jul 2022</span>
                    </div>
                    <p className="text-sm text-[var(--accent-lilac)] font-medium">
                      Customer Success Platform • Remoto
                    </p>
                    <ul className="text-sm text-gray-300 space-y-1 leading-relaxed list-disc list-inside">
                      <li>Resolução rápida de hotfixes críticos em produção</li>
                      <li>Otimização de workflows Python/Flask reduzindo downtime significativamente</li>
                      <li>Padronização de desenvolvimento melhorando features existentes</li>
                    </ul>
                  </div>
                </div>

                {/* Previous roles collapsed */}
                <div className="relative pl-6 border-l-2 border-white/10">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--accent-cyan)]"></div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400 italic">
                      + Experiências anteriores como Programming Instructor e Web Development Intern
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-[var(--accent-lilac)] to-[var(--accent-cyan)] rounded-full"></span>
                Formação
              </h4>
              <div className="pl-6 border-l-2 border-white/10 relative">
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--accent-lilac)]"></div>
                <div className="space-y-1">
                  <h5 className="text-lg font-semibold text-white">Análise e Desenvolvimento de Sistemas</h5>
                  <p className="text-sm text-[var(--accent-lilac)] font-medium">
                    Instituto Federal de Educação, Ciência e Tecnologia da Bahia
                  </p>
                  <p className="text-sm text-gray-400">2019 - 2024 • Irecê, Bahia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}