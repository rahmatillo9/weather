"use client"

import type React from "react"
import { useState } from "react"
import CitySelector from "./city-selector"
import WeatherDisplay from "./weather-display"
import ForecastList from "./forecast-list"
import DataVisualization from "./data-visualization"
import SettingsPanel from "./settings-panel"
import ErrorBoundary from "./error-boundary"
import { useWeatherData } from "../hooks/use-weather-data"

const WeatherWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"current" | "forecast" | "statistics">("current")
  const { city, units, changeCity, toggleUnit } = useWeatherData()

  const handleCityChange = (newCity: string, newUnits: "metric" | "imperial") => {
    changeCity(newCity)
    toggleUnit(newUnits)
  }

  return (
    <ErrorBoundary>
      <div className="max-w-[800px] w-full mx-auto p-4 bg-[#f8f9fa] dark:bg-[#212529] text-[#212529] dark:text-[#f8f9fa] rounded-lg shadow-lg transition-all duration-300 sm:p-6">
        {/* Tab tizimi */}
        <div className="flex border-b border-[#0d6efd] mb-6">
          {[
            { key: "current", label: "Current Weather" },
            { key: "forecast", label: "Forecast" },
            { key: "statistics", label: "Statistics" },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`flex-1 py-3 px-2 text-center text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === key
                  ? "bg-[#0d6efd] text-white rounded-t-lg"
                  : "bg-transparent hover:bg-[#0d6efd]/10 text-[#212529] dark:text-[#f8f9fa]"
              }`}
              onClick={() => setActiveTab(key as any)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CitySelector va SettingsPanel */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <CitySelector selectedCity={city} setSelectedCity={handleCityChange} />
          <SettingsPanel units={units} setUnits={toggleUnit} />
        </div>

        {/* Kontent */}
        <div className="transition-all duration-300 ease-in-out">
          <div
            className={`transition-opacity duration-300 ${activeTab === "current" ? "opacity-100" : "opacity-0 hidden"}`}
          >
            {activeTab === "current" && <WeatherDisplay city={city} units={units} />}
          </div>
          <div
            className={`transition-opacity duration-300 ${activeTab === "forecast" ? "opacity-100" : "opacity-0 hidden"}`}
          >
            {activeTab === "forecast" && <ForecastList city={city} units={units} />}
          </div>
          <div
            className={`transition-opacity duration-300 ${activeTab === "statistics" ? "opacity-100" : "opacity-0 hidden"}`}
          >
            {activeTab === "statistics" && <DataVisualization city={city} units={units} />}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default WeatherWidget
