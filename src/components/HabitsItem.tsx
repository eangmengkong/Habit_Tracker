import React from "react";
import { Check, Trash2, Clock } from "lucide-react";

interface Habit {
  id: number;
  name: string;
  completedToday: boolean;
  streak: number;
  lastCompleted: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface HabitsItemProps {
  habits: Habit[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function HabitsItem({ habits, onComplete, onDelete }: HabitsItemProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="flex items-center justify-between p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => onComplete(habit.id)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                habit.completedToday
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              {habit.completedToday ? (
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              )}
            </button>
            <div className="flex flex-col">
              <span className={`text-sm sm:text-base ${habit.completedToday ? "line-through text-gray-400" : "text-white"}`}>
                {habit.name}
              </span>
              <span className="text-xs text-gray-400">
                Streak: {habit.streak} days
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className={`text-xs sm:text-sm ${habit.completedToday ? "text-green-400" : "text-yellow-400"}`}>
              {habit.completedToday ? "Completed today" : "Pending"}
            </span>
            <button
              onClick={() => onDelete(habit.id)}
              className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors duration-300"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
