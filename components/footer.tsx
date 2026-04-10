"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Instagram, Youtube, Send, MessageCircle } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-11">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo />
              <div>
                <h3 className="font-bold text-lg text-foreground">Dem</h3>
                <p className="text-xs text-muted-foreground">Логопедиялық платформа</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Балаларыңыздың сөйлеу дамуына көмектесетін қазақ тіліндегі алғашқы онлайн платформа.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Сілтемелер</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/diagnostika" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Диагностика
                </Link>
              </li>
              <li>
                <Link href="/testter" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Тесттер
                </Link>
              </li>
              <li>
                <Link href="/oiyndar" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Ойындар
                </Link>
              </li>
              <li>
                <Link href="/prezentatsiyalar" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Презентациялар
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Байланыс</h4>
            <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+7 778 227 1826</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>erekshebalaqai@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span> қаласы, Қазақстан</span>
              </li>
            </ul>
          </div>

          {/* Social media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Әлеуметтік желілер</h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-xl flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-xl flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-xl flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-xl flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dem. Барлық құқықтар қорғалған.
          </p>
        </div>
      </div>
    </footer>
  )
}
