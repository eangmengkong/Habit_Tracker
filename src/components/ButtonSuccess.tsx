"use client";

import React from "react";

interface ButtonSuccessProps {
  id: number;
  completedToday: boolean;
  onComplete: (id: number) => void;
}

const ButtonSuccess: React.FC<ButtonSuccessProps> = ({ id, completedToday, onComplete }) => {
  return (
    <button
      onClick={() => onComplete(id)}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
        completedToday
          ? "bg-green-600 hover:bg-green-700 text-white"
          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
      }`}
      aria-label={completedToday ? "Mark as incomplete" : "Mark as complete"}
    >
      {completedToday ? "Completed" : "Complete"}
    </button>
  );
};

export default ButtonSuccess;
