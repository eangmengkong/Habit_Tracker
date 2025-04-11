import React from "react";
import ButtonAddHabits from "./ButtonAddHabits";
import { InputHabits } from "./InputHabits";

interface HabitsFormProps {
  input: string;
  setInput: (value: string) => void;
  handleAddHabit: () => void;
}

export function HabitsForm({ input, setInput, handleAddHabit }: HabitsFormProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddHabit();
    }
  };

  return (
    <div className="w-full p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">Add New Habit</h2>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <InputHabits
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter habit name"
          className="flex-1 bg-white/20 text-white placeholder:text-white/50 text-sm sm:text-base"
        />
        <ButtonAddHabits onClick={handleAddHabit} />
      </div>
    </div>
  );
}