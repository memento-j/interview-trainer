import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className={theme === "dark" ? "hover:cursor-pointer" : "bg-zinc-100 border-zinc-300 hover:cursor-pointer"}>
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px]"/>
      ) : (
        <Moon className="h-[18px] w-[18px]"/>
      )}
    </Button>
  )
}