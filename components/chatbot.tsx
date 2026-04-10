"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  text: string
  isBot: boolean
}

const FAQ_DATA = [
  {
    keywords: ["сәлем", "салем", "привет", "hello", "қайырлы"],
    answer: "Сәлеметсіз бе! Мен Dem чат-ботымын. Сізге логопедия саласында көмектесуге дайынмын. Қандай сұрағыңыз бар?"
  },
  {
    keywords: ["логопед", "кім", "не істейді", "маман"],
    answer: "Логопед - бұл сөйлеу тілінің бұзылыстарын диагностикалайтын және түзететін маман. Логопед балалардың дұрыс сөйлеуіне, дыбыстарды дұрыс айтуына, оқу мен жазуға көмектеседі."
  },
  {
    keywords: ["қашан", "жүгіну", "бару", "логопедке"],
    answer: "Логопедке мынадай жағдайларда жүгіну керек:\n- 2 жаста бала сөйлемесе\n- 3 жаста сөйлемдер құрмаса\n- 4-5 жаста дыбыстарды дұрыс айтпаса\n- Сөздерді қате айтса немесе кекештенсе\n- Оқу мен жазуда қиындықтар болса"
  },
  {
    keywords: ["р", "дыбыс", "айтпайды", "рр"],
    answer: "\"Р\" дыбысы - ең қиын дыбыстардың бірі. Бұл дыбыс 5-6 жасқа дейін қалыптасады. Егер 6 жастан кейін де \"Р\" айтылмаса, логопедке жүгіну керек. Біздің платформада \"Р\" дыбысына арналған арнайы ойындар мен жаттығулар бар."
  },
  {
    keywords: ["л", "дыбыс", "лл"],
    answer: "\"Л\" дыбысы 4-5 жас аралығында қалыптасады. Егер бала \"Л\" орнына \"В\" немесе \"У\" айтса, бұл қалыпты даму болуы мүмкін. 5 жастан кейін де мәселе болса, жаттығулар қажет. Біздің \"Ұшақпен ұш\" ойынымызды қолданыңыз!"
  },
  {
    keywords: ["ш", "с", "дыбыс", "шш"],
    answer: "\"Ш\" және \"С\" дыбыстары ысқырық дыбыстар. 4 жасқа дейін балалар оларды шатастыруы мүмкін. \"Ш\" дыбысын жаттықтыру үшін біздің \"Көпіршіктерді жар\" ойынын қолданыңыз!"
  },
  {
    keywords: ["дислексия", "оқу", "қиын", "әріп"],
    answer: "Дислексия - бұл оқу мен жазу қабілетінің бұзылуы. Белгілері:\n- Әріптерді шатастыру (б-д, п-т)\n- Баяу оқу\n- Оқығанын түсінбеу\n- Сөздерді қате жазу\n\nБіздің \"Тесттер\" бөлімінде дислексияны анықтауға арналған тест бар."
  },
  {
    keywords: ["кекештік", "кекешу", "тұтығу"],
    answer: "Кекештік - сөйлеу ырғағының бұзылуы. Көбінесе 2-5 жас аралығында пайда болады. Себептері: стресс, қорқыныш, тұқым қуалаушылық. Кекештікті емдеу үшін логопедке және психологқа жүгіну керек."
  },
  {
    keywords: ["жаттығу", "үйде", "не істеу", "көмек"],
    answer: "Үйде жасауға болатын жаттығулар:\n1. Артикуляциялық гимнастика (тіл жаттығулары)\n2. Дыбыстарды ойын арқылы жаттықтыру\n3. Жұмбақтар мен тақпақтар айту\n4. Ертегілерді бірге оқу\n\nБіздің \"Ойындар\" бөлімінде интерактивті жаттығулар бар!"
  },
  {
    keywords: ["тамақ", "жеу", "тіл", "даму", "тағам"],
    answer: "Сөйлеу дамуына пайдалы тағамдар:\n- Қатты тағамдар (алма, сәбіз) - шайнау бұлшықеттерін жаттықтырады\n- Балық, жаңғақ - ми дамуы үшін\n- Сүт өнімдері - кальций\n- Көкөністер мен жемістер - витаминдер\n\n\"Презентациялар\" бөлімінде толық ақпарат бар!"
  },
  {
    keywords: ["норма", "жас", "сөйлеу", "даму"],
    answer: "Сөйлеу дамуының нормалары:\n- 1 жас: 5-10 сөз\n- 2 жас: 50-100 сөз, қарапайым сөйлемдер\n- 3 жас: 250-700 сөз, толық сөйлемдер\n- 4 жас: 1500+ сөз, барлық дыбыстар (Р-дан басқа)\n- 5 жас: таза сөйлеу\n\nТолық ақпарат \"Диагностика\" бөлімінде!"
  },
  {
    keywords: ["платформа", "сайт", "не бар", "қызмет"],
    answer: "Dem платформасында:\n- Жас бойынша диагностика (0-7 жас)\n- Дислексия тесті\n- Интерактивті ойындар (Р, Л, Ш дыбыстары)\n- Ата-аналарға презентациялар\n- Видео сабақтар\n\nБарлығы тегін және қазақ тілінде!"
  },
  {
    keywords: ["тіркелу", "аккаунт", "тегін"],
    answer: "Тіркелу толығымен тегін! Тіркелгеннен кейін сіз:\n- Баланың профилін жасай аласыз\n- Жеке ұсыныстар ала аласыз\n- Прогресті бақылай аласыз\n\nЖоғарғы оң жақтағы \"Кіру / Тіркелу\" батырмасын басыңыз."
  },
  {
    keywords: ["рахмет", "сау бол", "көрісемін", "bye"],
    answer: "Сізге де рахмет! Сұрақтарыңыз болса, қашан да болса жазыңыз. Балаңыздың сөйлеу дамуына сәттілік тілеймін! 🌟"
  }
]

const DEFAULT_ANSWER = "Кешіріңіз, бұл сұраққа жауап таба алмадым. Келесі тақырыптар бойынша сұрай аласыз:\n- Логопед кім?\n- Қашан логопедке жүгіну керек?\n- Р, Л, Ш дыбыстары\n- Дислексия\n- Кекештік\n- Үйде жаттығулар\n- Сөйлеу дамуының нормалары\n- Платформа туралы"

function findAnswer(input: string): string {
  const lowerInput = input.toLowerCase()
  
  for (const faq of FAQ_DATA) {
    if (faq.keywords.some(keyword => lowerInput.includes(keyword))) {
      return faq.answer
    }
  }
  
  return DEFAULT_ANSWER
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Сәлеметсіз бе! Мен Dem чат-ботымын. Логопедия туралы сұрақтарыңызға жауап беремін. Не білгіңіз келеді?",
      isBot: true
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const botAnswer = findAnswer(input)
      const botMessage: Message = {
        id: messages.length + 2,
        text: botAnswer,
        isBot: true
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-3xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Erekshe Bot</h3>
                <p className="text-xs text-primary-foreground/70">Логопедия көмекшісі</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-2",
                    message.isBot ? "justify-start" : "justify-end"
                  )}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line",
                      message.isBot
                        ? "bg-muted text-foreground rounded-tl-sm"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    )}
                  >
                    {message.text}
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-secondary" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-center"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Сұрағыңызды жазыңыз..."
                  className="rounded-xl"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="rounded-xl flex-shrink-0"
                  disabled={!input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
