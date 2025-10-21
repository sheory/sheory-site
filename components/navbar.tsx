"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="glass-light rounded-full border border-white/10 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-2 border-white" />
              </div>
              <div className="text-xl font-bold text-white">
                Sheory<span className="gradient-text">.dev</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#blog" className="text-white-300 hover:text-white transition-colors text-sm font-medium">
                Blog
              </Link>
              <Link href="/#resume" className="text-white-300 hover:text-white transition-colors text-sm font-medium">
                Resume Builder
              </Link>
              <Link href="/#about" className="text-white-300 hover:text-white transition-colors text-sm font-medium">
                About
              </Link>
              <Button className="gradient-primary text-white font-semibold px-6 py-2 rounded-full border-0 text-sm">
                Contact
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />

          {/* Menu modal */}
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md md:hidden">
            <div className="glass-light rounded-3xl border border-white/10 p-8 space-y-6 animate-scale-in">
              {/* Logo */}
              <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border-2 border-white" />
                </div>
                <div className="text-xl font-bold text-white">
                  Sheory<span className="gradient-text">.dev</span>
                </div>
              </div>

              {/* Menu items */}
              <nav className="space-y-4">
                <Link
                  href="/#blog"
                  className="block text-gray-300 hover:text-white transition-colors text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/#resume"
                  className="block text-gray-300 hover:text-white transition-colors text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Resume Builder
                </Link>
                <Link
                  href="/#about"
                  className="block text-gray-300 hover:text-white transition-colors text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </nav>

              {/* Contact button */}
              <Button className="gradient-primary text-white font-semibold px-6 py-3 rounded-full border-0 text-base w-full">
                Contact
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
