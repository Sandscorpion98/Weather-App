import React from "react";

// Info component that takes weather data as props
function Info({ weather: { formatedLocalTime, name, country } }) {
  return (
    <div>
      {/* Display the formatted local time */}
      <div className="flex items-center justify-center my-6">
        <p className="text-white font-extralight text-lg sm:text-xl">
          {formatedLocalTime}
        </p>
      </div>
      {/* Display the city name and country */}
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-2xl sm:text-3xl font-medium">
          {`${name}, ${country}`}
        </p>
      </div>
    </div>
  );
}

export default Info;
