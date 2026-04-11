"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

export type Theme = "dark" | "light"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

const STORAGE_KEY = "nerve-theme"

function readInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark") return stored
  } catch {
    // ignore
  }
  return "dark"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Lazy initializer — runs once per mount; safe because component is "use client"
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)

  // Sync to <html> class whenever theme changes
  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
      root.classList.remove("light")
    } else {
      root.classList.remove("dark")
      root.classList.add("light")
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === "dark" ? "light" : "dark")),
    []
  )

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
