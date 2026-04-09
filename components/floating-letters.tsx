"use client"

import { motion } from "framer-motion"

const letters = [
  { char: "А", x: 5, y: 10, delay: 0, size: "text-4xl" },
  { char: "Ә", x: 85, y: 15, delay: 0.5, size: "text-3xl" },
  { char: "Р", x: 15, y: 70, delay: 1, size: "text-5xl" },
  { char: "Л", x: 90, y: 60, delay: 1.5, size: "text-4xl" },
  { char: "Ш", x: 50, y: 85, delay: 2, size: "text-3xl" },
  { char: "Б", x: 75, y: 30, delay: 2.5, size: "text-4xl" },
  { char: "М", x: 25, y: 40, delay: 3, size: "text-3xl" },
  { char: "Н", x: 60, y: 20, delay: 3.5, size: "text-4xl" },
]

export function FloatingLetters() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {letters.map((letter, index) => (
        <motion.div
          key={index}
          className={`absolute ${letter.size} font-bold text-primary/10 dark:text-primary/5`}
          style={{ left: `${letter.x}%`, top: `${letter.y}%` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            delay: letter.delay,
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {letter.char}
        </motion.div>
      ))}
    </div>
  )
}
