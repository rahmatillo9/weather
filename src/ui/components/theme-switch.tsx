"use client"

import { type FC, useEffect, useState } from "react"
import { useTheme } from "../context/theme-context"
import { MoonIcon, SunIcon, ComputerIcon} from "./icons"


interface ThemeSwitchProps {
  className?: string
  type?: "fixed" | "chip"
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ type = "fixed", className = "" }) => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }

  if (type === "fixed") {
    return (
      <div className={`fixed bottom-5 right-5 z-50 ${className}`}>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-[#0d6efd] text-white hover:bg-[#0b5ed7] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d6efd] shadow-lg hover:shadow-xl"
          aria-label="Toggle theme"
        >
          {resolvedTheme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </button>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-1 p-1 rounded-xl bg-[#212529]/10 dark:bg-[#f8f9fa]/10 ${className}`}>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-lg transition-all duration-300 ${
          theme === "dark"
            ? "bg-[#0d6efd] text-white shadow-md"
            : "bg-transparent text-[#212529] dark:text-[#f8f9fa] hover:bg-[#0d6efd]/10"
        }`}
        aria-label="Dark mode"
      >
        <MoonIcon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-lg transition-all duration-300 ${
          theme === "light"
            ? "bg-[#0d6efd] text-white shadow-md"
            : "bg-transparent text-[#212529] dark:text-[#f8f9fa] hover:bg-[#0d6efd]/10"
        }`}
        aria-label="Light mode"
      >
        <SunIcon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-lg transition-all duration-300 ${
          theme === "system"
            ? "bg-[#0d6efd] text-white shadow-md"
            : "bg-transparent text-[#212529] dark:text-[#f8f9fa] hover:bg-[#0d6efd]/10"
        }`}
        aria-label="System mode"
      >
        <ComputerIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

export default ThemeSwitch
