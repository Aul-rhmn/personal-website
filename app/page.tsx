"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Float,
  Environment,
  Torus,
  MeshDistortMaterial,
  Html,
  PerspectiveCamera,
  Text3D,
} from "@react-three/drei"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  Code,
  Palette,
  Zap,
  Globe,
  Smartphone,
  Database,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import Image from 'next/image';

function CodeParticles() {
  const points = useRef<THREE.Points>(null)
  const particleCount = 30 // Reduced from 100

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20 // Reduced range
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

    // Random colors for different code elements
    const colorChoice = Math.random()
    if (colorChoice < 0.33) {
      colors[i * 3] = 0.2
      colors[i * 3 + 1] = 0.8
      colors[i * 3 + 2] = 0.4 // Green
    } else if (colorChoice < 0.66) {
      colors[i * 3] = 0.2
      colors[i * 3 + 1] = 0.5
      colors[i * 3 + 2] = 1.0 // Blue
    } else {
      colors[i * 3] = 1.0
      colors[i * 3 + 1] = 0.6
      colors[i * 3 + 2] = 0.0 // Orange
    }
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.01 // Slower rotation
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.6} />
    </points>
  )
}

function FloatingCodeElements() {
  return (
    <>
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.6}>
        <Text3D font="/fonts/Inter_Bold.json" size={0.4} height={0.08} position={[2, 2, -1]}>
          {"</>"}
          <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.8} />
        </Text3D>
      </Float>

      <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.8}>
        <Text3D font="/fonts/Inter_Bold.json" size={0.35} height={0.07} position={[-3, -1, 2]}>
          {"{ }"}
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.7} />
        </Text3D>
      </Float>

      <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text3D font="/fonts/Inter_Bold.json" size={0.3} height={0.06} position={[5, -2, 1]}>
          {"()"}
          <meshStandardMaterial color="#8b5cf6" roughness={0.15} metalness={0.9} />
        </Text3D>
      </Float>

      <Float speed={0.7} rotationIntensity={0.25} floatIntensity={0.7}>
        <Text3D font="/fonts/Inter_Bold.json" size={0.38} height={0.07} position={[-4, 1, -2]}>
          {"</>"}
          <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.8} />
        </Text3D>
      </Float>

      <Float speed={0.5} rotationIntensity={0.15} floatIntensity={0.4}>
        <Text3D font="/fonts/Inter_Bold.json" size={0.32} height={0.06} position={[3, 3, 2]}>
          {"{}"}
          <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.7} />
        </Text3D>
      </Float>

      <Float speed={1.0} rotationIntensity={0.3} floatIntensity={0.9}>
        <Text3D font="/fonts/Inter_Bold.json" size={0.28} height={0.05} position={[-2, -3, 0]}>
          {"()"}
          <meshStandardMaterial color="#06b6d4" roughness={0.15} metalness={0.9} />
        </Text3D>
      </Float>
    </>
  )
}

function SkillOrb({ position, color, skill }: { position: [number, number, number]; color: string; skill: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.2}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
        {hovered && (
          <Html center>
            <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-border text-sm font-medium">
              {skill}
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  )
}

function Background3D() {
  return (
    <>
      <Environment preset="night" />
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.1} />

      <CodeParticles />
      <FloatingCodeElements />

      {/* Simplified geometric accent */}
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.6}>
        <Torus args={[3, 0.15, 8, 50]} position={[-6, 0, -5]} rotation={[0.4, 0.2, 0]}>
          <meshStandardMaterial color="#00ff88" roughness={0.1} metalness={0.8} transparent opacity={0.4} />
        </Torus>
      </Float>
    </>
  )
}

