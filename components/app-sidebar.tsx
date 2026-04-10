"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Stethoscope,
  FileQuestion,
  Presentation,
  Gamepad2,
  Video,
  User,
  Sun,
  Moon,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogIn,
  LogOut
} from "lucide-react"
import { useTheme } from "./theme-provider"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const navItems = [
  { href: "/", label: "Басты бет", icon: Home },
  { href: "/diagnostika", label: "Диагностика", icon: Stethoscope },
  { href: "/testter", label: "Тесттер", icon: FileQuestion },
  { href: "/prezentatsiyalar", label: "Презентациялар", icon: Presentation },
  { href: "/oiyndar", label: "Ойындар", icon: Gamepad2 },
  { href: "/video", label: "Видео", icon: Video },
  { href: "/profil", label: "Профиль", icon: User },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    setMounted(true)
    const supabase = createClient()
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-primary text-primary-foreground rounded-2xl shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Desktop collapse toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "hidden lg:flex fixed top-4 z-[60] p-2 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300",
          isCollapsed ? "left-[76px]" : "left-[268px]"
        )}
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-50 flex flex-col transition-all duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          isCollapsed ? "lg:w-[80px]" : "lg:w-[280px]",
          "w-[280px]"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "p-4 border-b border-sidebar-border",
          isCollapsed ? "lg:p-3" : ""
        )}>
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <div className={cn(
              "transition-all duration-300 overflow-hidden",
              isCollapsed ? "lg:w-0 lg:opacity-0" : "lg:w-auto lg:opacity-100",
              "w-auto opacity-100"
            )}>
              <h1 className="font-bold text-lg text-sidebar-foreground whitespace-nowrap">Dem</h1>
              <p className="text-xs text-sidebar-foreground/60 whitespace-nowrap">Логопедиялық платформа</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                  isCollapsed ? "lg:justify-center lg:px-3" : ""
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "" : "group-hover:scale-110 transition-transform"
                )} />
                <span className={cn(
                  "font-medium transition-all duration-300 whitespace-nowrap",
                  isCollapsed ? "lg:hidden" : ""
                )}>
                  {item.label}
                </span>
                {isActive && !isCollapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-2 w-2 h-2 bg-primary-foreground rounded-full hidden lg:block"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User and Theme section */}
        <div className={cn(
          "p-4 border-t border-sidebar-border space-y-2",
          isCollapsed ? "lg:p-2" : ""
        )}>
          {/* Auth button */}
          {user ? (
            <button
              onClick={handleLogout}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-destructive/10 hover:bg-destructive/20 transition-all duration-300 text-destructive",
                isCollapsed ? "lg:justify-center lg:px-3" : ""
              )}
              title={isCollapsed ? "Шығу" : undefined}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className={cn(
                "font-medium whitespace-nowrap",
                isCollapsed ? "lg:hidden" : ""
              )}>
                Шығу
              </span>
            </button>
          ) : (
            <Link
              href="/auth/login"
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-all duration-300 text-primary",
                isCollapsed ? "lg:justify-center lg:px-3" : ""
              )}
              title={isCollapsed ? "Кіру" : undefined}
            >
              <LogIn className="w-5 h-5 flex-shrink-0" />
              <span className={cn(
                "font-medium whitespace-nowrap",
                isCollapsed ? "lg:hidden" : ""
              )}>
                Кіру / Тіркелу
              </span>
            </Link>
          )}

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-sidebar-accent hover:bg-primary/10 transition-all duration-300",
              isCollapsed ? "lg:justify-center lg:px-3" : ""
            )}
            title={isCollapsed ? (mounted && theme === "dark" ? "Қараңғы режим" : "Жарық режим") : undefined}
          >
            <div className="w-5 h-5 flex-shrink-0">
              {mounted && (theme === "dark" ? (
                <Moon className="w-5 h-5 text-sidebar-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-sidebar-foreground" />
              ))}
            </div>
            <span className={cn(
              "font-medium text-sidebar-foreground whitespace-nowrap",
              isCollapsed ? "lg:hidden" : ""
            )}>
              {mounted ? (theme === "dark" ? "Қараңғы режим" : "Жарық режим") : "Режим"}
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}
