import { Coffee, Film, Heart, Mountain, Palette, Users } from "lucide-react";
import type { Activity } from "../../types/planTypes";

const ACTIVITY_DATA: Activity[] = [
  {
    id: "brunch-1",
    name: "Weekend Brunch",
    category: "food",
    description: "Enjoy a leisurely brunch at your favorite spot",
    duration: 90,
    mood: "relaxed",
    createdAt: "",
    updatedAt: "",
    icon: "coffee",
  },
  {
    id: "cooking-1",
    name: "Cook Together",
    category: "food",
    description: "Try a new recipe with friends or family",
    duration: 120,
    mood: "social",
    createdAt: "",
    updatedAt: "",
    icon: "coffee",
  },
  {
    id: "food-market-1",
    name: "Farmers Market",
    category: "food",
    description: "Browse local produce and artisanal goods",
    duration: 60,
    mood: "relaxed",
    createdAt: "",
    updatedAt: "",
    icon: "coffee",
  },

  // Outdoor Activities
  {
    id: "hiking-1",
    name: "Nature Hike",
    category: "outdoor",
    description: "Explore local trails and enjoy fresh air",
    duration: 180,
    mood: "adventurous",
    createdAt: "",
    updatedAt: "",
    icon: "mountain",
  },
  {
    id: "park-1",
    name: "Park Picnic",
    category: "outdoor",
    description: "Relax in the park with snacks and games",
    duration: 120,
    mood: "relaxed",
    createdAt: "",
    updatedAt: "",
    icon: "mountain",
  },
  {
    id: "cycling-1",
    name: "Bike Ride",
    category: "outdoor",
    description: "Cycle through scenic routes",
    duration: 90,
    mood: "energetic",
    createdAt: "",
    updatedAt: "",
    icon: "mountain",
  },

  // Entertainment
  {
    id: "movie-1",
    name: "Movie Night",
    category: "entertainment",
    description: "Watch a new release or classic film",
    duration: 150,
    mood: "relaxed",
    createdAt: "",
    updatedAt: "",
    icon: "film",
  },
  {
    id: "concert-1",
    name: "Live Music",
    category: "entertainment",
    description: "Attend a concert or local music event",
    duration: 180,
    mood: "energetic",
    createdAt: "",
    updatedAt: "",
    icon: "film",
  },
  {
    id: "museum-1",
    name: "Museum Visit",
    category: "entertainment",
    description: "Explore art, history, or science exhibits",
    duration: 120,
    mood: "relaxed",
    createdAt: "",
    updatedAt: "",
    icon: "film",
  },

  // Wellness
  {
    id: "yoga-1",
    name: "Yoga Session",
    category: "wellness",
    description: "Practice mindfulness and flexibility",
    duration: 60,
    mood: "relaxed",
    createdAt: "",
    updatedAt: "",
    icon: "heart",
  },
  {
    id: "spa-1",
    name: "Spa Day",
    category: "wellness",
    description: "Pamper yourself with relaxation treatments",
    duration: 180,
    mood: "relaxed",
    createdAt: "",
    updatedAt: "",
    icon: "heart",
  },
  {
    id: "meditation-1",
    name: "Meditation",
    category: "wellness",
    description: "Find inner peace and clarity",
    duration: 30,
    mood: "relaxed",
    createdAt: "",
    updatedAt: "",
    icon: "heart",
  },

  // Social
  {
    id: "friends-1",
    name: "Hang with Friends",
    category: "social",
    description: "Catch up with your favorite people",
    duration: 120,
    mood: "social",
    createdAt: "",
    updatedAt: "",
    icon: "users",
  },
  {
    id: "game-night-1",
    name: "Game Night",
    category: "social",
    description: "Play board games or video games together",
    duration: 180,
    mood: "social",
    createdAt: "",
    updatedAt: "",
    icon: "users",
  },
  {
    id: "party-1",
    name: "House Party",
    category: "social",
    description: "Host or attend a fun gathering",
    duration: 240,
    mood: "energetic",
    createdAt: "",
    updatedAt: "",
    icon: "users",
  },

  // Creative
  {
    id: "art-1",
    name: "Art Project",
    category: "creative",
    description: "Paint, draw, or craft something beautiful",
    duration: 120,
    mood: "relaxed",
    createdAt: "",
    updatedAt: "",
    icon: "palette",
  },
  {
    id: "photography-1",
    name: "Photography Walk",
    category: "creative",
    description: "Capture beautiful moments and scenes",
    duration: 90,
    mood: "adventurous",
    createdAt: "",
    updatedAt: "",
    icon: "palette",
  },
  {
    id: "writing-1",
    name: "Creative Writing",
    category: "creative",
    description: "Write stories, poems, or journal entries",
    duration: 60,
    mood: "relaxed",
    createdAt: "",
    updatedAt: "",
    icon: "palette",
  },
];

