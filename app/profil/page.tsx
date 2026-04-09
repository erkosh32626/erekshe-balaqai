"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MainLayout } from "@/components/main-layout"
import { 
  User, 
  Baby, 
  Target, 
  Star, 
  ChevronRight,
  Gamepad2,
  ClipboardList,
  Lightbulb,
  LogOut,
  Mail,
  Calendar
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface ChildProfile {
  name: string
  age: string
  problemSounds: string[]
}

const defaultProfile: ChildProfile = {
  name: "",
  age: "3-4",
  problemSounds: [],
}

const ageOptions = ["0-1", "1-2", "2-3", "3-4", "4-5", "5-7", "7+"]
const soundOptions = ["Р", "Л", "С", "З", "Ш", "Ж", "Ч", "Щ", "Ц"]

interface Recommendation {
  title: string
  description: string
  link: string
  icon: typeof Gamepad2
}

export default function ProfilPage() {
  const [profile, setProfile] = useState<ChildProfile>(defaultProfile)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
      
      // Load saved profile from localStorage
      if (user) {
        const savedProfile = localStorage.getItem(`profile_${user.id}`)
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile))
        }
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Save profile to localStorage when it changes
  useEffect(() => {
    if (user && (profile.name || profile.problemSounds.length > 0)) {
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile))
    }
  }, [profile, user])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const toggleSound = (sound: string) => {
    setProfile((prev) => ({
      ...prev,
      problemSounds: prev.problemSounds.includes(sound)
        ? prev.problemSounds.filter((s) => s !== sound)
        : [...prev.problemSounds, sound],
    }))
  }

  const getRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = []

    // Age-based recommendations
    if (["0-1", "1-2", "2-3"].includes(profile.age)) {
      recommendations.push({
        title: "Саусақ ойындары",
        description: "Ұсақ моторика мен сөйлеуді дамытуға арналған ойындар",
        link: "/video",
        icon: Gamepad2,
      })
    }

    // Sound-based recommendations
    if (profile.problemSounds.includes("Р")) {
      recommendations.push({
        title: "«Моторды оталдыр» ойыны",
        description: "«Р» дыбысын жаттықтыруға арналған интерактивті ойын",
        link: "/oiyndar",
        icon: Gamepad2,
      })
    }

    if (profile.problemSounds.includes("Л")) {
      recommendations.push({
        title: "«Ұшақпен ұш» ойыны",
        description: "«Л» дыбысын үйренуге арналған қызықты ойын",
        link: "/oiyndar",
        icon: Gamepad2,
      })
    }

    if (profile.problemSounds.includes("Ш") || profile.problemSounds.includes("Ж")) {
      recommendations.push({
        title: "«Көпіршіктерді жар» ойыны",
        description: "«Ш» дыбысын жаттықтыруға арналған ойын",
        link: "/oiyndar",
        icon: Gamepad2,
      })
    }

    // Default recommendations
    recommendations.push({
      title: "Диагностика",
      description: "Баланың жасына сәйкес сөйлеу нормаларын тексеріңіз",
      link: "/diagnostika",
      icon: ClipboardList,
    })

    recommendations.push({
      title: "Дислексия тесті",
      description: "Оқу мен жазу қиындықтарын анықтау",
      link: "/testter",
      icon: ClipboardList,
    })

    return recommendations.slice(0, 4)
  }

  const recommendations = getRecommendations()

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">Профиль</h1>
          <p className="text-muted-foreground">
            {user ? "Баланың мәліметтерін енгізіп, жеке ұсыныстар алыңыз" : "Тіркелу үшін кіріңіз"}
          </p>
        </motion.div>

        {/* User Info Card */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="p-6 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {user.user_metadata?.full_name || "Пайдаланушы"}
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    Тіркелген: {new Date(user.created_at).toLocaleDateString("kk-KZ")}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
                title="Шығу"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl bg-card border border-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Бала туралы мәліметтер</h2>
              <p className="text-sm text-muted-foreground">
                Жеке ұсыныстар алу үшін толтырыңыз
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Баланың аты</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Мысалы: Айдана"
                className="w-full p-4 rounded-2xl bg-muted border border-border focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-foreground">
                <Baby className="w-4 h-4" />
                Жасы
              </label>
              <div className="flex flex-wrap gap-2">
                {ageOptions.map((age) => (
                  <button
                    key={age}
                    onClick={() => setProfile((prev) => ({ ...prev, age }))}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      profile.age === age
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    {age} жас
                  </button>
                ))}
              </div>
            </div>

            {/* Problem Sounds */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-foreground">
                <Target className="w-4 h-4" />
                Проблемалық дыбыстар
              </label>
              <p className="text-sm text-muted-foreground mb-3">
                Бала қиналатын дыбыстарды таңдаңыз
              </p>
              <div className="flex flex-wrap gap-2">
                {soundOptions.map((sound) => (
                  <button
                    key={sound}
                    onClick={() => toggleSound(sound)}
                    className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${
                      profile.problemSounds.includes(sound)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    {sound}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Smart Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-semibold text-foreground">Сізге арналған ұсыныстар</h2>
          </div>

          {recommendations.map((rec, index) => (
            <motion.a
              key={index}
              href={rec.link}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <rec.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{rec.title}</h3>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats */}
        {(profile.name || profile.problemSounds.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 rounded-3xl bg-primary text-primary-foreground"
          >
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6" />
              <h2 className="text-xl font-semibold">
                {profile.name ? `${profile.name} үшін` : "Сіз үшін"} жоспар
              </h2>
            </div>
            <ul className="space-y-2 text-sm opacity-90">
              <li>1. Күнделікті 10-15 минут артикуляциялық гимнастика</li>
              {profile.problemSounds.length > 0 && (
                <li>
                  2. {profile.problemSounds.join(", ")} дыбыстарына арналған ойындар
                </li>
              )}
              <li>{profile.problemSounds.length > 0 ? "3" : "2"}. Аптасына 2-3 рет видео жаттығулар</li>
              <li>{profile.problemSounds.length > 0 ? "4" : "3"}. Ертегі оқу және әңгімелесу</li>
            </ul>
          </motion.div>
        )}
      </div>
    </MainLayout>
  )
}
