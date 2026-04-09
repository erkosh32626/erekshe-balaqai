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
    title: "Артикуляциялық гимнастика",
    description: "Тіл мен ерін бұлшықеттерін дамытуға арналған жаттығулар",
    duration: "10:25",
    category: "Гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Р дыбысын қою",
    description: "«Р» дыбысын дұрыс айтуға үйрететін жаттығулар",
    duration: "15:30",
    category: "Дыбыстар",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "Л дыбысын қою",
    description: "«Л» дыбысын дұрыс айтуға үйрететін жаттығулар",
    duration: "12:45",
    category: "Дыбыстар",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Ш, Ж дыбыстары",
    description: "Ысқырық дыбыстарын жаттықтыру",
    duration: "14:20",
    category: "Дыбыстар",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "Тыныс алу жаттығулары",
    description: "Сөйлеу үшін дұрыс тыныс алуды үйрету",
    duration: "8:15",
    category: "Гимнастика",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "6",
    title: "Саусақ ойындары",
    description: "Ұсақ моторика мен сөйлеуді дамыту",
    duration: "11:00",
    category: "Ойындар",
    thumbnail: "/api/placeholder/320/180",
    youtubeId: "dQw4w9WgXcQ",
  },
]

const categories = ["Барлығы", "Гимнастика", "Дыбыстар", "Ойындар"]

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
          <p className="text-muted-foreground">
            Сөйлеу дамуына арналған бейне сабақтар
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
