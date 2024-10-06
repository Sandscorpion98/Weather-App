import React from "react";
import { FaThermometerEmpty, FaWind } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

// Details component that takes weather data and units as props
function Details({ weather: { details, icon, temp, temp_min, temp_max, humidity, speed, sunrise, sunset, feels_like }, units }) {
  
  // Data for vertical display (Real Feel, Humidity, Speed)
  const verticalData = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FaWind,
      title: "Speed",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
    },
  ];

  // Data for horizontal display (Sunrise, Sunset, High, Low)
  const horizontalData = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div>
      {/* Display weather details */}
      <div className="flex items-center justify-center py-6 text-lg sm:text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      {/* Display weather icon, temperature, and vertical data */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-white py-3">
        <img src={icon} alt="weather icon" className="w-16 sm:w-20" />
        
        <p className="text-4xl sm:text-5xl m-3">{`${temp.toFixed()}° ${units === "metric" ? "C" : "F"}`}</p>

        <div className="flex flex-col space-y-3 items-start">
          {verticalData.map(({ id, Icon, title, value }) => (
            <div key={id} className="flex text-sm font-light items-center justify-center">
              <Icon size={18} className="mr-1" />
              {`${title}:`}
              <span className="ml-1 font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Display horizontal data */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-10 items-center justify-center py-3 text-sm text-white">
        {horizontalData.map(({ id, Icon, value, title }) => (
          <div key={id} className="flex flex-row items-center">
            <Icon size={24} sm:size={30} />
            <p className="font-light ml-1">
              {`${title}:`}
              <span className="ml-1 font-medium">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;
