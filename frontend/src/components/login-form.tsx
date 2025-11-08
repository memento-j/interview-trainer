import { cn } from '@/lib/utils'
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
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { CheckCircle2, MessageSquare } from 'lucide-react'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { supabase } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      // Update this route to redirect to an authenticated route. The user already has an active session.
      location.href = '/dashboard'
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center">
            <div className="font-[500] text-3xl sm:text-4xl pb-2 pt-5 bg-gradient-to-b from-teal-500 to-teal-400 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent">
              <div className="flex gap-3">
                  <div className="relative inline-flex items-center justify-center mt-1">
                      <MessageSquare className="w-8 h-8 text-teal-400 dark:text-teal-500" />
                      <CheckCircle2 className="w-4 h-4 text-teal-500 dark:text-teal-600 absolute bottom-0 right-0 bg-white dark:bg-zinc-900 rounded-full" />
                  </div>
                  <p>PractiMate</p>
              </div>
            </div>
          </CardTitle>
          <CardDescription className='text-center text-md mb-4 mt-1'>Enter your email and password below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6 md:mx-12">
              <div className="grid gap-2">
                <Label htmlFor="email" className='text-lg'>Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='focus-visible:ring-teal-300 dark:focus-visible:ring-teal-500'
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className='text-lg'>Password</Label>
                  <a
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='focus-visible:ring-teal-300 dark:focus-visible:ring-teal-500'
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full mt-5 hover:cursor-pointer bg-gradient-to-br from-teal-300 to-teal-200 dark:from-teal-600 dark:to-teal-400 hover:scale-103 transition-transform duration-250 text-black dark:text-white text-lg" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
            <div className="mt-5 text-center text-md pb-5">
              Don&apos;t have an account?{' '}
              <a href="/auth/signup" className="underline underline-offset-4 text-teal-600 font-semibold  dark:text-teal-400">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
