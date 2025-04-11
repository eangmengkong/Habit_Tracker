"use client";

import React from "react";
import useHabits from "@/hooks/useHabits";
import { HabitsForm } from "@/components/HabitsForm";
import HabitsItem from "@/components/HabitsItem";

const HabitsPage: React.FC = () => {
  const { 
    habits,
    input,
    setInput,
    handleAddHabit,
    handleToggleComplete,
    handleDelete,
  } = useHabits();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">Habit Tracker</h1>
          <p className="text-indigo-200 text-base sm:text-lg md:text-xl">Build better habits, one day at a time</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20">
          <HabitsForm 
            input={input}
            setInput={setInput}
            handleAddHabit={handleAddHabit}
          />
          
          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4">Your Habits</h2>
            <div className="space-y-3 sm:space-y-4">
              <HabitsItem 
                habits={habits} 
                onComplete={handleToggleComplete} 
                onDelete={handleDelete} 
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HabitsPage;
