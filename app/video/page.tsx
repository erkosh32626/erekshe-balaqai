"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MainLayout } from "@/components/main-layout"
import { Play, X, Clock, Tag } from "lucide-react"

interface Video {
  id: string
  title: string
  description: string
  duration: string
  category: string
  thumbnail: string
  youtubeId: string
}

const videos: Video[] = [
  {
    id: "1",
    title: "Тіс тазалау жаттығуы",
    description: "Бұл жаттығу тілдің икемділігін дамытып, дыбыстарды анық айтуға көмектеседі",
    duration: "00:11",
    category: "Артикуляциялық гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "w-DynQ_j474",
  },
  {
    id: "2",
    title: "Тәтті тосап жаттығуы",
    description: "Тідің көтерілуін жақсарту,л, р дыбыстарын дұрыс айтуға көмектеседі",
    duration: "01:01",
    category: "Артикуляциялық гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "8Wd2sHKn2Yg",
  },
  {
    id: "3",
    title: "Тоқылдақ жаттығуы",
    description: "Бұл жаттығу тілдің ұшын күшейтіп, р дыбысын дұрыс айтуға көмектеседі.",
    duration: "00:25",
    category: "Артикуляциялық гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "VzcGoBAcd1w",
  },
  {
    id: "4",
    title: "Бақа жаттығуы",
    description: "Бұл жаттығу ерін бұлшықеттерін күшейтіп, дыбыстарды анық айтуға көмектеседі.",
    duration: "00:23",
    category: "Артикуляциялық гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "tX-Fk2yPJPM",
  },
  {
    id: "5",
    title: "Футбол жаттығуы",
    description: "Тілдің қозғалысын дамытып, сөйлеу анықтығын жақсартады.",
    duration: "00:29",
    category: "Артикуляциялық гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "cSMh1ayQxnE",
  },
  {
    id: "6",
    title: "Піл жаттығуы",
    description: "Ерін бұлшықеттерін дамытып, у, о, ө дыбыстарын дұрыс айтуға көмектеседі.",
    duration: "00:20",
    category: "Артикуляциялық гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "TeswiiWQhsU",
  },
  {
    id: "7",
    title: "Ат шауып келеді жаттығуы",
    description:  "Тілдің ұшын күшейтіп, р дыбысын дұрыс айтуға көмектеседі.",
    duration: "00:30",
    category: "Артикуляциялық гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "gHCLz_cwpXw",
  },
  {
    id: "8",
    title: "Кесе жаттығуы",
    description: "Тілдің бұлшықеттерін дамытып, дыбыстарды анық айтуға көмектеседі.",
    duration: "00:26",
    category: "Артикуляциялық гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "l7EOq8fY8-c",
  },
  {
    id: "9",
    title: "Сылақшы жаттығуы",
    description: "Тілдің жалпақтығын және икемділігін дамытып, дыбыстарды анық айтуға көмектеседі.",
    duration: "00:36",
    category: "Артикуляциялық гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "NTPkjL0ZZVs",
  },
  {
    id: "10",
    title: "Саңырауқұлақ жаттығуы",
    description: "Тілдің жоғарғы көтерілімін күшейтіп, дыбыстарды дұрыс айтуға көмектеседі.",
    duration: "00:24",
    category: "Артикуляциялық гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "WRskWajUUWg",
  },
  {
    id: "11",
    title: "Моторшы жаттығуы",
    description: "Тіл ұшын белсенді етіп, р дыбысын дұрыс айтуға көмектеседі.",
    duration: "00:21",
    category: "Артикуляциялық гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "hPR49QH6pGs",
  },
  {
    id: "12",
    title: "Р дыбысын қою",
    description: "Р дыбысының дұрыс айтылуына арналған артикуляциялық жаттығу.",
    duration: "02:40",
    category: "Дыбыстар",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "xF-xyWBmDtY",
  },
  {
    id: "13",
    title: "Л дыбысын қою",
    description: "Л дыбысын нақты және анық айтуды үйрететін серия.",
    duration: "03:17",
    category: "Дыбыстар",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "fdp5_giQgJQ",
  },
  {
    id: "14",
    title: "Ш дыбысын қою",
    description: "Ш дыбысын қарқындылықпен және дұрыс артикуляциямен айту жаттығулары.",
    duration: "07:36",
    category: "Дыбыстар",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "tymCiRJBKws",
  },
  {
    id: "15",
    title: "С-З дыбыстарын қою",
    description: "С-З дыбыстарын таза және анық айту үшін арнайы жаттығулар.",
    duration: "06:52",
    category: "Дыбыстар",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "ubf4XWUKhDU",
  },
  {
    id: "16",
    title: "Қ-Ғ дыбыстарын қою",
    description: "Қ-Ғ дыбыстарын жаттықтыру арқылы сөйлеуді жетілдіру.",
    duration: "04:15",
    category: "Дыбыстар",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "tAblPhJNXos",
  },
  {
    id: "17",
    title: "К-Г дыбыстарын қою",
    description: "К-Г дыбыстарын таза және анық айту үшін арнайы жаттығулар.",
    duration: "09:07",
    category: "Дыбыстар",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "CGWL-7bsA6g",
  },
  {
    id: "18",
    title: "Т-Д дыбыстарын қою",
    description: "Т-Д дыбыстарына артикуляция және дыбысты айқындау жаттығулары.",
    duration: "05:00",
    category: "Дыбыстар",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "gYKSUrNdbOA",
  },
  {
    id: "19",
    title: "Н-Ң дыбыстарын қою",
    description: "Н-Ң дыбыстары мен мұрындық дыбыстарды дұрыс айтуға арналған жаттығулары.",
    duration: "06:32",
    category: "Дыбыстар",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "zifwOkE6Fos",
  },
]

const categories = ["Барлығы", "Артикуляциялық гимнастика", "Дыбыстар"]

export default function VideoPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [activeCategory, setActiveCategory] = useState("Барлығы")

  const filteredVideos = activeCategory === "Барлығы" 
    ? videos 
    : videos.filter((v) => v.category === activeCategory)

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Видео жаттығулар</h1>
          <p className="text-muted-foreground mb-2">
            Артикуляциялық гимнастика мен дыбыстарға арналған 19 бейне сабақ.
          </p>
          <p className="text-sm text-muted-foreground">
            Тілді, ерінді және дыбыстарды жаттықтыруға арналған тренингтер мен бағытталған сабақтар.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Video Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredVideos.map((video, index) => (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedVideo(video)}
              className="group text-left rounded-3xl bg-card border border-border overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-muted">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 text-white text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-3 h-3 text-primary" />
                  <span className="text-xs text-primary font-medium">{video.category}</span>
                </div>
                <h3 className="font-semibold mb-1 line-clamp-1">{video.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-3xl overflow-hidden max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{selectedVideo.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedVideo.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="p-2 rounded-xl hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
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
