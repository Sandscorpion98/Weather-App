import React from "react";

// Forecast component that takes title and data as props
function Forecast({ title, data }) {
  return (
    <div>
      {/* Display the title */}
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase text-lg sm:text-xl">{title}</p>
      </div>
      <hr className="my-2" />

      {/* Display the forecast data in a grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-white">
        {data.map((d, index) => (
          <div key={index} className="flex flex-col items-center justify-center mb-4 sm:mb-0 bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
            {/* Display the time/title of the forecast */}
            <p className="text-sm sm:text-base font-light">{d.title}</p>
            {/* Display the weather icon */}
            <img src={d.icon} alt="weather icon" className="my-1 w-10 sm:w-12" />
            {/* Display the temperature */}
            <p className="font-medium text-lg sm:text-xl">{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
