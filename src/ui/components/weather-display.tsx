"use client"

import type React from "react"
import { useEffect } from "react"
import { useWeatherData } from "../hooks/use-weather-data"
import { convertTemperature } from "./utils/weather-utlis"

interface WeatherDisplayProps {
  city: string
  units: "metric" | "imperial"
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, units }) => {
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

  const currentWeather = data.list[0]
  const temp = convertTemperature(currentWeather.main.temp, units)
  const feelsLike = convertTemperature(currentWeather.main.feels_like, units)
  const icon = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`
  const humidity = Math.floor(currentWeather.main.humidity)


  return (
    <div className="p-6 bg-gradient-to-br from-[#0d6efd]/5 to-[#0d6efd]/10 dark:from-[#0d6efd]/10 dark:to-[#0d6efd]/20 rounded-lg shadow-md border border-[#0d6efd]/20">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-3xl font-bold text-[#212529] dark:text-[#f8f9fa] mb-2">{city}</h2>
          <p className="text-lg text-[#212529]/70 dark:text-[#f8f9fa]/70 capitalize">
            {currentWeather.weather[0].description}
          </p>
        </div>
        <div className="flex items-center">
          <img src={icon || "/placeholder.svg"} alt="Weather icon" className="w-20 h-20" />
          <div className="text-right ml-4">
            <p className="text-4xl font-bold text-[#212529] dark:text-[#f8f9fa]">
              {temp.toFixed(1)}°{units === "metric" ? "C" : "F"}
            </p>
            <p className="text-sm text-[#212529]/70 dark:text-[#f8f9fa]/70">Feels like {feelsLike.toFixed(1)}°</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex items-center p-3 bg-[#f8f9fa] dark:bg-[#212529] rounded-lg">
    
          <img src="/svg/droplets.svg" alt="droplets" className="mr-2" />
          <div>
            <p className="text-sm text-[#212529]/70 dark:text-[#f8f9fa]/70">Humidity</p>
            <p className="font-semibold text-[#212529] dark:text-[#f8f9fa]">{humidity}%</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-[#f8f9fa] dark:bg-[#212529] rounded-lg">
     
          <img src="/svg/wind.svg" alt="wind" className="mr-2" />
          <div>
            <p className="text-sm text-[#212529]/70 dark:text-[#f8f9fa]/70">Wind</p>
            <p className="font-semibold text-[#212529] dark:text-[#f8f9fa]">{currentWeather.wind.speed} m/s</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-[#f8f9fa] dark:bg-[#212529] rounded-lg">
    
          <img src="/svg/gauge.svg" alt="gauge" className="mr-2" />
          <div>
            <p className="text-sm text-[#212529]/70 dark:text-[#f8f9fa]/70">Pressure</p>
            <p className="font-semibold text-[#212529] dark:text-[#f8f9fa]">{currentWeather.main.pressure} hPa</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-[#f8f9fa] dark:bg-[#212529] rounded-lg">
       
          <img src="/svg/thermometer.svg" alt="ther.." className="mr-2"/>
          <div>
            <p className="text-sm text-[#212529]/70 dark:text-[#f8f9fa]/70">Min/Max</p>
            <p className="font-semibold text-[#212529] dark:text-[#f8f9fa]">
              {convertTemperature(currentWeather.main.temp_min, units).toFixed(0)}°/
              {convertTemperature(currentWeather.main.temp_max, units).toFixed(0)}°
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherDisplay
