import { useState } from "react";
import { Button } from "./ui/button";
import { ACTIVITY_DATA } from "../constants/activity";
import ActivityCard from "./activity-card";

export function ActivityBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMood, setSelectedMood] = useState<string>("all");

  const categories = [
    "all",
    ...Array.from(new Set(ACTIVITY_DATA.map((a) => a.category))),
  ];
  const moods = [
    "all",
    ...Array.from(new Set(ACTIVITY_DATA.map((a) => a.mood))),
  ];

  const filteredActivities = ACTIVITY_DATA.filter((activity) => {
    const categoryMatch =
      selectedCategory === "all" || activity.category === selectedCategory;
    const moodMatch = selectedMood === "all" || activity.mood === selectedMood;
    return categoryMatch && moodMatch;
  });

  return (
    <div className="space-y-6 h-full flex flex-col pt-4">
      <div className="space-y-4 flex flex-col">
        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">Category</h3>
          <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "text-background"
                    : "text-foreground"
                } capitalize transition-all duration-200 hover:scale-105 cursor-pointer`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">Mood</h3>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <Button
                key={mood}
                variant={selectedMood === mood ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMood(mood)}
                className={`${
                  selectedMood === mood ? "text-background" : "text-foreground"
                } capitalize transition-all duration-200 hover:scale-105 cursor-pointer`}
              >
                {mood}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 overflow-y-auto pr-1 py-2">
        {filteredActivities.map((activity) => (
          <ActivityCard activity={activity} key={activity.id} />
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-8 animate-fade-in">
          <p className="text-muted-foreground">
            No activities match your current filters.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory("all");
              setSelectedMood("all");
            }}
            className="mt-2 transition-all duration-200 hover:scale-105"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
