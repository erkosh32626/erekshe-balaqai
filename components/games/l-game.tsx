"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, Trophy, Cloud, Star, Sparkles } from "lucide-react"

interface CloudItem {
  id: number
  x: number
  y: number
  size: number
  points: number
  type: "normal" | "golden" | "rainbow"
}

export function LGame() {
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [clouds, setClouds] = useState<CloudItem[]>([])
  const [planePosition, setPlanePosition] = useState({ x: 20, y: 50 })
  const [timeLeft, setTimeLeft] = useState(45)
  const [combo, setCombo] = useState(0)
  const [showEffect, setShowEffect] = useState<{ x: number; y: number; points: number } | null>(null)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const lastCollectTime = useRef(0)

  const generateCloud = useCallback((): CloudItem => {
    const rand = Math.random()
    let type: "normal" | "golden" | "rainbow" = "normal"
    let points = 10
    
    if (rand > 0.95) {
      type = "rainbow"
      points = 50
    } else if (rand > 0.8) {
      type = "golden"
      points = 25
    }

    return {
      id: Date.now() + Math.random(),
      x: 30 + Math.random() * 60,
      y: 10 + Math.random() * 75,
      size: 35 + Math.random() * 25,
      points,
      type,
    }
  }, [])

  const startGame = useCallback(() => {
    setScore(0)
    setPlanePosition({ x: 20, y: 50 })
    setTimeLeft(45)
    setCombo(0)
    setIsPlaying(true)
    
    // Generate initial clouds
    const initialClouds: CloudItem[] = []
    for (let i = 0; i < 6; i++) {
      initialClouds.push(generateCloud())
    }
    setClouds(initialClouds)
  }, [generateCloud])

  const collectCloud = useCallback((cloud: CloudItem, e: React.MouseEvent) => {
    e.stopPropagation()
    
    const now = Date.now()
    const timeSinceLastCollect = now - lastCollectTime.current
    
    // Combo system
    if (timeSinceLastCollect < 1500) {
      setCombo(prev => Math.min(prev + 1, 5))
    } else {
      setCombo(1)
    }
    lastCollectTime.current = now

    const bonusPoints = Math.floor(cloud.points * (1 + combo * 0.2))
    setScore(prev => prev + bonusPoints)
    
    // Show effect
    setShowEffect({ x: cloud.x, y: cloud.y, points: bonusPoints })
    setTimeout(() => setShowEffect(null), 500)

    // Remove collected cloud
    setClouds(prev => prev.filter(c => c.id !== cloud.id))

    // Add new cloud after delay
    setTimeout(() => {
      setClouds(prev => [...prev, generateCloud()])
    }, 300)
  }, [combo, generateCloud])

  // Timer
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, timeLeft])

  // End game when time runs out
  useEffect(() => {
    if (timeLeft <= 0 && isPlaying) {
      setIsPlaying(false)
    }
  }, [timeLeft, isPlaying])

  // Keyboard controls
  useEffect(() => {
    if (!isPlaying) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 5
      setPlanePosition(prev => {
        let newX = prev.x
        let newY = prev.y
        
        switch (e.key) {
          case "ArrowUp":
          case "w":
          case "W":
            newY = Math.max(5, prev.y - step)
            break
          case "ArrowDown":
          case "s":
          case "S":
            newY = Math.min(90, prev.y + step)
            break
          case "ArrowLeft":
          case "a":
          case "A":
            newX = Math.max(5, prev.x - step)
            break
          case "ArrowRight":
          case "d":
          case "D":
            newX = Math.min(90, prev.x + step)
            break
        }
        
        return { x: newX, y: newY }
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isPlaying])

  // Check collision between plane and clouds
  useEffect(() => {
    if (!isPlaying) return

    const checkCollision = () => {
      clouds.forEach(cloud => {
        const dx = Math.abs(planePosition.x - cloud.x)
        const dy = Math.abs(planePosition.y - cloud.y)
        const collisionDistance = (cloud.size / 2 + 30) / 4 // Adjusted for percentages

        if (dx < collisionDistance && dy < collisionDistance) {
          const now = Date.now()
          const timeSinceLastCollect = now - lastCollectTime.current
          
          if (timeSinceLastCollect < 1500) {
            setCombo(prev => Math.min(prev + 1, 5))
          } else {
            setCombo(1)
          }
          lastCollectTime.current = now

          const bonusPoints = Math.floor(cloud.points * (1 + combo * 0.2))
          setScore(prev => prev + bonusPoints)
          
          setShowEffect({ x: cloud.x, y: cloud.y, points: bonusPoints })
          setTimeout(() => setShowEffect(null), 500)

          setClouds(prev => prev.filter(c => c.id !== cloud.id))

          setTimeout(() => {
            setClouds(prev => [...prev, generateCloud()])
          }, 300)
        }
      })
    }

    const interval = setInterval(checkCollision, 100)
    return () => clearInterval(interval)
  }, [isPlaying, planePosition, clouds, combo, generateCloud])

  // Handle click/touch to move plane
  const handleGameAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current || !isPlaying) return

    const rect = gameAreaRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setPlanePosition({
      x: Math.max(5, Math.min(90, x)),
      y: Math.max(5, Math.min(90, y)),
    })
  }

  const getCloudColor = (type: string) => {
    switch (type) {
      case "golden":
        return "text-yellow-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
      case "rainbow":
        return "text-pink-300 drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]"
      default:
        return "text-white drop-shadow-md"
    }
  }

  return (
    <div className="p-6">
      {!isPlaying && timeLeft === 45 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl font-bold text-blue-500">Л</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">Ұшақпен ұш!</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Ұшақты бұлттарға жеткізіп «Л-л-л» деп айт! 
            Ұшақты тышқанмен немесе пернетақтамен басқар. Алтын және кемпірқосақ бұлттар көп ұпай береді!
          </p>
          <button
            onClick={startGame}
            className="px-8 py-4 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            Ойынды бастау
          </button>
        </div>
      ) : !isPlaying && timeLeft <= 0 ? (
        <div className="text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <Trophy className="w-20 h-20 text-amber-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Керемет!</h2>
          <p className="text-5xl font-bold text-primary mb-6">{score} ұпай</p>
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(Math.min(5, Math.floor(score / 100)))].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <button
            onClick={startGame}
            className="px-8 py-4 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            Қайта ойнау
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Score and Timer */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-amber-500/10 px-3 py-2 rounded-xl">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-foreground">{score}</span>
              </div>
              {combo > 1 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 bg-purple-500/10 px-3 py-2 rounded-xl"
                >
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="font-bold text-purple-500">x{combo}</span>
                </motion.div>
              )}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
                timeLeft <= 10 ? "bg-red-500/10" : "bg-blue-500/10"
              }`}>
                <span className={`font-bold ${timeLeft <= 10 ? "text-red-500" : "text-blue-500"}`}>
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
          <div 
            ref={gameAreaRef}
            className="relative h-80 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 dark:from-sky-900 dark:via-sky-800 dark:to-sky-700 rounded-2xl overflow-hidden cursor-pointer select-none"
            onClick={handleGameAreaClick}
          >
            {/* Sun */}
            <motion.div 
              className="absolute top-4 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-lg"
              animate={{ 
                boxShadow: ["0 0 20px rgba(250,204,21,0.4)", "0 0 40px rgba(250,204,21,0.6)", "0 0 20px rgba(250,204,21,0.4)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Clouds */}
            <AnimatePresence>
              {clouds.map((cloud) => (
                <motion.button
                  key={cloud.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0, y: -30 }}
                  className={`absolute cursor-pointer ${getCloudColor(cloud.type)}`}
                  style={{
                    left: `${cloud.x}%`,
                    top: `${cloud.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={(e) => collectCloud(cloud, e)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Cloud style={{ width: cloud.size, height: cloud.size }} />
                  {cloud.type === "golden" && (
                    <Star className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-yellow-600" />
                  )}
                  {cloud.type === "rainbow" && (
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-pink-600" />
                  )}
                </motion.button>
              ))}
            </AnimatePresence>

            {/* Points effect */}
            <AnimatePresence>
              {showEffect && (
                <motion.div
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -40, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  className="absolute pointer-events-none font-bold text-2xl text-yellow-400"
                  style={{
                    left: `${showEffect.x}%`,
                    top: `${showEffect.y}%`,
                    transform: "translate(-50%, -50%)",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  +{showEffect.points}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Plane */}
            <motion.div
              className="absolute pointer-events-none"
              animate={{ 
                left: `${planePosition.x}%`, 
                top: `${planePosition.y}%` 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <div className="relative">
                {/* Plane body */}
                <div className="w-16 h-8 bg-white rounded-full shadow-lg relative">
                  {/* Cockpit */}
                  <div className="absolute top-1 left-8 w-5 h-4 bg-sky-400 rounded-t-full" />
                  {/* Wings */}
                  <div className="absolute top-3 left-2 w-12 h-2 bg-white rounded-full shadow" />
                  {/* Tail */}
                  <div className="absolute -top-2 left-1 w-4 h-4 bg-white rounded-t-lg" />
                  {/* Tail fin */}
                  <div className="absolute -top-3 left-2 w-2 h-3 bg-red-500 rounded-t" />
                  {/* Engine trail */}
                  <motion.div
                    className="absolute right-full top-1/2 -translate-y-1/2"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  >
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                      <div className="w-1 h-1 bg-white/20 rounded-full" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Instructions */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              «Л-л-л» деп айтып, бұлттарды жина! Экранды басып немесе WASD/көрсеткі пернелерімен ұшақты басқар.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Cloud className="w-4 h-4 text-white" /> 10 ұпай
              </span>
              <span className="flex items-center gap-1">
                <Cloud className="w-4 h-4 text-yellow-300" /> 25 ұпай
              </span>
              <span className="flex items-center gap-1">
                <Cloud className="w-4 h-4 text-pink-300" /> 50 ұпай
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
