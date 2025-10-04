"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const links = [
    { href: "/", label: "Home", section: "home" },
    { href: "/#sobre-mim", label: "Sobre mim", isAnchor: true, section: "sobre-mim" },
    { href: "/artigos", label: "Artigos", section: "artigos" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "sobre-mim"]
      const scrollPosition = window.scrollY + 100 // Offset for navbar

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor?: boolean) => {
    if (isAnchor && href.startsWith("/#")) {
      e.preventDefault()
      const id = href.substring(2)
      const element = document.getElementById(id)
      if (element) {
        const navbarHeight = 64
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navbarHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      } else if (pathname !== "/") {
        window.location.href = href
      }
      setIsOpen(false)
    }
  }

  const isLinkActive = (link: (typeof links)[0]) => {
    if (link.href === "/artigos") {
      return pathname === "/artigos" || pathname.startsWith("/artigos/")
    }
    if (link.isAnchor) {
      return pathname === "/" && activeSection === link.section
    }
    return pathname === "/" && activeSection === "home"
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-lg bg-[#0d0d0f]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold cursor-pointer" style={{ color: "var(--accent-lilac)" }}>
            Sheory
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href, link.isAnchor)}
                className="text-sm font-medium transition-colors hover:opacity-80 cursor-pointer"
                style={{ color: isLinkActive(link) ? "var(--accent-cyan)" : "white" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 cursor-pointer" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href, link.isAnchor)}
                className="block text-sm font-medium transition-colors hover:opacity-80 cursor-pointer"
                style={{ color: isLinkActive(link) ? "var(--accent-cyan)" : "white" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
