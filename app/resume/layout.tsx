// app/resume/layout.tsx
import "@/app/globals.css"
import type { ReactNode } from "react"

export const metadata = {
  title: "Resume Toolkit | Sheory.dev",
  description:
    "Crie, compare e prepare-se para entrevistas técnicas com o Resume Toolkit da Sheory.dev",
}

export default function ResumeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-[#0d021f] via-[#100726] to-[#0a0a14] text-gray-200 min-h-screen">
      {children}
    </div>
  )
}
