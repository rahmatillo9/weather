"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDebounce } from "../hooks/use-debounce"


interface CitySelectorProps {
  selectedCity: string
  setSelectedCity: (city: string, units: "metric" | "imperial") => void
}

const cities = ["London", "New York", "Tokyo", "Sydney", "Cairo"]

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, setSelectedCity }) => {
  const [search, setSearch] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const debouncedSearch = useDebounce(search, 300)
  const [filteredCities, setFilteredCities] = useState<string[]>(cities)

  useEffect(() => {
    setError(null)
    if (debouncedSearch) {
      const filtered = cities.filter((city) => city.toLowerCase().includes(debouncedSearch.toLowerCase()))
      if (filtered.length === 0) {
        setError(
          "Bu shahar ro'yxatda yo'q. Iltimos, quyidagi shaharlardan birini tanlang: London, New York, Tokyo, Sydney, Cairo",
        )
      }
      setFilteredCities(filtered)
    } else {
      setFilteredCities(cities)
    }
  }, [debouncedSearch])

  const handleSelect = (city: string) => {
    if (cities.includes(city)) {
      setSelectedCity(city, "metric")
      setSearch("")
      setError(null)
      setIsOpen(false)
    } else {
      setError("Iltimos, ro'yxatdagi shaharlardan birini tanlang")
    }
  }

  return (
    <div className="relative w-full sm:w-64">
      <div className="relative">
      
        <img src="/svg/search.svg" alt="search"  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#212529] dark:text-[#f8f9fa] opacity-50"/>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="search for a city..."
          className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-[#212529]/20 dark:border-[#f8f9fa]/20 focus:border-[#0d6efd] focus:ring-[#0d6efd]"
          } bg-[#f8f9fa] dark:bg-[#212529] text-[#212529] dark:text-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-opacity-50`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
       
            <img src="/svg/map-pin.svg" alt="map" className="mr-2" />
          <span className="ml-1 text-sm font-medium text-[#0d6efd]">{selectedCity}</span>
        </div>
      </div>

      {error && (
        <div className="absolute z-20 w-full mt-1 p-3 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg border border-red-200 dark:border-red-800 text-sm">
          {error}
        </div>
      )}

      {isOpen && search && !error && (
        <div className="absolute z-10 w-full mt-1 bg-[#f8f9fa] dark:bg-[#212529] border border-[#212529]/20 dark:border-[#f8f9fa]/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div
                key={city}
                className="p-3 hover:bg-[#0d6efd]/10 cursor-pointer text-[#212529] dark:text-[#f8f9fa] transition-colors duration-200 flex items-center"
                onClick={() => handleSelect(city)}
              >  <img src="/svg/map-pin.svg" alt="map" className="mr-2" />
                
                {city}
              </div>
            ))
          ) : (
            <div className="p-3 text-[#212529] dark:text-[#f8f9fa] text-center">Shahar topilmadi</div>
          )}
        </div>
      )}
    </div>
  )
}

export default CitySelector
