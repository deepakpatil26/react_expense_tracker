import React from "react";

const Settings = ({
  isDarkMode,
  toggleDarkMode,
  defaultYear,
  onYearChange,
  defaultCategory,
  onCategoryChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Default Year
          </label>
          <select
            value={defaultYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {[2024, 2023, 2022, 2021].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Default Category
          </label>
          <select
            value={defaultCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Utilities">Utilities</option>
            <option value="Rent">Rent</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          <button
            onClick={toggleDarkMode}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-yellow-500 dark:hover:bg-yellow-600"
          >
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
