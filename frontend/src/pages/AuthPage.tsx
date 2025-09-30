import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Navigate } from 'react-router'
import { useAuth } from "@/contexts/AuthContext";

export default function AuthPage() {
  //current session and supabase client from context
  const { session, supabase } = useAuth();

  //when there is a current session, navigate to homepage
  if (session) {
    return (<Navigate to="/"/>)
  }

  // otherwise, user sees auth componenet where they can signin or out
  return (
    //supabase auth component
    <div className="min-h-screen flex items-center justify-center pb-50 bg-zinc-300 dark:bg-zinc-900 text-zinc-50">
        <div className="w-xl p-8 bg-zinc-800 rounded-2xl shadow-lg mb-20">
            <Auth
                supabaseClient={supabase}
                providers={[]}
                appearance={{
                    theme: ThemeSupa,
                    style: {
                        anchor: {color:"white"}
                    },
                    variables: {
                    default: {
                        colors: {
                        brand: '#52525B',          
                        brandAccent: '#6B7280',
                        inputBackground: '#27272a',
                        inputBorder: '#52525b',
                        messageText: '#f4f4f5',
                        inputLabelText: '#ffffff'
                        }
                    },
                    },
                }}
                localization={{
                    variables: {
                        sign_up: {
                            button_label: 'Create Account',
                            email_label: 'Enter Your Email',
                            password_input_placeholder: 'Your password'
                        },
                        sign_in: {
                            email_label: 'Email',
                            password_label: 'Password',
                            email_input_placeholder: "Enter email address",
                            password_input_placeholder: "Enter Password"
                        }
                    }
                }}
                theme='dark'
            />
        </div>

    </div>
  )
}