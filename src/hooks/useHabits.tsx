"use client";

import { db } from "@/db";
import { habits } from "@/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { useEffect, useState } from "react";

type Habit = typeof habits.$inferSelect;

interface UseHabitsReturn {
  habits: Habit[];
  loading: boolean;
  error: string | null;
  input: string;
  setInput: (value: string) => void;
  handleAddHabit: () => Promise<void>;
  handleToggleComplete: (id: number) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
}

export default function useHabits(): UseHabitsReturn {
  const [habitsList, setHabitsList] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(habits)
        .orderBy(desc(habits.createdAt));
      setHabitsList(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch habits");
    } finally {
      setLoading(false);
    }
  };

  const addHabit = async (name: string) => {
    try {
      // Check for existing habit
      const [existingHabit] = await db
        .select()
        .from(habits)
        .where(sql`lower(name) = lower(${name})`)
        .limit(1);

      if (existingHabit) {
        throw new Error("This habit already exists");
      }

      const [newHabit] = await db
        .insert(habits)
        .values({
          name,
          completedToday: false,
          streak: 0,
          lastCompleted: null,
        })
        .returning();
      
      return newHabit;
    } catch (err) {
      console.error('Error adding habit:', err);
      throw err;
    }
  };

  const handleAddHabit = async () => {
    if (!input.trim()) {
      setError("Habit name cannot be empty");
      return;
    }

    try {
      const newHabit = await addHabit(input.trim());
      setHabitsList(prev => [newHabit, ...prev]);
      setInput("");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add habit");
    }
  };

  const toggleComplete = async (id: number, completedToday: boolean) => {
    try {
      const today = new Date();
      const [updatedHabit] = await db
        .update(habits)
        .set({
          completedToday,
          streak: completedToday ? sql`streak + 1` : sql`streak`,
          lastCompleted: completedToday ? today : null,
          updatedAt: today,
        })
        .where(eq(habits.id, id))
        .returning();

      setHabitsList(prev =>
        prev.map(habit => (habit.id === id ? updatedHabit : habit))
      );
    } catch (err) {
      console.error('Error updating habit:', err);
      throw err;
    }
  };

  const handleToggleComplete = async (id: number) => {
    try {
      const habit = habitsList.find(h => h.id === id);
      if (!habit) return;
      await toggleComplete(id, !habit.completedToday);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update habit");
    }
  };

  const deleteHabit = async (id: number) => {
    try {
      await db.delete(habits).where(eq(habits.id, id));
      setHabitsList(prev => prev.filter(habit => habit.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting habit:', err);
      throw err;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteHabit(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete habit");
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);
  
  return {
    habits: habitsList,
    loading,
    error,
    input,
    setInput,
    handleAddHabit,
    handleToggleComplete,
    handleDelete,
  };
}