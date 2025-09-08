// src/App.jsx

import ActivityList from "./components/ActivityList";
import ScheduleColumn from "./components/ScheduleColumn";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            Weekendly 🌸
          </h1>
          <p className="mt-2 text-lg text-gray-600">Plan your perfect weekend getaway.</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
             <ActivityList />
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScheduleColumn day="saturday" />
            <ScheduleColumn day="sunday" />
          </div>
        </div>
      </main>
    </div>
  );
}