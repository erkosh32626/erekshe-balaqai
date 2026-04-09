"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, Trophy } from "lucide-react"

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  speed: number
  popped: boolean
}

export function ShGame() {
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [combo, setCombo] = useState(0)

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setCombo(0)
    setBubbles([])
    setIsPlaying(true)
  }

  const popBubble = useCallback((id: number) => {
    setBubbles((prev) =>
      prev.map((bubble) =>
        bubble.id === id ? { ...bubble, popped: true } : bubble
      )
    )
    setCombo((prev) => prev + 1)
    setScore((prev) => prev + 10 + combo * 2)
  }, [combo])

  // Generate bubbles
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return

    const interval = setInterval(() => {
      setBubbles((prev) => {
        const activeBubbles = prev.filter((b) => !b.popped && b.y > -10)
        
        if (activeBubbles.length < 8 && Math.random() > 0.5) {
          return [
            ...prev,
            {
              id: Date.now(),
              x: 10 + Math.random() * 80,
              y: 100,
              size: 40 + Math.random() * 40,
              speed: 0.5 + Math.random() * 1,
              popped: false,
            },
          ]
        }
        return prev
      })
    }, 300)

    return () => clearInterval(interval)
  }, [isPlaying, timeLeft])

  // Move bubbles up
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return

    const interval = setInterval(() => {
      setBubbles((prev) =>
        prev
          .map((bubble) => ({
            ...bubble,
            y: bubble.popped ? bubble.y : bubble.y - bubble.speed,
          }))
          .filter((b) => b.y > -20 || b.popped)
      )
    }, 50)

    return () => clearInterval(interval)
  }, [isPlaying, timeLeft])

  // Timer
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, timeLeft])

  // End game
  useEffect(() => {
    if (timeLeft <= 0 && isPlaying) {
      setIsPlaying(false)
    }
  }, [timeLeft, isPlaying])

  // Reset combo after inactivity
  useEffect(() => {
    if (!isPlaying) return

    const timeout = setTimeout(() => {
      setCombo(0)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [combo, isPlaying])

  return (
    <div className="p-6">
      {!isPlaying && timeLeft === 30 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl font-bold text-green-500">Ш</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Көпіршіктерді жар!</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Көпіршіктерді басып «Ш-ш-ш» деп айт! 
            Неғұрлым тез бассаң, соғұрлым көп ұпай жинайсың.
          </p>
          <button
            onClick={startGame}
            className="px-8 py-4 rounded-2xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
          >
            Ойынды бастау
          </button>
        </div>
      ) : !isPlaying && timeLeft <= 0 ? (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Тамаша!</h2>
          <p className="text-4xl font-bold text-primary mb-6">{score} ұпай</p>
          <button
            onClick={startGame}
            className="px-8 py-4 rounded-2xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
          >
            Қайта ойнау
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Score and Timer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="font-bold">{score}</span>
              </div>
              {combo > 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-1 rounded-full bg-green-500/20 text-green-600 text-sm font-bold"
                >
                  x{combo} комбо!
                </motion.div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Уақыт:</span>
                <span className={`font-bold ${timeLeft <= 10 ? "text-red-500" : ""}`}>
                  {timeLeft}с
                </span>
              </div>
            </div>
            <button
              onClick={startGame}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Game Area */}
          <div className="relative h-80 bg-gradient-to-b from-teal-100 to-cyan-200 dark:from-teal-900 dark:to-cyan-800 rounded-2xl overflow-hidden">
            {/* Bubbles */}
            <AnimatePresence>
              {bubbles.filter((b) => !b.popped).map((bubble) => (
                <motion.button
                  key={bubble.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 0.8,
                    y: `${bubble.y}%`,
                  }}
                  exit={{ 
                    scale: 1.5, 
                    opacity: 0,
                  }}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${bubble.x}%`,
                    bottom: 0,
                    transform: "translateX(-50%)",
                    width: bubble.size,
                    height: bubble.size,
                  }}
                  onClick={() => popBubble(bubble.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <div 
                    className="w-full h-full rounded-full bg-gradient-to-br from-white/60 to-green-300/60 border-2 border-white/40 shadow-lg"
                    style={{
                      boxShadow: "inset -5px -5px 15px rgba(255,255,255,0.4), inset 5px 5px 15px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/60" />
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>

            {/* Pop effects */}
            <AnimatePresence>
              {bubbles.filter((b) => b.popped).map((bubble) => (
                <motion.div
                  key={`pop-${bubble.id}`}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${bubble.x}%`,
                    bottom: `${100 - bubble.y}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                >
                  <span className="text-2xl font-bold text-green-500">Ш!</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Instructions */}
          <p className="text-sm text-muted-foreground text-center">
            Көпіршіктерді басып «Ш-ш-ш» деп айт!
          </p>
        </div>
      )}
    </div>
  )
}
