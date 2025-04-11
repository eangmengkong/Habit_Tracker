import React from "react";
import ButtonSuccess from "./ButtonSuccess";
import ButtonDelete from "./ButtonDelete";

interface Habit {
  id: number;
  name: string;
  completedToday: boolean;
  streak: number;
  lastCompleted: Date | null;
}

interface HabitsListProps {
  habits: Habit[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const HabitsList: React.FC<HabitsListProps> = ({
  habits,
  onComplete,
  onDelete,
}) => {
  return (
    <ul className="space-y-4">
      {habits.map((habit) => (
        <li
          key={habit.id}
          className={`bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl ${
            habit.completedToday
              ? "border-l-4 border-green-500"
              : "border-l-4 border-gray-700"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">{habit.name}</h3>
              <div className="flex gap-4">
                <span className="flex items-center gap-1 text-orange-400">
                  <span role="img" aria-label="fire">
                    🔥
                  </span>
                  {habit.streak} days
                </span>
                <span
                  className={`flex items-center gap-1 ${
                    habit.completedToday ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  {habit.completedToday ? (
                    <>
                      <span role="img" aria-label="check">
                        ✅
                      </span>
                      Completed today
                    </>
                  ) : (
                    <>
                      <span role="img" aria-label="pending">
                        ⏳
                      </span>
                      Pending
                    </>
                  )}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <ButtonSuccess
                id={habit.id}
                completedToday={habit.completedToday}
                onComplete={onComplete}
              />
              <ButtonDelete onClick={() => onDelete(habit.id)} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HabitsList;
