import React from "react";

const ExpenseFilter = ({
  selectedYear,
  onYearChange,
  selectedCategory,
  onCategoryChange,
  onSearchChange,
}) => {
  const yearChangeHandler = (e) => onYearChange(e.target.value);
  const categoryChangeHandler = (e) => onCategoryChange(e.target.value);
  const searchChangeHandler = (e) => onSearchChange(e.target.value);

  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg grid gap-4 sm:grid-cols-3"
      aria-label="Expense filter"
    >
      <select
        value={selectedYear}
        onChange={yearChangeHandler}
        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        aria-label="Filter expenses by year"
      >
        {[2024, 2023, 2022, 2021].map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        value={selectedCategory}
        onChange={categoryChangeHandler}
        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        aria-label="Filter expenses by category"
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Utilities">Utilities</option>
        <option value="Rent">Rent</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <input
        type="text"
        placeholder="Search by title"
        onChange={searchChangeHandler}
        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        aria-label="Search expenses by title"
      />
    </div>
  );
};

export default ExpenseFilter;
