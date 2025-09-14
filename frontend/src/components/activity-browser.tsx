import { useState } from "react";
import { Button } from "./ui/button";
import { ACTIVITY_DATA } from "../constants/activity";
import ActivityCard from "./activity-card";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function ActivityBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMood, setSelectedMood] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
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
    const searchMatch =
      searchText.trim() === "" ||
      activity.name.toLowerCase().includes(searchText.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchText.toLowerCase());
    return categoryMatch && moodMatch && searchMatch;
  });

  return (
    <div className="space-y-6 h-full flex flex-col pt-4">
      <div className="space-y-4 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2 text-foreground">
              Category
            </h3>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
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
          <div className="w-full md:w-96">
            <h2 className="text-sm uppercase mb-4 text-foreground">
              Search Activities
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 text-muted-foreground transform -translate-y-1/2" />
              <Input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search activities..."
                className="pl-10 pr-4 bg-secondary border-gray-800 text-foreground"
              />
            </div>
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
              setSearchText("");
            }}
            className="mt-2 transition-all duration-200 hover:scale-105 text-foreground cursor-pointer"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
