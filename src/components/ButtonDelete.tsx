import React from "react";

interface ButtonDeleteProps {
  onClick: () => void;
}

const ButtonDelete: React.FC<ButtonDeleteProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors duration-200 text-white"
      aria-label="Delete habit"
    >
      Delete
    </button>
  );
};

export default ButtonDelete;
