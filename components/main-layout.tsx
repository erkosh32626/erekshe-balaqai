"use client"

import { AppSidebar } from "./app-sidebar"
import { FloatingLetters } from "./floating-letters"
import { Footer } from "./footer"
import { Chatbot } from "./chatbot"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <FloatingLetters />
      <AppSidebar />
      <div className="flex-1 lg:ml-[80px] flex flex-col relative z-10">
        <main className="flex-1 overflow-x-hidden">
          <div className="p-4 lg:p-8 pt-16 lg:pt-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
      <Chatbot />
    </div>
  )
}
