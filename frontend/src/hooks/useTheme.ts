import { useEffect, useState } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">
  //set default theme (set to light or dark if theme is available in localstorage, if not, set to light)
  (
    (localStorage.getItem("theme") as "light" | "dark") || "dark"
  )

  //when theme state changes, remove light and dark for <html> (documentElement) so there is no dupicates
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  //flips theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return { theme, toggleTheme }
}