const CATEGORY_ICONS = {
  food: Coffee,
  outdoor: Mountain,
  entertainment: Film,
  wellness: Heart,
  social: Users,
  creative: Palette,
};

const CATEGORY_COLORS = {
  food: "bg-orange-100 text-orange-800 border-orange-200",
  outdoor: "bg-green-100 text-green-800 border-green-200",
  entertainment: "bg-purple-100 text-purple-800 border-purple-200",
  wellness: "bg-pink-100 text-pink-800 border-pink-200",
  social: "bg-blue-100 text-blue-800 border-blue-200",
  creative: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

const TIME_SLOT_HOURS = {
  morning: { start: "8:00 AM", end: "12:00 PM" },
  afternoon: { start: "12:00 PM", end: "6:00 PM" },
  evening: { start: "6:00 PM", end: "10:00 PM" },
};

const TIME_SLOTS = [
  { value: "morning", label: "Morning (8AM - 12PM)" },
  { value: "afternoon", label: "Afternoon (12PM - 6PM)" },
  { value: "evening", label: "Evening (6PM - 10PM)" },
];

const DAYS = [
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const CATEGORY_THEMES: { [key: string]: { border: string; bg: string; text: string; icon: string } } = {
  food: {
    border: "border-orange-500",
    bg: "bg-orange-100 dark:bg-neutral-900/80",
    text: "text-orange-800 dark:text-neutral-300",
    icon: "text-orange-500",
  },
  outdoor: {
    border: "border-emerald-500",
    bg: "bg-emerald-100 dark:bg-neutral-900/80",
    text: "text-emerald-800 dark:text-neutral-300",
    icon: "text-emerald-500",
  },
  entertainment: {
    border: "border-purple-500",
    bg: "bg-purple-100 dark:bg-neutral-900/80",
    text: "text-purple-800 dark:text-neutral-300",
    icon: "text-purple-500",
  },
  wellness: {
    border: "border-cyan-500",
    bg: "bg-cyan-100 dark:bg-neutral-900/80",
    text: "text-cyan-800 dark:text-neutral-300",
    icon: "text-cyan-500",
  },
  social: {
    border: "border-rose-500",
    bg: "bg-rose-100 dark:bg-neutral-900/80",
    text: "text-rose-800 dark:text-neutral-300",
    icon: "text-rose-500",
  },
  creative: {
    border: "border-indigo-500",
    bg: "bg-indigo-100 dark:bg-neutral-900/80",
    text: "text-indigo-800 dark:text-neutral-300",
    icon: "text-indigo-500",
  },
  default: {
    border: "border-neutral-400 dark:border-neutral-700",
    bg: "bg-neutral-100 dark:bg-neutral-800/80",
    text: "text-neutral-800 dark:text-neutral-300",
    icon: "text-neutral-500",
  },
};

export {
  ACTIVITY_DATA,
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  TIME_SLOT_HOURS,
  TIME_SLOTS,
  DAYS,
  CATEGORY_THEMES,
};
