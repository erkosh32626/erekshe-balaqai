'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, ArrowRight } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-primary/20 shadow-xl rounded-3xl overflow-hidden text-center">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-primary-foreground" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Тіркелу сәтті болды!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="bg-secondary/20 p-4 rounded-2xl">
              <Mail className="w-8 h-8 text-secondary mx-auto mb-3" />
              <p className="text-foreground">
                Email-ге растау хаты жіберілді. Тіркелуді аяқтау үшін хатты тексеріңіз.
              </p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full h-12 rounded-xl">
                <Link href="/auth/login" className="flex items-center gap-2">
                  Кіру бетіне өту
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-12 rounded-xl">
                <Link href="/">
                  Басты бетке оралу
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
