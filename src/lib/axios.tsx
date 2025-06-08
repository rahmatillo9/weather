import axios, { AxiosError } from 'axios';
import londonData from '@/mock/london.json';
import newYorkData from '@/mock/newyork.json';
import tokyoData from '@/mock/tokyo.json';
import sydneyData from '@/mock/sydney.json';
import cairoData from '@/mock/cairo.json';

const mockData = {
  London: londonData,
  'New York': newYorkData,
  Tokyo: tokyoData,
  Sydney: sydneyData,
  Cairo: cairoData,
};

// Throttling funksiyasi
const throttle = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let lastCall = 0;
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const now = Date.now();
    if (now - lastCall < delay) {
      await new Promise((resolve) => setTimeout(resolve, delay - (now - lastCall)));
    }
    lastCall = now;
    return fn(...args);
  };
};

// Axios instansiyasi
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_OWM_API_URL || 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: process.env.NEXT_PUBLIC_OWM_API_KEY,
    units: 'metric',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let errorMessage = 'An error occurred while fetching data';
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = 'Invalid API key. Please check your OpenWeatherMap API key.';
          break;
        case 429:
          errorMessage = 'API rate limit exceeded. Please try again later.';
          break;
        case 404:
          errorMessage = 'City not found. Please enter a valid city name.';
          break;
        default:
          errorMessage = `Error ${error.response.status}: ${error.response.statusText}`;
      }
    } else if (error.request) {
      errorMessage = 'No response from the server. Please check your internet connection.';
    }
    return Promise.reject({ ...error, message: errorMessage });
  }
);

export const fetchWeatherData = throttle(
  async (city: string, units: "metric" | "imperial" = "metric") => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (mockData[city as keyof typeof mockData]) {
      const data = mockData[city as keyof typeof mockData]
      // Generate more realistic forecast data
      const extendedList = []
      for (let i = 0; i < 40; i++) {
        const baseItem = data.list[0]
        extendedList.push({
          ...baseItem,
          dt: baseItem.dt + i * 3 * 60 * 60, 
          main: {
            ...baseItem.main,
            temp: baseItem.main.temp + (Math.random() - 0.5) * 10,
            temp_min: baseItem.main.temp_min + (Math.random() - 0.5) * 8,
            temp_max: baseItem.main.temp_max + (Math.random() - 0.5) * 8,
            humidity: Math.max(20, Math.min(100, baseItem.main.humidity + (Math.random() - 0.5) * 20)),
          },
          dt_txt: new Date(baseItem.dt * 1000 + i * 3 * 60 * 60 * 1000).toISOString().replace("T", " ").slice(0, 19),
        })
      }
      return { ...data, list: extendedList }
    }

    throw new Error(`Shahar "${city}" uchun ma'lumot topilmadi`)
  },
  5000, 
)
export default api;