"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MainLayout } from "@/components/main-layout"
import { 
  ChevronLeft, 
  ChevronRight, 
  Circle,
  AlertTriangle,
  Drumstick,
  Apple,
  Candy,
  Lightbulb
} from "lucide-react"

interface Slide {
  id: number
  title: string
  subtitle?: string
  content: string[]
  tips?: string[]
  icon: typeof AlertTriangle
  bgColor: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "«Блендер дәуірі» және оның зияны",
    subtitle: "Логопедиялық диета: Балаңыз сөйлеуі үшін не жеуі керек?",
    content: [
      "Біз баламызға ең жұмсақ, езілген тағамдарды беріп, оған жақсылық жасап жатырмыз деп ойлаймыз. Бірақ бұл «қамқорлық» тілдің шығуына кедергі болуы мүмкін.",
      "Сөйлеу — бұл күрделі бұлшықет жұмысы. Дыбыстарды анық айту үшін артикуляциялық аппарат (ерін, тіл, жұмсақ таңдай және төменгі жақ) үйлесімді қозғалуы керек.",
      "Дайын пюре мен жұмсақ ботқаны жұту үшін күш салудың қажеті жоқ, ал күш түспеген жерде даму тоқтайды. Бұл гипотонусқа (бұлшықет әлсіздігіне) әкеледі.",
    ],
    icon: AlertTriangle,
    bgColor: "from-red-500/20 to-orange-500/20",
  },
  {
    id: 2,
    title: "Талшықты тағамдар",
    subtitle: "Тілдің артқы бұлшықеттері үшін",
    content: [
      "Не беру керек: Піскен сиыр еті, тауықтың төс еті, кептірілген өрік (курага), грек жаңғағы.",
      "Пайдасы: Шайнауды қажет ететін тығыз тағамдар тілдің түбіндегі бұлшықеттерді қатайтады.",
    ],
    tips: [
      "Етті ұсақ бөліктерге кесіңіз",
      "Баланы шайнауға үйретіңіз",
      "Тамақты асықпай жеңіз",
    ],
    icon: Drumstick,
    bgColor: "from-amber-500/20 to-yellow-500/20",
  },
  {
    id: 3,
    title: "Қатты тағамдар",
    subtitle: "Төменгі жақ сүйегі үшін",
    content: [
      "Не беру керек: Сәбіз, алма, кептірілген нан (сухари), алмұрт, қатты печенье.",
      "Маңызды: Бұларды бөліктерге бөлмей, бүтіндей тістеп жеу керек. Бұл төменгі жақтың белсенді жұмысын талап етеді.",
    ],
    tips: [
      "Алманы бүтіндей беріңіз",
      "Сәбізді тістетіңіз",
      "Қатты печеньені қолданыңыз",
    ],
    icon: Apple,
    bgColor: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    title: "Созылмалы тағамдар",
    subtitle: "Тілдің икемділігі үшін",
    content: [
      "Не беру керек: Құрт, ірімшік немесе табиғи мармелад.",
      "Пайдасы: Тіске жабысқан тағамды бала тілімен тазартуға тырысқанда, тілдің қозғалыс ауқымы артады.",
      "Бұл — болашақта «Р» және «Л» дыбыстарын дұрыс айтуға таптырмас дайындық.",
    ],
    tips: [
      "Құртты ұсыныңыз",
      "Табиғи мармелад беріңіз",
      "Тіл жаттығуларын жасаңыз",
    ],
    icon: Candy,
    bgColor: "from-pink-500/20 to-purple-500/20",
  },
  {
    id: 5,
    title: "Алтын ережелер",
    subtitle: "Қорытынды және ұсыныстар",
    content: [
      "Блендерді ұмытыңыз: Бала 1,5–2 жасқа келгенде блендерді қолдануды толық тоқтатыңыз.",
      "Тамақпен «ойнауға» рұқсат беріңіз: Ерніне тосап (варенье) жағып жалату, суды түтікшемен (трубочка) үрлеу немесе стақан жиегінен ұрттап ішу — мұның бәрі анық сөйлеудің кепілі.",
    ],
    tips: [
      "Дұрыс шайнау — бұл сөйлеудің алғашқы баспалдағы!",
      "Тамақ уақытын ойынға айналдырыңыз",
      "Баламен бірге тамақтаныңыз",
    ],
    icon: Lightbulb,
    bgColor: "from-blue-500/20 to-cyan-500/20",
  },
]

export default function PrezentatsiyalarPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const slide = slides[currentSlide]

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Презентациялар</h1>
          <p className="text-muted-foreground">
            Балаңыздың сөйлеу дамуын қолдайтын пайдалы ақпарат
          </p>
        </motion.div>

        {/* Slide Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className={`p-8 rounded-3xl bg-gradient-to-br ${slide.bgColor} border border-border min-h-[500px]`}
            >
              {/* Slide Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center flex-shrink-0">
                  <slide.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  {slide.subtitle && (
                    <p className="text-sm text-muted-foreground mb-1">{slide.subtitle}</p>
                  )}
                  <h2 className="text-2xl font-bold">{slide.title}</h2>
                </div>
              </div>

              {/* Slide Content */}
              <div className="space-y-4 mb-6">
                {slide.content.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-foreground/90 leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Tips */}
              {slide.tips && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-2xl bg-card/80 backdrop-blur"
                >
                  <h3 className="font-semibold mb-3">Кеңестер:</h3>
                  <ul className="space-y-2">
                    {slide.tips.map((tip, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="p-1"
            >
              <Circle
                className={`w-3 h-3 transition-colors ${
                  index === currentSlide
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4">
          <span className="text-sm text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Warning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 rounded-3xl bg-destructive/10 border border-destructive/20"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Ата-ана назарына: Қауіпті белгілер
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
              <span>Тамақты шайнамай, сумен бірге бірден жұтып жіберсе</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
              <span>Тамақты тек аузының бір жағымен ғана шайнаса</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
              <span>Қатты тамақтан бас тартып, тек езілген асты талап етсе</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </MainLayout>
  )
}
