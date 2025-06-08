Interactive Weather Dashboard Widget
This is a React-based interactive weather dashboard widget built with Next.js and Tailwind CSS, as part of the Frontend Developer Technical Assessment. The application displays weather data for five specific cities (London, New York, Tokyo, Sydney, Cairo) using the OpenWeatherMap API or mock data, with features like city selection, a 5-day forecast, temperature visualization, and customizable settings. The project follows the specified requirements, including component architecture, state management with a custom hook, and responsive design with dark/light mode support.
Features

CitySelector: A dropdown with search functionality to select from five predefined cities.
WeatherDisplay: Shows current weather data with icons from OpenWeatherMap.
ForecastList: Displays a 5-day forecast as cards, with daily average temperatures.
DataVisualization: Renders a temperature chart using SVG (no external chart libraries).
SettingsPanel: Allows toggling between Celsius and Fahrenheit units.
ErrorBoundary: Catches and displays errors with user-friendly messages.
State Management: Uses a custom useWeatherData hook with a reducer pattern to handle API calls, data transformation, and state updates.
Theme Support: Implements dark/light mode with a custom color palette (#f8f9fa, #212529, #0d6efd).
Responsive Design: Fixed 800px width on desktop, fully responsive on mobile.
Animations: Smooth fade-in/out transitions when switching cities.
Throttling/Debouncing: API calls throttled to 1 per 5 seconds; search input debounced with a 300ms delay.
Mock Data: Includes mock JSON files for testing to avoid API rate limits.

Prerequisites

Node.js: Version 14.x or higher.
npm: Version 6.x or higher.
OpenWeatherMap API Key: Required for live API calls (optional if using mock data).

Setup Instructions
Follow these steps to set up and run the project locally:

Clone the Repository:
git clone <repository-url>
cd weather-dashboard-widget


Install Dependencies:Install all required packages using npm:
npm install


Configure Environment Variables:Create a .env.local file in the project root and add your OpenWeatherMap API key. If using mock data, this step is optional.
NEXT_PUBLIC_OWM_API_URL=https://api.openweathermap.org/data/2.5
NEXT_PUBLIC_OWM_API_KEY=your_api_key_here


Run the Development Server:Start the Next.js development server:
npm run dev

Open http://localhost:3000 in your browser to view the application.

Build for Production (optional):To create an optimized production build:
npm run build
npm start



Mock Data Usage
To avoid OpenWeatherMap API rate limits during development, the project includes mock JSON files for each city (/mock/london.json, /mock/new-york.json, /mock/tokyo.json, /mock/sydney.json, /mock/cairo.json). These files are automatically used when the API is unavailable or when testing locally. To switch to live API calls, ensure the NEXT_PUBLIC_OWM_API_KEY is set in .env.local.

Component Documentation
WeatherWidget

Purpose: Main container that integrates all components and manages tabs (Current Weather, Forecast, Statistics).
Props:
None


State:
activeTab: Controls the active view (current, forecast, statistics).



CitySelector

Purpose: Dropdown with search functionality for selecting cities.
Props:
selectedCity: Currently selected city (string).
setSelectedCity: Function to update the selected city and units.


State:
search: Search input value.
error: Validation error message.



WeatherDisplay

Purpose: Displays current weather data with an icon.
Props:
city: Selected city (string).
units: Temperature unit (metric or imperial).



ForecastList

Purpose: Shows a 5-day forecast as cards.
Props:
city: Selected city (string).
units: Temperature unit (metric or imperial).



DataVisualization

Purpose: Renders a 5-day temperature chart using SVG.
Props:
city: Selected city (string).
units: Temperature unit (metric or imperial).



SettingsPanel

Purpose: Allows toggling between Celsius and Fahrenheit units.
Props:
units: Current unit (metric or imperial).
setUnits: Function to update units.



ErrorBoundary

Purpose: Catches and displays errors in the component tree.
Props:
children: Wrapped components.



ThemeSwitch

Purpose: Toggles between dark and light modes.
Props:
type: fixed (bottom-right button) or chip (inline panel).
className: Additional Tailwind classes.



Custom Hooks
useWeatherData

Purpose: Manages API calls, data transformation, and state with a reducer pattern.
Actions:
FETCH_WEATHER: Fetches and processes weather data.
CHANGE_CITY: Updates the selected city.
TOGGLE_UNIT: Switches between metric and imperial units.
SET_ERROR: Sets an error message.
CLEAR_ERROR: Clears the error message.


Returns:
data: Raw API/mock data.
dailyAverages: Processed 5-day forecast data.
minTemp, maxTemp, avgTemp: Temperature statistics.
loading: Loading state.
error: Error message.
city: Selected city.
units: Current unit.
fetchData: Function to fetch weather data.
toggleUnits: Function to toggle units.



useDebounce

Purpose: Debounces search input with a 300ms delay.
Parameters:
value: Input value to debounce.
delay: Delay in milliseconds (300ms).



Performance Optimizations

Throttling: API calls are limited to 1 per 5 seconds using a custom throttle function in axios.ts.
Debouncing: Search input is debounced with a 300ms delay using useDebounce.
Memoization: useCallback is used in useWeatherData to prevent unnecessary re-renders.
Mock Data: Mock JSON files reduce API calls during development and testing.
CSS Transitions: Smooth fade-in/out animations for city switches using transition-opacity.

Testing
The project includes unit tests for:

useWeatherData hook (API calls, reducer actions).
Temperature conversion functions in weatherUtils.ts.
useDebounce hook.
Snapshot tests for WeatherDisplay.

Run tests with:
npm test

Component Architecture Diagram
Below is a simplified representation of the component hierarchy and data flow:
WeatherWidget
├── ErrorBoundary
│   ├── CitySelector
│   ├── WeatherDisplay
│   ├── ForecastList
│   ├── DataVisualization
│   ├── SettingsPanel
│   └── ThemeSwitch
Data Flow: useWeatherData → Reducer → Components

For a detailed diagram, refer to architecture_diagram.png (created using Draw.io, not included in this repository).
Troubleshooting

Hydration Errors: Ensure suppressHydrationWarning is added to the <html> tag in RootLayout.tsx to handle next-themes inconsistencies.
API Issues: If the OpenWeatherMap API key is invalid or rate limits are exceeded, the app falls back to mock data. Verify NEXT_PUBLIC_OWM_API_KEY in .env.local.
Browser Extensions: Disable extensions like AdBlock that may interfere with HTML rendering.

Submission


