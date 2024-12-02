import React from "react";

const ExpenseItem = ({ id, title, amount, date, onDelete }) => {
  return (
    <li className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400">${amount.toFixed(2)}</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {date.toDateString()}
        </p>
      </div>
      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800">
        Delete
      </button>
    </li>
  );
};

export default ExpenseItem;
