import React, { useState } from "react";

const ExpenseForm = ({ onAddExpense }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("Food");

  const submitHandler = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Math.random().toString(),
      title: enteredTitle,
      amount: +enteredAmount,
      date: enteredDate ? new Date(enteredDate) : new Date(), // Ensure it's a Date object
      category: enteredCategory,
    };
    onAddExpense(newExpense);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setEnteredCategory("Food");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg"
      aria-label="Add expense form"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          placeholder="Title"
          value={enteredTitle}
          onChange={(e) => setEnteredTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          aria-label="Enter expense title"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={enteredAmount}
          onChange={(e) => setEnteredAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          aria-label="Enter expense amount"
          required
        />
        <input
          type="date"
          value={enteredDate}
          onChange={(e) => setEnteredDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          aria-label="Select expense date"
          required
        />
        <select
          value={enteredCategory}
          onChange={(e) => setEnteredCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          aria-label="Select expense category"
        >
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Utilities">Utilities</option>
          <option value="Rent">Rent</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 dark:bg-yellow-500 dark:hover:bg-yellow-600"
        aria-label="Add expense"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
