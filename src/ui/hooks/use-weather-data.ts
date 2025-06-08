"use client"

import { useCallback } from "react"
import { useWeatherContext } from "../context/weather-context"
import { fetchWeatherData } from "@/lib/axios"

export function useWeatherData() {
  const { data, loading, error, city, units, dispatch } = useWeatherContext()

  const fetchData = useCallback(
    async (cityName: string, weatherUnits: "metric" | "imperial") => {
      dispatch({ type: "FETCH_WEATHER" })
      dispatch({ type: "CHANGE_CITY", payload: cityName })
      dispatch({ type: "TOGGLE_UNIT", payload: weatherUnits })

      try {
        const weatherData = await fetchWeatherData(cityName, weatherUnits)
        dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: weatherData })
      } catch (err: any) {
        dispatch({ type: "FETCH_WEATHER_ERROR", payload: err.message || "Ma'lumot olishda xato yuz berdi" })
      }
    },
    [dispatch],
  )

  const changeCity = useCallback(
    (cityName: string) => {
      dispatch({ type: "CHANGE_CITY", payload: cityName })
    },
    [dispatch],
  )

  const toggleUnit = useCallback(
    (unit: "metric" | "imperial") => {
      dispatch({ type: "TOGGLE_UNIT", payload: unit })
    },
    [dispatch],
  )

  const setError = useCallback(
    (errorMessage: string) => {
      dispatch({ type: "SET_ERROR", payload: errorMessage })
    },
    [dispatch],
  )

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" })
  }, [dispatch])

  return {
    data,
    loading,
    error,
    city,
    units,
    fetchData,
    changeCity,
    toggleUnit,
    setError,
    clearError,
  }
}
