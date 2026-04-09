'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push('/profil')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Қате орын алды')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-primary/20 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 text-center pb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-foreground">Erekshe Balaqai</CardTitle>
            <CardDescription className="text-muted-foreground">
              Аккаунтыңызға кіріңіз
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-xl h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Құпия сөз</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 rounded-xl h-12"
                  />
                </div>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-destructive bg-destructive/10 p-3 rounded-xl"
                >
                  {error}
                </motion.p>
              )}
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.span>
                    Кіру...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-5 h-5" />
                    Кіру
                  </span>
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Аккаунтыңыз жоқ па?{' '}
                <Link
                  href="/auth/sign-up"
                  className="text-primary hover:underline font-medium"
                >
                  Тіркелу
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
