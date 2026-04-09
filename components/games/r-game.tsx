"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, Trophy, Volume2, Star } from "lucide-react"

export function RGame() {
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [enginePower, setEnginePower] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [distance, setDistance] = useState(0)
  const [combo, setCombo] = useState(0)
  const [showCombo, setShowCombo] = useState(false)
  const lastPressTime = useRef(0)
  const gameLoop = useRef<NodeJS.Timeout | null>(null)

  const startGame = () => {
    setScore(0)
    setEnginePower(0)
    setSpeed(0)
    setDistance(0)
    setCombo(0)
    setIsPlaying(true)
  }

  const makeEngineSound = useCallback(() => {
    const now = Date.now()
    const timeSinceLastPress = now - lastPressTime.current
    
    // Combo system - faster presses = more points
    if (timeSinceLastPress < 500 && timeSinceLastPress > 50) {
      setCombo(prev => Math.min(prev + 1, 10))
      setShowCombo(true)
      setTimeout(() => setShowCombo(false), 300)
    } else if (timeSinceLastPress > 1000) {
      setCombo(0)
    }
    
    lastPressTime.current = now
    
    // Add power based on combo
    const powerBoost = 15 + combo * 2
    setEnginePower(prev => Math.min(100, prev + powerBoost))
    setScore(prev => prev + 1 + combo)
  }, [combo])

  // Game loop
  useEffect(() => {
    if (!isPlaying) return

    gameLoop.current = setInterval(() => {
      setEnginePower(prev => {
        const newPower = Math.max(0, prev - 2)
        return newPower
      })
      
      setSpeed(prev => {
        // Speed based on engine power
        const targetSpeed = enginePower * 1.5
        const newSpeed = prev + (targetSpeed - prev) * 0.1
        return Math.max(0, newSpeed)
      })
      
      setDistance(prev => prev + speed * 0.01)
    }, 50)

    return () => {
      if (gameLoop.current) {
        clearInterval(gameLoop.current)
      }
    }
  }, [isPlaying, enginePower, speed])

  useEffect(() => {
    if (!isPlaying) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "r" || e.key === "R" || e.key === "р" || e.key === "Р") {
        e.preventDefault()
        makeEngineSound()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isPlaying, makeEngineSound])

  const stopGame = () => {
    setIsPlaying(false)
    if (gameLoop.current) {
      clearInterval(gameLoop.current)
    }
  }

  return (
    <div className="p-6">
      {!isPlaying ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl font-bold text-red-500">Р</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">Моторды оталдыр!</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Көлік моторының дыбысына еліктеп «Р-р-р» деп айт! 
            Қызыл батырманы жиі басып мотор қуатын арттыр және алысқа жет!
          </p>
          {score > 0 && (
            <div className="mb-6 p-4 bg-amber-500/10 rounded-2xl inline-block">
              <p className="text-amber-600 dark:text-amber-400">Соңғы нәтиже: {score} ұпай, {distance.toFixed(0)} метр</p>
            </div>
          )}
          <button
            onClick={startGame}
            className="px-8 py-4 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
          >
            Ойынды бастау
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Score and Stats */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-amber-500/10 px-3 py-2 rounded-xl">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-foreground">{score}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-2 rounded-xl">
                <span className="text-blue-500 font-medium">{distance.toFixed(0)}м</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 px-3 py-2 rounded-xl">
                <span className="text-green-500 font-medium">{speed.toFixed(0)} км/с</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={stopGame}
                className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-foreground"
              >
                Тоқтату
              </button>
              <button
                onClick={startGame}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Engine Power Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Мотор қуаты</span>
              <span className="font-medium text-foreground">{enginePower.toFixed(0)}%</span>
            </div>
            <div className="h-6 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: enginePower > 70 
                    ? "linear-gradient(90deg, #22c55e, #16a34a)" 
                    : enginePower > 30 
                    ? "linear-gradient(90deg, #f59e0b, #d97706)"
                    : "linear-gradient(90deg, #ef4444, #dc2626)"
                }}
                animate={{ width: `${enginePower}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Game Area - Road View */}
          <div className="relative h-48 bg-gradient-to-b from-sky-400 to-sky-200 dark:from-sky-900 dark:to-sky-700 rounded-2xl overflow-hidden">
            {/* Mountains */}
            <div className="absolute bottom-16 left-0 right-0">
              <svg viewBox="0 0 400 100" className="w-full h-16 text-slate-400 dark:text-slate-600">
                <path d="M0,100 L50,60 L100,80 L150,40 L200,70 L250,30 L300,60 L350,45 L400,70 L400,100 Z" fill="currentColor" />
              </svg>
            </div>
            
            {/* Road */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-700">
              {/* Road lines moving */}
              <div className="absolute inset-0 flex items-center overflow-hidden">
                <motion.div 
                  className="flex gap-8 whitespace-nowrap"
                  animate={{ x: [-200, 0] }}
                  transition={{ 
                    duration: Math.max(0.5, 3 - speed * 0.02),
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-16 h-2 bg-yellow-400 rounded" />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Car */}
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
              animate={{ 
                y: enginePower > 50 ? [0, -2, 0] : 0,
                scale: enginePower > 70 ? [1, 1.02, 1] : 1
              }}
              transition={{ 
                duration: 0.1,
                repeat: enginePower > 50 ? Infinity : 0
              }}
            >
              <div className="relative">
                {/* Car body */}
                <div className="w-20 h-10 bg-red-500 rounded-lg relative">
                  {/* Windows */}
                  <div className="absolute top-1 left-3 right-3 h-4 bg-sky-300 rounded-t" />
                  {/* Headlights */}
                  <motion.div 
                    className="absolute top-2 -left-1 w-2 h-2 rounded-full bg-yellow-300"
                    animate={{ opacity: enginePower > 30 ? [0.5, 1, 0.5] : 0.3 }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute top-2 -right-1 w-2 h-2 rounded-full bg-yellow-300"
                    animate={{ opacity: enginePower > 30 ? [0.5, 1, 0.5] : 0.3 }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                  />
                  {/* Wheels */}
                  <motion.div 
                    className="absolute -bottom-2 left-2 w-5 h-5 bg-slate-800 rounded-full border-2 border-slate-600"
                    animate={{ rotate: speed > 0 ? 360 : 0 }}
                    transition={{ duration: Math.max(0.2, 1 - speed * 0.005), repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute -bottom-2 right-2 w-5 h-5 bg-slate-800 rounded-full border-2 border-slate-600"
                    animate={{ rotate: speed > 0 ? 360 : 0 }}
                    transition={{ duration: Math.max(0.2, 1 - speed * 0.005), repeat: Infinity, ease: "linear" }}
                  />
                </div>
                {/* Exhaust smoke */}
                {enginePower > 20 && (
                  <motion.div
                    className="absolute -left-4 bottom-1"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: [0.8, 0], x: -20, y: [-5, -15] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <div className="w-3 h-3 bg-slate-400 rounded-full" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Combo indicator */}
            <AnimatePresence>
              {showCombo && combo > 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -20 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
                >
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-bold text-yellow-400">x{combo}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground text-center">
              «Р-р-р» деп айтып, батырманы жиі бас! Комбо жина!
            </p>
            
            {/* Engine button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={makeEngineSound}
              className="relative w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white font-bold text-2xl shadow-xl hover:from-red-600 hover:to-red-700 transition-colors flex flex-col items-center justify-center"
            >
              <Volume2 className="w-8 h-8 mb-2" />
              <span>Р-р-р!</span>
              {combo > 0 && (
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-900 font-bold text-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  x{combo}
                </motion.div>
              )}
            </motion.button>

            <p className="text-xs text-muted-foreground">
              Пернетақтадан R немесе Space батырмасын басуға болады
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
