import { createContext, useContext, useEffect, useState } from "react"
import { createClient, SupabaseClient, type User, type Session } from "@supabase/supabase-js"
import axios from "axios"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

type Profile = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

type AuthContextType = {
  user: User | null
  session: Session | null
  supabase: SupabaseClient
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null);

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

  useEffect(() => {
    if (!user) return; // Stop if no user
  
    async function fetchProfile() {
      try {
        const response = await axios.get(`http://localhost:8080/profiles/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        setProfile(response.data ?? null);
      } catch (err) {
        console.error(err);
        setProfile(null);
      }
    }
  
    fetchProfile()
  }, [user])
  

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, supabase, loading, signOut }}>
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