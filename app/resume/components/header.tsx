"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="glass-light rounded-full px-4 py-3 flex items-center justify-between border border-white/10">
        <Link href="/resume" className="text-lg font-bold text-white">
          Resume Builder
        </Link>
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-sm text-white/80 hover:text-white">
            Home
          </Link>
          <Link href="/resume/builder" className="text-sm text-white/80 hover:text-white">
            Builder
          </Link>
        </div>
      </div>
    </header>
  )
}
