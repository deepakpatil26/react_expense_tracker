import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ items, onDeleteExpense, onSort }) => {
  if (items.length === 0) {
    return (
      <p
        className="text-gray-500 dark:text-gray-400 text-center"
        aria-label="No expenses found"
      >
        No expenses found for the selected year.
      </p>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <select
          onChange={(e) => onSort(e.target.value)}
          className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          aria-label="Sort expenses"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>
      <ul className="space-y-4" aria-label="List of expenses">
        {items.map((expense) => (
          <ExpenseItem
            key={expense.id}
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            onDelete={onDeleteExpense}
            category={expense.category}
          />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
