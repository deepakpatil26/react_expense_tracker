import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseChart from "./components/ExpenseChart";
import Settings from "./components/Settings";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredYear, setFilteredYear] = useState(
    localStorage.getItem("defaultYear") || "2024"
  );
  const [filteredCategory, setFilteredCategory] = useState(
    localStorage.getItem("defaultCategory") || "All"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Theme persistence and expense loading
  // Theme persistence and expense loading
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Convert `date` field to a Date object if it exists
    const parsedExpenses = savedExpenses.map((expense) => ({
      ...expense,
      date: expense.date ? new Date(expense.date) : null,
    }));

    setExpenses(parsedExpenses); // Set expenses with parsed dates

    // Apply dark mode class based on theme
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Save expenses to localStorage whenever they change

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };

  const deleteExpenseHandler = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  const filterChangeHandler = (year) => setFilteredYear(year);

  const categoryChangeHandler = (category) => setFilteredCategory(category);

  const searchHandler = (term) => setSearchTerm(term);

  const sortHandler = (option) => setSortOption(option);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const filteredExpenses = expenses
    .filter((expense) => {
      // Check if `expense.date` is a valid Date object
      if (!expense.date || isNaN(new Date(expense.date).getTime()))
        return false;
      return (
        expense.date.getFullYear().toString() === filteredYear &&
        (filteredCategory === "All" || expense.category === filteredCategory) &&
        expense.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortOption === "date") {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortOption === "amount") {
        return b.amount - a.amount;
      }
      return 0;
    });

  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const basename =
    process.env.NODE_ENV === "production" ? "/react_expense_tracker" : "/";

  return (
    <Router basename={basename}>
      <div
        className={`min-h-screen p-4 transition-all duration-300 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <nav className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Expense Tracker</h1>
          <div className="flex space-x-4">
            <Link to="/" className="text-blue-500 hover:underline">
              Home
            </Link>
            <Link to="/settings" className="text-blue-500 hover:underline">
              Settings
            </Link>
            <button
              onClick={toggleDarkMode}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-yellow-500 dark:hover:bg-yellow-600"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <ExpenseForm onAddExpense={addExpenseHandler} />
                <ExpenseFilter
                  selectedYear={filteredYear}
                  onYearChange={filterChangeHandler}
                  selectedCategory={filteredCategory}
                  onCategoryChange={categoryChangeHandler}
                  onSearchChange={searchHandler}
                />
                <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg">
                  <h2 className="text-xl font-semibold">
                    Total Expenses: ${totalExpenses.toFixed(2)}
                  </h2>
                </div>
                <ExpenseChart expenses={filteredExpenses} />
                <ExpenseList
                  items={filteredExpenses}
                  onDeleteExpense={deleteExpenseHandler}
                  onSort={sortHandler}
                />
              </div>
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                defaultYear={filteredYear}
                onYearChange={(year) => {
                  setFilteredYear(year);
                  localStorage.setItem("defaultYear", year);
                }}
                defaultCategory={filteredCategory}
                onCategoryChange={(category) => {
                  setFilteredCategory(category);
                  localStorage.setItem("defaultCategory", category);
                }}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
