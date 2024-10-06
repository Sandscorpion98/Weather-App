import React, { useState } from "react";
import {  BiSearch } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

// Search component that takes setQuery and setUnits as props
function Search({ setQuery, setUnits }) {
  // State to store the city input
  const [city, setCity] = useState("");

  // Handle search button click
  const handleClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  // Handle current location button click
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center my-6">
      {/* Input field and search/location buttons */}
      <div className="flex flex-col sm:flex-row w-full sm:w-3/4 items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search for City..."
          className="text-xl font-light p-2 rounded-3xl w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <BiSearch
          size={25}
          onClick={handleClick}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
        <FaLocationDot
          size={25}
          onClick={handleLocation}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
      </div>
      {/* Unit selection buttons */}
      <div className="flex flex-row items-center justify-center w-full sm:w-1/4 mt-4 sm:mt-0">
        <button
          name="metric"
          className="text-white font-bold text-xl transition ease-out hover:scale-150 hover:text-red-600"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <p className="text-white text-xl mx-2">|</p>
        <button
          name="imperial"
          className="text-white font-bold text-xl transition ease-out hover:scale-150 hover:text-blue-800"
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Search;
