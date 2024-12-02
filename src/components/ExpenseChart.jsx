import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  // Aggregate expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals), // Categories
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryTotals), // Totals for each category
        backgroundColor: [
          "#4CAF50", // Green
          "#FF9800", // Orange
          "#F44336", // Red
          "#2196F3", // Blue
          "#9C27B0", // Purple
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20, // Reduce legend box size
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false, // Disable default aspect ratio
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Expenses by Category
      </h2>
      <div
        className="relative mx-auto"
        style={{ width: "100%", maxWidth: "300px", height: "300px" }}
      >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart;
