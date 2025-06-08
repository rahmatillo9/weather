"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface WeatherData {
  cod: string
  message: number
  cnt: number
  list: Array<{
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
    }
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
    clouds: { all: number }
    wind: { speed: number; deg: number }
    dt_txt: string
  }>
}

interface WeatherState {
  data: WeatherData | null
  loading: boolean
  error: string | null
  city: string
  units: "metric" | "imperial"
}

type WeatherAction =
  | { type: "FETCH_WEATHER" }
  | { type: "FETCH_WEATHER_SUCCESS"; payload: WeatherData }
  | { type: "FETCH_WEATHER_ERROR"; payload: string }
  | { type: "CHANGE_CITY"; payload: string }
  | { type: "TOGGLE_UNIT"; payload: "metric" | "imperial" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  city: "London",
  units: "metric",
}

function weatherReducer(state: WeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case "FETCH_WEATHER":
      return { ...state, loading: true, error: null }
    case "FETCH_WEATHER_SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null }
    case "FETCH_WEATHER_ERROR":
      return { ...state, loading: false, error: action.payload }
    case "CHANGE_CITY":
      return { ...state, city: action.payload }
    case "TOGGLE_UNIT":
      return { ...state, units: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    default:
      return state
  }
}

interface WeatherContextType extends WeatherState {
  dispatch: React.Dispatch<WeatherAction>
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState)

  return <WeatherContext.Provider value={{ ...state, dispatch }}>{children}</WeatherContext.Provider>
}

export function useWeatherContext() {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error("useWeatherContext must be used within a WeatherProvider")
  }
  return context
}
