import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
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
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export function UpdatePasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const { supabase } = useAuth();

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.updateUser({ password })
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
                    <CardTitle className="text-2xl text-center">Reset Your Password</CardTitle>
                    <CardDescription className='text-center text-md mb-4 mt-1'>Please enter your new password below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleForgotPassword}>
                        <div className="flex flex-col gap-6 md:mx-12">
                            <div className='w-full my-3'>
                                <Label htmlFor='password' className='text-lg mb-2'>
                                    Password
                                </Label>
                                <div className='relative'>
                                    <Input
                                    id="password"
                                    type={ isVisible ? "text" : "password" }
                                    placeholder="New password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button
                                        type='button'
                                        variant='ghost'
                                        size='icon'
                                        onClick={() => setIsVisible(prevState => !prevState)}
                                        className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                                    >
                                        {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                                        <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
                                    </Button>
                                </div>
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <Button type="submit" className="w-full my-5 hover:cursor-pointer bg-gradient-to-br from-teal-300 to-teal-200 dark:from-teal-600 dark:to-teal-400 hover:scale-103 transition-transform duration-250 text-black dark:text-white text-lg" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save new password'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}