"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MainLayout } from "@/components/main-layout"
import { 
  Baby, 
  MessageCircle, 
  Music, 
  Gamepad2, 
  Video as VideoIcon,
  ChevronDown,
  Check,
  Play,
  X
} from "lucide-react"

type AgeGroup = "0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "5-7"

interface DiagnosticsData {
  age: AgeGroup
  norm: string
  sounds: string
  tasks: string[]
  videos: { title: string; url: string }[]
  tips: string[]
}

const diagnosticsData: DiagnosticsData[] = [
  {
    age: "0-1",
    norm: "Есіміне қарайды, қарапайым \"Бер\", \"На\" түсінеді",
    sounds: "А, О, У, Э, П, Б, М",
    tasks: ["Саусақ ойындары", "Жануар дыбысына еліктеу", "Қарапайым әндер айту"],
    videos: [
      { title: "Саусақ ойындары (0-1 жас)", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    tips: [
      "Баламен көп сөйлесіңіз",
      "Қарапайым дыбыстарды қайталаңыз",
      "Күнделікті тәртіпті сақтаңыз",
    ],
  },
  {
    age: "1-2",
    norm: "2 сөзді сөйлем құрайды",
    sounds: "И, Ы, Т, Д, Н, К, Г",
    tasks: ["Заттарды атау", "Сурет кітаптары қарау", "Қарапайым сұрақтарға жауап беру"],
    videos: [
      { title: "Сөздік қорды дамыту (1-2 жас)", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    tips: [
      "Заттарды атап көрсетіңіз",
      "Кітап оқыңыз",
      "Түстер мен пішіндерді үйретіңіз",
    ],
  },
  {
    age: "2-3",
    norm: "3-4 сөзді сөйлем, сұрақ қояды",
    sounds: "В, Ф, Х, Й",
    tasks: ["Моншақ тізу", "Пластилинмен ойнау", "Крупамен ойнау"],
    videos: [
      { title: "Ұсақ моторика дамыту (2-3 жас)", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    tips: [
      "Саусақтарын дамытыңыз",
      "Ертегі айтыңыз",
      "Сұрақтарына жауап беріңіз",
    ],
  },
  {
    age: "3-4",
    norm: "Өз есімін, жасын, жынысын айтады",
    sounds: "С, З, Ц",
    tasks: ["Артикуляциялық гимнастика", "Тіл жаттығулары", "Дыбыстарды қайталау"],
    videos: [
      { title: "Артикуляциялық гимнастика (3-4 жас)", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    tips: [
      "Күнде гимнастика жасаңыз",
      "Айна алдында жаттығыңыз",
      "Ойын арқылы үйретіңіз",
    ],
  },
  {
    age: "4-5",
    norm: "Оқиғаны ретімен айтады",
    sounds: "Ш, Ж, Ч, Щ",
    tasks: ["Сабын көпіршігі үрлеу", "Қағаз қайық жүзгізу", "Тыныс алу жаттығулары"],
    videos: [
      { title: "Тыныс алу жаттығулары (4-5 жас)", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    tips: [
      "Ертегі айтқызыңыз",
      "Суреттер бойынша әңгіме құрастырыңыз",
      "Тыныс алуды дамытыңыз",
    ],
  },
  {
    age: "5-7",
    norm: "Дыбыстарды таза айтады, мектепке дайын",
    sounds: "Л, Р",
    tasks: ["\"Сөз ойла\" ойыны", "Керісінше айту", "Жазуға дайындық"],
    videos: [
      { title: "Р және Л дыбыстары (5-7 жас)", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    tips: [
      "Мектепке дайындаңыз",
      "Күрделі сөздерді үйретіңіз",
      "Оқуға қызығушылық ояту",
    ],
  },
]

const ageLabels: Record<AgeGroup, string> = {
  "0-1": "0-1 жас",
  "1-2": "1-2 жас",
  "2-3": "2-3 жас",
  "3-4": "3-4 жас",
  "4-5": "4-5 жас",
  "5-7": "5-7 жас",
}

export default function DiagnostikaPage() {
  const [selectedAge, setSelectedAge] = useState<AgeGroup | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [videoModal, setVideoModal] = useState<{ title: string; url: string } | null>(null)

  const selectedData = diagnosticsData.find((d) => d.age === selectedAge)

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Сөйлеу дамуының диагностикасы
          </h1>
          <p className="text-muted-foreground">
            Баланың жасын таңдап, сөйлеу дамуының нормалары мен ұсыныстарын қараңыз
          </p>
        </motion.div>

        {/* Age Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-4 rounded-2xl bg-card border border-border flex items-center justify-between hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Baby className="w-5 h-5 text-primary" />
                <span className="font-medium">
                  {selectedAge ? ageLabels[selectedAge] : "Баланың жасын таңдаңыз"}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-card border border-border shadow-xl z-20"
                >
                  {Object.entries(ageLabels).map(([age, label]) => (
                    <button
                      key={age}
                      onClick={() => {
                        setSelectedAge(age as AgeGroup)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full p-3 rounded-xl text-left flex items-center justify-between hover:bg-muted transition-colors ${
                        selectedAge === age ? "bg-primary/10 text-primary" : ""
                      }`}
                    >
                      <span>{label}</span>
                      {selectedAge === age && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {selectedData && (
            <motion.div
              key={selectedAge}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Norm Card */}
              <div className="p-6 rounded-3xl bg-primary text-primary-foreground">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-6 h-6" />
                  <h2 className="text-xl font-semibold">Сөйлеу дамуының нормасы</h2>
                </div>
                <p className="text-lg opacity-90">{selectedData.norm}</p>
              </div>

              {/* Sounds Card */}
              <div className="p-6 rounded-3xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Music className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold">Қалыптасатын дыбыстар</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedData.sounds.split(", ").map((sound) => (
                    <span
                      key={sound}
                      className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-bold text-lg"
                    >
                      {sound}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tasks Card */}
              <div className="p-6 rounded-3xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Gamepad2 className="w-6 h-6 text-accent" />
                  <h2 className="text-xl font-semibold">Ұсынылатын тапсырмалар</h2>
                </div>
                <ul className="space-y-3">
                  {selectedData.tasks.map((task, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-accent-foreground">{index + 1}</span>
                      </div>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Videos Card */}
              <div className="p-6 rounded-3xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <VideoIcon className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold">Видео жаттығулар</h2>
                </div>
                <div className="space-y-3">
                  {selectedData.videos.map((video, index) => (
                    <button
                      key={index}
                      onClick={() => setVideoModal(video)}
                      className="w-full p-4 rounded-2xl bg-muted hover:bg-primary/10 transition-colors flex items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <Play className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="font-medium">{video.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tips Card */}
              <div className="p-6 rounded-3xl bg-accent/10 border border-accent/20">
                <h2 className="text-xl font-semibold mb-4">Ата-анаға кеңестер</h2>
                <ul className="space-y-2">
                  {selectedData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Modal */}
        <AnimatePresence>
          {videoModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setVideoModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-3xl overflow-hidden max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold">{videoModal.title}</h3>
                  <button
                    onClick={() => setVideoModal(null)}
                    className="p-2 rounded-xl hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="aspect-video">
                  <iframe
                    src={videoModal.url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  )
}
