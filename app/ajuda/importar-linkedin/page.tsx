import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

export default function ImportarLinkedInPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/curriculo">
          <Button variant="ghost" className="mb-6 cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Gerador
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-6 gradient-text">Como Importar Dados do LinkedIn</h1>

        <div className="space-y-6">
          <Card className="p-6 bg-[#1a1a1f] border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-white">Passo a Passo</h2>
            <ol className="space-y-4 text-gray-300">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-lilac)] flex items-center justify-center font-bold text-black">
                  1
                </span>
                <div>
                  <p className="font-semibold text-white mb-2">Acesse suas Configurações do LinkedIn</p>
                  <p>
                    Faça login no LinkedIn e vá em <strong>Configurações e Privacidade</strong>
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-cyan)] flex items-center justify-center font-bold text-black">
                  2
                </span>
                <div>
                  <p className="font-semibold text-white mb-2">Solicite seus dados</p>
                  <p>
                    Clique em <strong>Privacidade de dados</strong> → <strong>Obter uma cópia dos seus dados</strong>
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-lilac)] flex items-center justify-center font-bold text-black">
                  3
                </span>
                <div>
                  <p className="font-semibold text-white mb-2">Selecione os dados desejados</p>
                  <p>Marque as opções: Perfil, Experiências, Formação, Habilidades e Certificações</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-cyan)] flex items-center justify-center font-bold text-black">
                  4
                </span>
                <div>
                  <p className="font-semibold text-white mb-2">Aguarde o email</p>
                  <p>O LinkedIn enviará um arquivo ZIP para seu email em até 24 horas</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-lilac)] flex items-center justify-center font-bold text-black">
                  5
                </span>
                <div>
                  <p className="font-semibold text-white mb-2">Importe no gerador</p>
                  <p>
                    Volte ao gerador de currículo e clique em <strong>Importar dados do LinkedIn</strong>, depois
                    selecione o arquivo baixado
                  </p>
                </div>
              </li>
            </ol>
          </Card>

          <Card className="p-6 bg-[#1a1a1f] border-white/10">
            <h2 className="text-xl font-semibold mb-4 text-white">Dicas Importantes</h2>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>O processo de solicitação pode levar até 24 horas</li>
              <li>Você receberá um email do LinkedIn com o link para download</li>
              <li>O arquivo virá em formato ZIP contendo arquivos CSV</li>
              <li>Seus dados estarão organizados por categoria (perfil, experiências, etc.)</li>
              <li>Você pode solicitar seus dados quantas vezes quiser</li>
            </ul>
          </Card>

          <div className="flex justify-center">
            <Link href="/curriculo">
              <Button
                size="lg"
                className="cursor-pointer"
                style={{ backgroundColor: "var(--accent-cyan)", color: "#0d0d0f" }}
              >
                <FileText className="mr-2 h-5 w-5" />
                Voltar para o Gerador
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
