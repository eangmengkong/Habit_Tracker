import React from "react";

interface ButtonAddHabitsProps {
  onClick?: () => void;
}

const ButtonAddHabits: React.FC<ButtonAddHabitsProps> = ({ onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors duration-200 text-white"
      aria-label="Add new habit"
    >
      Add Habit
    </button>
  );
};

export default ButtonAddHabits;