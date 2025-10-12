import { NextResponse } from "next/server"
import { spawn } from "child_process"
import { promises as fs } from "fs"
import path from "path"

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "Arquivo não enviado" }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const tempDir = path.join(process.cwd(), "tmp")
  await fs.mkdir(tempDir, { recursive: true })
  const filePath = path.join(tempDir, `resume-${Date.now()}.pdf`)
  await fs.writeFile(filePath, buffer)

  return new Promise((resolve) => {
    const python = spawn("python3", ["server/parse_resume.py", filePath])
    let output = ""

    python.stdout.on("data", (data) => (output += data.toString()))
    python.stderr.on("data", (data) => {
      console.error("🐍 Erro Python:", data.toString())
    })

    python.on("close", async () => {
      await fs.unlink(filePath)
      try {
        resolve(NextResponse.json(JSON.parse(output)))
      } catch (e) {
        resolve(NextResponse.json({ error: "Falha ao processar PDF" }, { status: 500 }))
      }
    })
  })
}
