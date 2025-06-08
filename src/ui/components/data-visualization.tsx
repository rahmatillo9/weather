"use client"

import type React from "react"
import { useEffect } from "react"
import { useWeatherData } from "../hooks/use-weather-data"
import { convertTemperature, getDailyAverages, getTemperatureStats } from "./utils/weather-utlis"


interface DataVisualizationProps {
  city: string
  units: "metric" | "imperial"
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ city, units }) => {
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
  const stats = getTemperatureStats(dailyAverages)
  const temps = dailyAverages.slice(0, 5).map((day) => convertTemperature(day.main.temp, units))

  const maxTemp = Math.max(...temps)
  const minTemp = Math.min(...temps)
  const height = 200
  const width = 600
  const padding = 40

  const points = temps
    .map((temp, i) => {
      const x = padding + (i / (temps.length - 1)) * (width - 2 * padding)
      const y = height - padding - ((temp - minTemp) / (maxTemp - minTemp)) * (height - 2 * padding)
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-[#212529] dark:text-[#f8f9fa] mb-4 flex items-center">
        <img src="/svg/chart-column.svg" alt="chart" className="mr-2"/>
        Statistika va grafik
      </h3>


<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
  <div className="p-4 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
    <div className="flex items-center">
      <img src="/svg/trending-up.svg" alt="up" className="mr-2" />
      <div>
        <p className="text-sm text-green-700 dark:text-green-300">Maximum</p>
        <p className="text-xl font-bold text-green-800 dark:text-green-200">
          {convertTemperature(stats.max, units).toFixed(1)}°{units === "metric" ? "C" : "F"}
        </p>
      </div>
    </div>
  </div>

  <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
    <div className="flex items-center">
      <img src="/svg/activity.svg" alt="activity" className="mr-2" /> {/* Fixed "sactivity" typo */}
      <div>
        <p className="text-sm text-blue-700 dark:text-blue-300">Average</p>
        <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
          {convertTemperature(stats.avg, units).toFixed(1)}°{units === "metric" ? "C" : "F"}
        </p>
      </div>
    </div>
  </div>

  <div className="p-4 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
    <div className="flex items-center">
      <img src="/svg/trending-down.svg" alt="down" className="mr-2" />
      <div>
        <p className="text-sm text-purple-700 dark:text-purple-300">Minimum</p>
        <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
          {convertTemperature(stats.min, units).toFixed(1)}°{units === "metric" ? "C" : "F"}
        </p>
      </div>
    </div>
  </div>
</div>

      {/* Temperature Chart */}
      <div className="p-6 bg-[#f8f9fa] dark:bg-[#212529] rounded-lg shadow-md border border-[#212529]/10 dark:border-[#f8f9fa]/10">
        <h4 className="text-lg font-semibold text-[#212529] dark:text-[#f8f9fa] mb-4">5-day temperature graph</h4>

        <div className="w-full overflow-x-auto">
          <svg width={width} height={height + 40} className="w-full min-w-[600px]">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0d6efd" strokeWidth="0.5" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Temperature line */}
            <polyline fill="none" stroke="#0d6efd" strokeWidth="3" points={points} className="drop-shadow-sm" />

            {/* Data points */}
            {temps.map((temp, i) => {
              const x = padding + (i / (temps.length - 1)) * (width - 2 * padding)
              const y = height - padding - ((temp - minTemp) / (maxTemp - minTemp)) * (height - 2 * padding)
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="#0d6efd"
                    stroke="white"
                    strokeWidth="2"
                    className="drop-shadow-sm"
                  />
                  <text
                    x={x}
                    y={y - 15}
                    className="text-xs font-semibold fill-[#212529] dark:fill-[#f8f9fa]"
                    textAnchor="middle"
                  >
                    {temp.toFixed(1)}°
                  </text>
                </g>
              )
            })}

            {/* Date labels */}
            {dailyAverages.slice(0, 5).map((day, i) => {
              const x = padding + (i / (temps.length - 1)) * (width - 2 * padding)
              return (
                <text
                  key={i}
                  x={x}
                  y={height + 20}
                  className="text-sm fill-[#212529] dark:fill-[#f8f9fa]"
                  textAnchor="middle"
                >
                  {new Date(day.dt * 1000).toLocaleDateString("uz-UZ", {
                    month: "short",
                    day: "numeric",
                  })}
                </text>
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}

export default DataVisualization
