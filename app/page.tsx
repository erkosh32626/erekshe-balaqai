"use client"

import { motion } from "framer-motion"
import { MainLayout } from "@/components/main-layout"
import { 
  Stethoscope, 
  ClipboardList, 
  Presentation, 
  Gamepad2, 
  Video,
  BookOpen,
  History,
  Rocket,
  Star,
  Award,
  GraduationCap,
  Heart,
  Quote
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const features = [
  {
    href: "/diagnostika",
    icon: Stethoscope,
    title: "Диагностика",
    description: "0-7 жас аралығындағы балаларға арналған сөйлеу дамуын тексеру",
    color: "bg-primary/10 text-primary",
  },
  {
    href: "/testter",
    icon: ClipboardList,
    title: "Тесттер",
    description: "Дислексия мен артикуляцияны тексеруге арналған интерактивті тесттер",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    href: "/prezentatsiyalar",
    icon: Presentation,
    title: "Презентациялар",
    description: "Ата-аналарға арналған білім беру материалдары",
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    href: "/oiyndar",
    icon: Gamepad2,
    title: "Ойындар",
    description: "Р, Л, Ш дыбыстарын жаттықтыруға арналған қызықты ойындар",
    color: "bg-primary/10 text-primary",
  },
  {
    href: "/video",
    icon: Video,
    title: "Видео жаттығулар",
    description: "Артикуляциялық гимнастика мен сөйлеу жаттығулары",
    color: "bg-secondary text-secondary-foreground",
  },
]

const additionalContent = [
  {
    icon: History,
    title: "Логопедияның тарихы",
    description: "Ежелгі дәуірден бүгінге дейін",
  },
  {
    icon: Rocket,
    title: "Болашағы",
    description: "AI, VR және жаңа технологиялар",
  },
  {
    icon: Star,
    title: "Табыс тарихтары",
    description: "Шабыт беретін оқиғалар",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function HomePage() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Қазақ тіліндегі логопедиялық платформа</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance text-foreground">
            Балаңыздың сөйлеу дамуын{" "}
            <span className="text-primary">бірге қолдаймыз</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Интерактивті ойындар, диагностика құралдары және ата-аналарға арналған 
            пайдалы кеңестер арқылы балаңыздың сөйлеу қабілетін дамытыңыз.
          </p>
        </motion.section>

        {/* Feature Cards */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature) => (
            <motion.div key={feature.href} variants={itemVariants}>
              <Link href={feature.href}>
                <div className="group p-6 rounded-3xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.section>

        {/* About Specialist Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Біздің маман</h2>
          <div className="p-8 rounded-3xl bg-card border border-border">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                    <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                      <GraduationCap className="w-20 h-20 text-primary" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Шәрі Әлия Болатбекқызы</h3>
                <p className="text-primary font-medium mb-4">Логопед</p>
                
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">4+ жыл тәжірибе</span>
                  <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm">10+ бала</span>
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm">М. Мәметова атындағы колледж</span>
                </div>

                <p className="text-muted-foreground mb-4">
                  Шәрі Әлия Болатбекқызы М. Мәметова атындағы Қызылорда педагогикалық жоғары колледжінің түлегі. 
                  Логопед мамандығы әр балалардың сөйлеу дамуына көмектесуге дайын.
                  Диагностика жүргізу, жеке бағдарламалар құру және отбасылармен жұмыс істеу менің негізгі қызметтерімнің бірі.
                </p>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2 justify-center lg:justify-start">
                    <Heart className="w-4 h-4 text-red-500" />
                    Мамандану: Артикуляциялық бұзылыстар, сөйлеу дамуының кешігуі
                  </p>
                  <p className="flex items-center gap-2 justify-center lg:justify-start">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Жетістіктері: Кәсіби конференцияларға қатысу, мақалалар жариялау
                  </p>
                </div>

                {/* Quote */}
                <div className="mt-6 p-4 rounded-2xl bg-muted/50 relative">
                  <Quote className="w-8 h-8 text-primary/20 absolute top-2 left-2" />
                  <p className="text-foreground italic pl-8">
                    &quot;Әр баланың өз қарқыны мен ерекшелігі бар. Менің міндетім - сол ерекшелікті ескере отырып, оның еркін қарым-қатынас жасауына көмектесу. Біз кәсіби көмек пен ата-ана махаббатын ұштастыра отырып, балаңыздың сөйлеу әлемін бірге қалыптастырамыз.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Additional Content Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Қосымша ақпарат</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalContent.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-3xl bg-gradient-to-br from-card to-muted/50 border border-border"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Info Cards */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="p-8 rounded-3xl bg-primary text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">Логопедияның тарихы</h3>
            <p className="mb-4 opacity-90">
              Логопедия - бұл жаңа ғылым емес, ол адамзатпен бірге дамып келе жатқан өнер. 
              Ежелгі грек шешені Демосфен аузына тас салып сөйлеу арқылы тұтығудан құтылып, 
              әлемдегі ең ұлы шешендердің біріне айналды.
            </p>
            <p className="text-sm opacity-75">
              XVII-XIX ғасырларда сурдопедагогика негізінде логопедия жеке ғылым болып бөлініп шықты.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-accent/20 border border-accent/30">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Болашақ технологиялары</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-foreground">AI</span>
                </div>
                <p className="text-sm text-foreground">Жасанды интеллект баланың дыбыс айту қателіктерін талдайды</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-foreground">VR</span>
                </div>
                <p className="text-sm text-foreground">Виртуалды шындық арқылы ойын ретінде емдеу</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-foreground">TM</span>
                </div>
                <p className="text-sm text-foreground">Телемедицина арқылы кез келген жерден кеңес алу</p>
              </li>
            </ul>
          </div>
        </motion.section>
      </div>
    </MainLayout>
  )
}
