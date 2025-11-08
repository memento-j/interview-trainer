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

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { supabase } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      return
    }
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      setSuccess(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Thank you for signing up!</CardTitle>
            <CardDescription>Check your email to confirm</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You've successfully signed up. Please check your email to confirm your account before
              signing in.
            </p>
          </CardContent>
        </Card>
      ) : (
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
            <CardDescription className='text-center text-md mb-3 mt-1'>Create an account below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
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
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder='Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='focus-visible:ring-teal-300 dark:focus-visible:ring-teal-500'
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="repeat-password" className='text-lg'>Repeat Password</Label>
                  </div>
                  <Input
                    id="repeat-password"
                    type="password"
                    placeholder='Enter Password Again'
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full mt-5 hover:cursor-pointer bg-gradient-to-br from-teal-300 to-teal-200 dark:from-teal-600 dark:to-teal-400 hover:scale-103 transition-transform duration-250 text-black dark:text-white text-lg" disabled={isLoading}>
                  {isLoading ? 'Creating an account...' : 'Sign up'}
                </Button>
              </div>
              <div className="mt-4 text-center text-md pb-5">
                Already have an account?{' '}
                <a href="/auth/login" className="underline underline-offset-4 text-teal-600 font-semibold  dark:text-teal-400">
                  Login
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
