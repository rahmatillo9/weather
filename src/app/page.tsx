"use client"

import { WeatherProvider } from "@/ui/context/weather-context"
import { ThemeProvider } from "@/ui/context/theme-context"
import WeatherWidget from "@/ui/components/weather-widget"
import ThemeSwitch from "@/ui/components/theme-switch"

export default function Home() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#212529] transition-colors duration-300">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-[#212529] dark:text-[#f8f9fa]">
              Weather Forecast
            </h1>
            <WeatherWidget />
          </div>
          <ThemeSwitch type="fixed" />
        </div>
      </WeatherProvider>
    </ThemeProvider>
  )
}
