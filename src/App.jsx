import './App.css';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Info from './components/Info';
import Details from './components/Details';
import Forecast from './components/Forecast';
import formattedWeatherData from './services/weatherServices';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to capitalize the first letter of a string
function capitalizeFirstletter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function App() {

  // State to store the query parameters for fetching weather data
  const [query, setQuery] = useState({ q: 'london' });

  // State to store the units for temperature (metric or imperial)
  const [units, setUnits] = useState('metric');

  // State to store the fetched weather data
  const [weather, setWeather] = useState(null);

  // Function to fetch weather data
  const fetchWeather = async () => {
    const cityName = query.q ? query.q : 'Current Location';
    toast.info(`Fetching Weather Data From ${capitalizeFirstletter(cityName)}`);

    try {
      const data = await formattedWeatherData({ ...query, units });
      toast.success(`Fetched Weather Data for ${data.name}, ${data.country}`);
      setWeather(data);
    } catch (error) {
      toast.error('Failed to fetch weather data. Please check the city name and try again.');
    }
  };

  // useEffect hook to fetch weather data when query or units change
  useEffect(() => {
    fetchWeather();
  }, [query, units]);

  // useEffect hook to set up interval for automatic updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchWeather();
    }, 300000); // Update every 5 minutes (300,000 milliseconds)

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [query, units]);

  // Function to format the background color based on temperature
  const formatBackground = () => {
    if (!weather) return 'from-cyan-600 to-blue-600';
    const threshold = units === 'metric' ? 25 : 77 ;
    if (weather.temp <= threshold) return 'from-blue-600 to-cyan-600';
    return 'from-orange-600 to-yellow-600';
  };

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <NavBar setQuery={setQuery} />
      <Search setQuery={setQuery} setUnits={setUnits} />

      {/* A Button to Refresh the Data */}
      <button onClick={fetchWeather} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Refresh</button>
      {weather && (
        <>
          <Info weather={weather} />
          <Details weather={weather} units={units} />
          <Forecast title="hourly forecast" data={weather.hourly} />
          <Forecast title="daily forecast" data={weather.daily} />
        </>
      )}

      {/* Toast notifications */}
      <ToastContainer autoClose={1500} theme="colored" />
    </div>
  );
}

export default App;
