"use client"

import type React from "react"
import { useEffect } from "react"
import { useWeatherData } from "@/ui/hooks/use-weather-data"
import { convertTemperature, getDailyAverages } from "./utils/weather-utlis"

interface ForecastListProps {
  city: string
  units: "metric" | "imperial"
}

const ForecastList: React.FC<ForecastListProps> = ({ city, units }) => {
  const { data, loading, error, fetchData } = useWeatherData()

  useEffect(() => {
    fetchData(city, units)
  }, [city, units, fetchData])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0d6efd]"></div>
        <span className="ml-2 text-[#212529] dark:text-[#f8f9fa]">loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-100 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
        <p className="text-red-700 dark:text-red-200">{error}</p>
      </div>
    )
  }

  if (!data) return null

  const dailyAverages = getDailyAverages(data.list)

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-[#212529] dark:text-[#f8f9fa] mb-4 flex items-center">
        <img src="/svg/calendar.svg" alt="calendar" />5-day forecast
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyAverages.slice(0, 5).map((day, index) => {
          const date = new Date(day.dt * 1000)
          const isToday = index === 0

          return (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${
                isToday
                  ? "bg-[#0d6efd]/10 border-2 border-[#0d6efd]"
                  : "bg-[#f8f9fa] dark:bg-[#212529] border border-[#212529]/10 dark:border-[#f8f9fa]/10"
              }`}
            >
              <div className="text-center">
                <p className="font-bold text-[#212529] dark:text-[#f8f9fa] mb-2">
                  {isToday ? "Bugun" : date.toLocaleDateString("uz-UZ", { weekday: "short" })}
                </p>
                <p className="text-sm text-[#212529]/70 dark:text-[#f8f9fa]/70 mb-3">
                  {date.toLocaleDateString("uz-UZ", { month: "short", day: "numeric" })}
                </p>

                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                  className="w-16 h-16 mx-auto mb-3"
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-center text-sm">
                    <img src="/svg/thermometer.svg" alt="the.." className="mr-1" />
                    <span className="font-semibold text-[#212529] dark:text-[#f8f9fa]">
                      {convertTemperature(day.main.temp, units).toFixed(1)}°{units === "metric" ? "C" : "F"}
                    </span>
                  </div>

                  <div className="flex items-center justify-center text-sm">
                  
                    <img src="/svg/droplets.svg" alt="droplets" className="mr-1" />
                    <span className="text-[#212529] dark:text-[#f8f9fa]">{day.main.humidity}%</span>
                  </div>

                  <p className="text-xs text-[#212529]/70 dark:text-[#f8f9fa]/70 capitalize mt-2">
                    {day.weather[0].description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastList
