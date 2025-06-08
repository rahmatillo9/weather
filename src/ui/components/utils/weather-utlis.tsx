export function convertTemperature(temp: number, units: "metric" | "imperial"): number {
  if (units === "imperial") {
    return (temp * 9) / 5 + 32
  }
  return temp
}

export function getDailyAverages(weatherList: any[]) {
  const dailyData: { [key: string]: any[] } = {}

  // Sana bo'yicha guruhlash
  weatherList.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString()
    if (!dailyData[date]) {
      dailyData[date] = []
    }
    dailyData[date].push(item)
  })

  // Har bir kun uchun Average hisoblash
  return Object.keys(dailyData).map((date) => {
    const dayData = dailyData[date]
    const avgTemp = dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length
    const avgHumidity = dayData.reduce((sum, item) => sum + item.main.humidity, 0) / dayData.length

    return {
      dt: dayData[0].dt,
      main: {
        temp: avgTemp,
        humidity: Math.round(avgHumidity),
        temp_min: Math.min(...dayData.map((item) => item.main.temp_min)),
        temp_max: Math.max(...dayData.map((item) => item.main.temp_max)),
      },
      weather: dayData[0].weather,
      wind: dayData[0].wind,
    }
  })
}

export function getTemperatureStats(weatherList: any[]) {
  const temps = weatherList.map((item) => item.main.temp)
  return {
    min: Math.min(...temps),
    max: Math.max(...temps),
    avg: temps.reduce((sum, temp) => sum + temp, 0) / temps.length,
  }
}

export function sortWeatherByDate(weatherList: any[]) {
  return [...weatherList].sort((a, b) => a.dt - b.dt)
}

// Throttling funksiyasi
export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let lastCall = 0
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const now = Date.now()
    if (now - lastCall < delay) {
      await new Promise((resolve) => setTimeout(resolve, delay - (now - lastCall)))
    }
    lastCall = Date.now()
    return fn(...args)
  }
}
