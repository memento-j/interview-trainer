import { createContext, useContext, useEffect, useState } from "react"
import { createClient, SupabaseClient, type User, type Session } from "@supabase/supabase-js"
import { toast } from "sonner";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

type AuthContextType = {
  user: User | null
  session: Session | null
  supabase: SupabaseClient
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current session on first render
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      // ? = optional chaining (if session exists, return the user, if not, return undefined in a way that doesn't crash the app)
      // ?? = nullish coaleescing opperator (if null or undefinted, return null)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    //listens for changes to the auth state in real time (triggers when user logs in, signs up, signs out, or refreshes their seession)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    //cleanup subscription object (unsubscribes from the auth state listener to avoid memory leaks)
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("You have successfully signed out.");
  }

  return (
    <AuthContext.Provider value={{ user, session, supabase, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}