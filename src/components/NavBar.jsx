import React from "react";
import Logo from "../assets/Logo.png";

// NavBar component that takes setQuery as a prop
function NavBar({ setQuery }) {
  // List of cities to display in the NavBar
  const cities = [
    { id: 1, title: "London" },
    { id: 2, title: "Cairo" },
    { id: 3, title: "Palestine" },
    { id: 4, title: "United States" },
    { id: 5, title: "China" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6">
      {/* Logo section */}
      <div className="mb-4 sm:mb-0">
        <img src={Logo} width={100} height={100} alt="Logo" />
      </div>
      {/* Buttons for each city */}
      <div className="flex flex-wrap justify-center sm:justify-around w-full sm:w-auto">
        {cities.map((city) => (
          <button
            key={city.id} // Unique key for each city
            className="text-white text-lg font-medium hover:text-red-500 transition ease-out hover:bg-gray-300 rounded-3xl py-2 px-4 m-2 sm:m-0"
            onClick={() => setQuery({ q: city.title })} // Set query to the selected city
          >
            {city.title} {/* Display city title */}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
