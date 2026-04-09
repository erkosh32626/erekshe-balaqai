'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-destructive/20 shadow-xl rounded-3xl overflow-hidden text-center">
          <CardHeader className="bg-destructive/10 pb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 bg-destructive rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <AlertTriangle className="w-12 h-12 text-destructive-foreground" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Қате орын алды
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <p className="text-muted-foreground">
              Аутентификация кезінде қате орын алды. Қайталап көріңіз немесе қолдау қызметіне хабарласыңыз.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full h-12 rounded-xl">
                <Link href="/auth/login" className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Қайталап көру
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-12 rounded-xl">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
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
