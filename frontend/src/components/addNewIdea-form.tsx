import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addIdea } from "../redux/slices/activitiesSlice";

export const AddNewIdeaForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("Default");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addIdea({ title, category }));
      setTitle("");
      setCategory("Default");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 mt-4 border-t border-slate-200 dark:border-slate-700"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New activity title..."
        className="px-3 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as string)}
        className="px-3 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600"
      >
        <option value="Default">Default</option>
        <option value="Food">Food</option>
        <option value="Outdoors">Outdoors</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <button
        type="submit"
        className="px-4 py-2 font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-600"
      >
        Add Idea
      </button>
    </form>
  );
};
