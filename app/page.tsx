import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ParticlesBackground } from "@/components/particles-background"
import { HeroSection } from "@/components/hero-section"
import { BlogPreviewSection } from "@/components/blog-preview-section"
import { ResumePreviewSection } from "@/components/resume-preview-section"
import { AboutSection } from "@/components/about-section"

export default function Home() {
  return (
    <main className="relative min-h-screen text-foreground">
      <ParticlesBackground />
      <Navbar />
      <HeroSection />
      <ResumePreviewSection />
      <BlogPreviewSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
