"use client"

import type React from "react"


interface SettingsPanelProps {
  units: "metric" | "imperial"
  setUnits: (units: "metric" | "imperial") => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ units, setUnits }) => {
  return (
    <div className="flex items-center space-x-3">
      <img src="/svg/settings.svg" alt="settings" />
      <select
        value={units}
        onChange={(e) => setUnits(e.target.value as "metric" | "imperial")}
        className="p-2 rounded-lg border border-[#212529]/20 dark:border-[#f8f9fa]/20 bg-[#f8f9fa] dark:bg-[#212529] text-[#212529] dark:text-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#0d6efd] focus:border-[#0d6efd] transition-all duration-300"
      >
        <option value="metric">Selsiy (°C)</option>
        <option value="imperial">Farenheyt (°F)</option>
      </select>
    </div>
  )
}

export default SettingsPanel
