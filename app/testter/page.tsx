"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MainLayout } from "@/components/main-layout"
import { 
  ClipboardList, 
  ChevronRight, 
  ChevronLeft,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  AlertTriangle
} from "lucide-react"

type AgeCategory = "5-7" | "8-12" | "13-17" | "18+"

interface Question {
  id: number
  text: string
}

const questions: Question[] = [
  { id: 1, text: "Әріптерді жиі шатастырасыз ба? (мысалы, б-д, п-т)" },
  { id: 2, text: "Оқу кезінде жолдарды жиі өткізіп жібересіз бе?" },
  { id: 3, text: "Жаңа сөздерді есте сақтау қиын ба?" },
  { id: 4, text: "Оқу жылдамдығыңыз құрдастарыңыздан баяу ма?" },
  { id: 5, text: "Жазу кезінде қателіктер жиі кетеді ме?" },
  { id: 6, text: "Оқығанды түсіну қиынға соға ма?" },
  { id: 7, text: "Сөздерді дұрыс айту қиынға соға ма?" },
  { id: 8, text: "Тапсырмаларды орындау ұзақ уақыт алады ма?" },
  { id: 9, text: "Ұқсас дыбыстарды ажырату қиын ба?" },
  { id: 10, text: "Күнделікті сөздерді жазуда қиналасыз ба?" },
]

const ageCategories: { value: AgeCategory; label: string }[] = [
  { value: "5-7", label: "5-7 жас" },
  { value: "8-12", label: "8-12 жас" },
  { value: "13-17", label: "13-17 жас" },
  { value: "18+", label: "18+ жас" },
]

type Answer = "yes" | "sometimes" | "no"

const answerOptions: { value: Answer; label: string; score: number }[] = [
  { value: "yes", label: "Иә", score: 2 },
  { value: "sometimes", label: "Кейде", score: 1 },
  { value: "no", label: "Жоқ", score: 0 },
]

type ResultLevel = "low" | "moderate" | "high"

interface Result {
  level: ResultLevel
  title: string
  description: string
  recommendations: string[]
  icon: typeof CheckCircle2
  color: string
}

const results: Record<ResultLevel, Result> = {
  low: {
    level: "low",
    title: "Төмен қауіп деңгейі",
    description: "Тест нәтижелері бойынша дислексияның белгілері байқалмайды. Бірақ егер алаңдаушылық болса, маманмен кеңесу ұсынылады.",
    recommendations: [
      "Оқуды үнемі жалғастырыңыз",
      "Күнделікті 15-20 минут оқыңыз",
      "Жаңа сөздерді үйреніңіз",
    ],
    icon: CheckCircle2,
    color: "text-green-500",
  },
  moderate: {
    level: "moderate",
    title: "Орташа қауіп деңгейі",
    description: "Кейбір дислексия белгілері байқалуы мүмкін. Толық диагностика үшін логопедке жүгіну ұсынылады.",
    recommendations: [
      "Логопедпен кеңесіңіз",
      "Арнайы жаттығулар жасаңыз",
      "Оқуға көп уақыт бөліңіз",
      "Аудиокітаптарды қолданыңыз",
    ],
    icon: AlertTriangle,
    color: "text-amber-500",
  },
  high: {
    level: "high",
    title: "Жоғары қауіп деңгейі",
    description: "Дислексияның айқын белгілері байқалады. Мамандандырылған көмек алу қатаң ұсынылады.",
    recommendations: [
      "Тез арада логопедке жүгініңіз",
      "Толық диагностикадан өтіңіз",
      "Жеке оқу жоспарын жасаңыз",
      "Арнайы бағдарламаларды қолданыңыз",
      "Отбасылық қолдау маңызды",
    ],
    icon: AlertCircle,
    color: "text-red-500",
  },
}

function getResult(score: number): ResultLevel {
  if (score <= 6) return "low"
  if (score <= 13) return "moderate"
  return "high"
}

export default function TestterPage() {
  const [stage, setStage] = useState<"select" | "quiz" | "result">("select")
  const [selectedAge, setSelectedAge] = useState<AgeCategory | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})

  const handleAnswer = (answer: Answer) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: answer }))
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setStage("result")
    }
  }

  const calculateScore = () => {
    return Object.entries(answers).reduce((total, [, answer]) => {
      const option = answerOptions.find((o) => o.value === answer)
      return total + (option?.score || 0)
    }, 0)
  }

  const resetQuiz = () => {
    setStage("select")
    setSelectedAge(null)
    setCurrentQuestion(0)
    setAnswers({})
  }

  const score = calculateScore()
  const resultLevel = getResult(score)
  const resultData = results[resultLevel]

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Дислексия тесті</h1>
          <p className="text-muted-foreground">
            Сөйлеу және оқу қиындықтарын анықтауға арналған тест
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {stage === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="p-6 rounded-3xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <ClipboardList className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold">Жас категориясын таңдаңыз</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {ageCategories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedAge(category.value)}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        selectedAge === category.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="font-medium">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => selectedAge && setStage("quiz")}
                disabled={!selectedAge}
                className="w-full p-4 rounded-2xl bg-primary text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Тестті бастау
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {stage === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Progress */}
              <div className="p-4 rounded-2xl bg-card border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Сұрақ {currentQuestion + 1} / {questions.length}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-3xl bg-card border border-border"
              >
                <p className="text-lg font-medium mb-6">
                  {questions[currentQuestion].text}
                </p>

                <div className="space-y-3">
                  {answerOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full p-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left font-medium"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex gap-4">
                <button
                  onClick={() => currentQuestion > 0 && setCurrentQuestion((prev) => prev - 1)}
                  disabled={currentQuestion === 0}
                  className="flex-1 p-4 rounded-2xl border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Артқа
                </button>
                <button
                  onClick={resetQuiz}
                  className="p-4 rounded-2xl border border-border hover:bg-muted transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {stage === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Result Card */}
              <div className={`p-8 rounded-3xl bg-card border-2 ${
                resultLevel === "low" ? "border-green-500/30" :
                resultLevel === "moderate" ? "border-amber-500/30" :
                "border-red-500/30"
              }`}>
                <div className="text-center">
                  <resultData.icon className={`w-16 h-16 mx-auto mb-4 ${resultData.color}`} />
                  <h2 className="text-2xl font-bold mb-2">{resultData.title}</h2>
                  <p className="text-muted-foreground mb-4">{resultData.description}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                    <span className="text-sm">Жалпы балл:</span>
                    <span className="font-bold">{score} / 20</span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-6 rounded-3xl bg-card border border-border">
                <h3 className="text-lg font-semibold mb-4">Ұсыныстар</h3>
                <ul className="space-y-3">
                  {resultData.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <button
                onClick={resetQuiz}
                className="w-full p-4 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Қайта тест тапсыру
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  )
}