export default function PersonalWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [isTyping, setIsTyping] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  const heroTexts = ["Full Stack Developer", "Frontend Developer"]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const typeText = () => {
      const currentText = heroTexts[currentTextIndex]
      if (typedText.length < currentText.length) {
        setIsTyping(true)
        setTimeout(() => {
          setTypedText(currentText.slice(0, typedText.length + 1))
        }, 100)
      } else {
        setIsTyping(false)
        setTimeout(() => {
          setTypedText("")
          setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length)
        }, 2000)
      }
    }

    const timeout = setTimeout(typeText, isTyping ? 100 : 2000)
    return () => clearTimeout(timeout)
  }, [typedText, currentTextIndex, isTyping])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const skills = [
    { name: "React/Next.js", level: 80, icon: <Code className="w-4 h-4" /> },
    { name: "TypeScript", level: 80, icon: <Code className="w-4 h-4" /> },
    { name: "Javascript", level: 85, icon: <Code className="w-4 h-4" /> },
    { name: "Node.js", level: 78, icon: <Database className="w-4 h-4" /> },
    { name: "MongoDB", level: 78, icon: <Database className="w-4 h-4" /> },
    { name: "Web Performance", level: 80, icon: <Zap className="w-4 h-4" /> },
  ]

  const projects = [
    {
      title: "Pakaryan Heavy Rent",
      description: "Full-stack e-commerce a web application for renting heavy equipment across Java Island",
      tech: ["Next.js", "Typescript", "Supabase", "Tailwind", "React"],
      image: "/pakaryan.png",
      link: "https://pakaryan-heavy.vercel.app/",
      repo: "https://github.com/Aul-rhmn/pakaryan-heavy",
      featured: true,
    },
    {
      title: "Article Management",
      description: "A modern platform for managing articles",
      tech: ["React", "Next.js", "Tailwind CSS", "Typscript"],
      image: "/article.png",
      link: "https://articles-management-zeta.vercel.app/",
      repo: "https://github.com/Aul-rhmn/articles-management",
      featured: true,
    },
    {
      title: "Housettle",
      description: "Housettle is a web application designed to simplify the process of finding, managing, and booking accommodations for both short-term and long-term stays",
      tech: ["React", "Javascript", "Bootstrap", "MongoDB"],
      image: "/housettle.png",
      link: "https://housettle.vercel.app/",
      repo: "https://github.com/Aul-rhmn/housettle",
      featured: false,
    },
    {
      title: "Ongoing Projects",
      description: "",
      tech: [],
      image: "",
      link: "#",
      repo: "",
      featured: false,
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <div className="fixed inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <Background3D />
          </Suspense>
        </Canvas>
      </div>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrollY > 50
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="font-bold text-xl text-primary cursor-pointer transition-colors duration-300"
              onClick={() => scrollToSection("home")}
            >
              MAR
            </div>

            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-300 hover:text-primary relative ${
                    activeSection === item ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      activeSection === item ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              className="md:hidden transition-colors duration-300 hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden bg-card/95 backdrop-blur-xl border-b border-border transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block px-3 py-2 text-base font-medium capitalize text-muted-foreground hover:text-primary w-full text-left transition-colors duration-300 hover:bg-primary/5 rounded-lg"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section
        ref={heroRef}
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden z-10"
      >
        <div className="absolute inset-0 z-0">
          <Canvas>
            <Suspense fallback={null}>
              <Environment preset="night" />
              <PerspectiveCamera makeDefault position={[0, 0, 15]} />
              <OrbitControls enableZoom={false} enablePan={false} />

              <SkillOrb position={[-6, 3, 2]} color="#61dafb" skill="React" />
              <SkillOrb position={[6, -2, 1]} color="#68d391" skill="Node.js" />
              <SkillOrb position={[-4, -3, 3]} color="#f6ad55" skill="JavaScript" />
              <SkillOrb position={[5, 4, 2]} color="#3178c6" skill="TypeScript" />
              <SkillOrb position={[0, -5, 4]} color="#ec4899" skill="Design" />
            </Suspense>
          </Canvas>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <div className="space-y-8">
            <Avatar className="w-40 h-40 mx-auto border-4 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-110 animate-fade-in shadow-2xl shadow-primary/20 backdrop-blur-sm">
              <AvatarImage src="/profesional-me.png" />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">MAR</AvatarFallback>
            </Avatar>

            <div className="space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                Hi, I'm <span className="text-primary animate-pulse">Muhammad Aulia Rahman</span>
              </h1>
              <div className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto h-16 flex items-center justify-center">
                <span className="inline-block">
                  {typedText}
                  <span
                    className={`inline-block w-0.5 h-6 bg-primary ml-1 ${isTyping ? "animate-pulse" : "animate-ping"}`}
                  />
                </span>
              </div>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25 relative overflow-hidden backdrop-blur-sm"
              >
                <span className="relative z-10">View My Work</span>
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("https://wa.me/6282137735259", "_blank")}
                className="hover:scale-105 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-xl relative overflow-hidden group backdrop-blur-sm"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Button>
            </div>

            <div className="flex justify-center space-x-6 pt-8 animate-fade-in" style={{ animationDelay: "600ms" }}>
              {[
                { icon: Github, rotation: "rotate-12", link: "https://github.com/Aul-rhmn" },
                {
                  icon: Linkedin,
                  rotation: "-rotate-12",
                  link: "https://www.linkedin.com/in/muhammad-aulia-rahman-3b8ab0326/",
                },
                { icon: Mail, rotation: "rotate-12", link: "mailto:muharmaann@gmail.com" },
              ].map(({ icon: Icon, rotation, link }, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(link, "_blank")}
                  className={`hover:text-primary hover:scale-125 hover:${rotation} transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 relative group`}
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <Icon className="w-5 h-5 relative z-10" />
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-125 transition-transform cursor-pointer group"
          onClick={() => scrollToSection("about")}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
        </div>
      </section>

      <section id="about" className="py-20 bg-card/30 backdrop-blur-sm relative z-10" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleElements.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
              Passionate about creating digital experiences that make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 transition-all duration-1000 delay-200 ${visibleElements.has("about") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <p className="text-lg leading-relaxed">
                Driven by a fascination for how the technologies works, I am an aspiring developer focused on building intuitive and performant digital experiences. I thrive on turning complex problems into clean, elegant code and am committed to a journey of continuous improvement
              </p>
              <p className="text-lg leading-relaxed">
                I am a lifelong learner, constantly exploring new tools and techniques to enhance my craft. I am excited to contribute my skills to meaningful projects and collaborate with a team to build great things.
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {["Problem Solver", "Team Player", "Continuous Learner", "Open Source Contributor"].map(
                  (trait, index) => (
                    <Badge
                      key={trait}
                      variant="secondary"
                      className={`px-3 py-1 hover:scale-110 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer transform ${visibleElements.has("about") ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      {trait}
                    </Badge>
                  ),
                )}
              </div>
            </div>

            <div
              className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${visibleElements.has("about") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              {[
                { icon: Globe, title: "5+", subtitle: "Projects Completed", rotation: "-rotate-1" },
                { icon: Code, title: "10+", subtitle: "Technologies", rotation: "rotate-1" },
              ].map(({ icon: Icon, title, subtitle, rotation }, index) => (
                <Card
                  key={title}
                  className={`text-center p-6 hover:shadow-2xl hover:scale-105 hover:${rotation} transition-all duration-500 cursor-pointer group relative overflow-hidden ${
                    visibleElements.has("about") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10" />
                  <Icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10" />
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors relative z-10">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground relative z-10">{subtitle}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 relative z-10" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleElements.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="h-96 mb-12">
            <Canvas>
              <Suspense fallback={null}>
                <Environment preset="night" />
                <PerspectiveCamera makeDefault position={[0, 0, 12]} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />

                <SkillOrb position={[-4, 2, 0]} color="#61dafb" skill="React" />
                <SkillOrb position={[4, 2, 0]} color="#3178c6" skill="TypeScript" />
                <SkillOrb position={[-2, -2, 2]} color="#68d391" skill="Node.js" />
                <SkillOrb position={[2, -2, 2]} color="#f6ad55" skill="JavaScript" />
                <SkillOrb position={[0, 0, -2]} color="#ec4899" skill="Design" />
                <SkillOrb position={[-6, 0, 1]} color="#8b5cf6" skill="UI/UX" />
              </Suspense>
            </Canvas>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card
                key={skill.name}
                className={`p-6 hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer group relative overflow-hidden ${
                  visibleElements.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors relative z-10">
                    {skill.name}
                  </h3>
                </div>
                <div className="space-y-2 relative z-10">
                  <div className="flex justify-between text-sm">
                    <span>Proficiency</span>
                    <span className="font-medium group-hover:text-primary transition-colors relative z-10">
                      {skill.level}%
                    </span>
                  </div>
                  <Progress
                    value={visibleElements.has("skills") ? skill.level : 0}
                    className="h-2 group-hover:h-3 transition-all duration-300 relative z-10"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-card/30 backdrop-blur-sm relative z-10" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleElements.has("projects") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
              A showcase of my recent work and creative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className={`overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer group relative ${
                  project.featured ? "md:col-span-2 lg:col-span-1" : ""
                } ${visibleElements.has("projects") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  </a>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <ExternalLink className="w-8 h-8 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100" />
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors relative z-10">
                      {project.title}
                    </CardTitle>
                    {project.featured && (
                      <Badge className="bg-primary text-primary-foreground animate-pulse relative z-10">Featured</Badge>
                    )}
                  </div>
                  <CardDescription className="text-base leading-relaxed relative z-10">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className={`text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 transform ${
                          visibleElements.has("projects") ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                        } relative z-10`}
                        style={{ transitionDelay: `${index * 150 + techIndex * 50}ms` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                  className="w-full group hover:scale-105 transition-all duration-300 relative overflow-hidden backdrop-blur-sm relative z-10"
                  onClick={() => window.open(project.repo, "_blank")}
                  >
                    <span className="relative z-10">View Repo</span>
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300 relative z-10" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-card/30 backdrop-blur-sm relative z-10" data-animate>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${visibleElements.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto text-balance">
              Ready to bring your ideas to life? I'm always excited to discuss new projects and opportunities for
              collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Mail, title: "Email", value: "muharmaann@gmail.com", link: "mailto:muharmaann@gmail.com" },
              {
                icon: Linkedin,
                title: "LinkedIn",
                value: "@muhammad-aulia-rahman",
                link: "https://www.linkedin.com/in/muhammad-aulia-rahman-3b8ab0326/",
              },
              { icon: Github, title: "GitHub", value: "@Aul-rhmn", link: "https://github.com/Aul-rhmn" },
            ].map((contact, index) => (
              <Card
                key={contact.title}
                onClick={() => window.open(contact.link, "_blank")}
                className={`p-6 hover:shadow-2xl hover:scale-110 hover:-rotate-2 transition-all duration-500 cursor-pointer group relative overflow-hidden backdrop-blur-sm relative z-10 ${
                  visibleElements.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10" />
                <contact.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10" />
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors relative z-10">
                  {contact.title}
                </h3>
                <p className="text-muted-foreground relative z-10">{contact.value}</p>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => window.open("https://wa.me/6282137735259", "_blank")}
              className={`group hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/25 relative overflow-hidden backdrop-blur-sm relative z-10 ${
                visibleElements.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <span className="relative z-10">Get In Touch</span>
              <Mail className="ml-2 w-4 h-4 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300 relative z-10" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const link = document.createElement("a")
                link.href = "/Muhammad_Aulia_Rahman_CV.pdf"
                link.download = "Muhammad_Aulia_Rahman_CV.pdf"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              className={`group hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/25 relative overflow-hidden backdrop-blur-sm relative z-10 ${
                visibleElements.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <span className="relative z-10">Download CV</span>
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300 relative z-10" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 bg-background/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground">© Muhammad Aulia Rahman. Crafted with passion and precision.</p>
            </div>
            <div className="flex space-x-6">
              {[
                { icon: Github, rotation: "rotate-12", link: "https://github.com/Aul-rhmn" },
                {
                  icon: Linkedin,
                  rotation: "-rotate-12",
                  link: "https://www.linkedin.com/in/muhammad-aulia-rahman-3b8ab0326/",
                },
                { icon: Mail, rotation: "rotate-12", link: "mailto:muharmaann@gmail.com" },
              ].map(({ icon: Icon, rotation, link }, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(link, "_blank")}
                  className={`hover:text-primary hover:scale-125 hover:${rotation} transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 relative group backdrop-blur-sm relative z-10`}
                >
                  <Icon className="w-5 h-5 relative z-10" />
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 relative z-10" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
