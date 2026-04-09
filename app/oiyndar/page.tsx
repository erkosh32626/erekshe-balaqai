"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MainLayout } from "@/components/main-layout"
import { 
  Car, 
  Plane, 
  CircleDot,
  ArrowLeft,
  Volume2,
  Star,
  Trophy
} from "lucide-react"
import { RGame } from "@/components/games/r-game"
import { LGame } from "@/components/games/l-game"
import { ShGame } from "@/components/games/sh-game"

interface Game {
  id: string
  title: string
  sound: string
  description: string
  icon: typeof Car
  color: string
  bgColor: string
}

const games: Game[] = [
  {
    id: "r",
    title: "Моторды оталдыр!",
    sound: "Р",
    description: "Көлік моторының дыбысына еліктеп «Р» дыбысын жаттықтыр",
    icon: Car,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: "l",
    title: "Ұшақпен ұш!",
    sound: "Л",
    description: "Ұшақты бұлттар арасынан өткізіп «Л» дыбысын үйрен",
    icon: Plane,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "sh",
    title: "Көпіршіктерді жар!",
    sound: "Ш",
    description: "Көпіршіктерді басып «Ш» дыбысын жаттықтыр",
    icon: CircleDot,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
]

export default function OiyndarPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const currentGame = games.find((g) => g.id === selectedGame)

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  Интерактивті ойындар
                </h1>
                <p className="text-muted-foreground">
                  Қызықты ойындар арқылы дыбыстарды жаттықтыр!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {games.map((game) => (
                  <motion.button
                    key={game.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedGame(game.id)}
                    className={`p-6 rounded-3xl ${game.bgColor} border border-border hover:shadow-xl transition-all text-left`}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-card flex items-center justify-center mb-4 ${game.color}`}>
                      <game.icon className="w-8 h-8" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-3xl font-bold ${game.color}`}>{game.sound}</span>
                      <Volume2 className={`w-5 h-5 ${game.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                    <p className="text-sm text-muted-foreground">{game.description}</p>
                  </motion.button>
                ))}
              </div>

              {/* Tips Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 p-6 rounded-3xl bg-card border border-border"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  Ойын ережелері
                </h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <span>Әр ойын белгілі бір дыбысты жаттықтыруға арналған</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <span>Ойын кезінде дыбысты қатты айтып жаттығыңыз</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <span>Күнделікті 10-15 минут ойнау жеткілікті</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedGame(null)}
                className="flex items-center gap-2 mb-6 px-4 py-2 rounded-2xl bg-card border border-border hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Артқа</span>
              </button>

              {/* Game Header */}
              {currentGame && (
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${currentGame.bgColor} mb-4`}>
                    <currentGame.icon className={`w-5 h-5 ${currentGame.color}`} />
                    <span className={`font-bold ${currentGame.color}`}>{currentGame.sound}</span>
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold">{currentGame.title}</h1>
                </div>
              )}

              {/* Game Component */}
              <div className="rounded-3xl bg-card border border-border overflow-hidden">
                {selectedGame === "r" && <RGame />}
                {selectedGame === "l" && <LGame />}
                {selectedGame === "sh" && <ShGame />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  )
}
