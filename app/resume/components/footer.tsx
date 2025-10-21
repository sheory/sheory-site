import React from "react"

export default function Footer() {
  return (
    <footer className="py-8">
      <div className="container mx-auto text-center text-sm text-white/60">© {new Date().getFullYear()} Sheory.dev</div>
    </footer>
  )
}
