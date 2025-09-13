import { addDays, format, startOfWeek } from "date-fns";
import {
  BookOpen,
  Coffee,
  Film,
  PartyPopper,
  Tent,
  type LucideProps,
} from "lucide-react";
import React from "react";
import { v4 as uuid } from "uuid";

const getWeekendDates = (dateString: string) => {
  // FIX: Create a new Date object from the incoming string
  const date = new Date(dateString);

  // Ensure the date is valid before proceeding
  if (isNaN(date.getTime())) {
    console.error(
      "Invalid date string provided to getWeekendDates:",
      dateString
    );
    const today = new Date();
    return {
      saturday: format(startOfWeek(today, { weekStartsOn: 6 }), "MMMM d"),
      sunday: format(
        addDays(startOfWeek(today, { weekStartsOn: 6 }), 1),
        "MMMM d"
      ),
    };
  }

  const saturday = startOfWeek(date, { weekStartsOn: 6 });
  const sunday = addDays(saturday, 1);

  return {
    saturday: format(saturday, "MMMM d"),
    sunday: format(sunday, "MMMM d"),
  };
};

const getIcon = (iconName: string, props?: LucideProps): React.ReactElement => {
  switch (iconName) {
    case "FaMugHot":
      return <Coffee {...props} />;
    case "FaTree":
      return <Tent {...props} />;
    case "FaFilm":
      return <Film {...props} />;
    case "FaBookOpen":
      return <BookOpen {...props} />;
    default:
      return <PartyPopper {...props} />;
  }
};

export const getMoodDetails = (mood: string) => {
  let image = "";
  let music = "";

  switch (mood) {
    case "happy":
      image =
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
      music = "https://www.youtube.com/watch?v=ZbZSe6N_BXs"; // Happy - Pharrell Williams
      break;
    case "relaxed":
      image =
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
      music = "https://www.youtube.com/watch?v=2OEL4P1Rz04"; // Weightless - Marconi Union
      break;
    case "adventurous":
      image =
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
      music = "https://www.youtube.com/watch?v=JGwWNGJdvx8"; // Shape of You - Ed Sheeran
      break;
    default:
      image =
        "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
      music = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Never Gonna Give You Up - Rick Astley
      break;
  }
  return { image, music };
};
const getNextSixWeekends = (): { startDate: string; endDate: string }[] => {
  const weekends: { id: string; startDate: string; endDate: string }[] = [];
  const today = new Date();

  const daysUntilSaturday = (6 - today.getDay() + 7) % 7;
  const currentSaturday = new Date(today);
  currentSaturday.setDate(today.getDate() + daysUntilSaturday);

  for (let i = 0; i < 6; i++) {
    const saturday = new Date(currentSaturday);
    const sunday = new Date(currentSaturday);
    sunday.setDate(saturday.getDate() + 1);

    weekends.push({
      id: uuid(),
      startDate: saturday.toISOString(),
      endDate: sunday.toISOString(),
    });

    currentSaturday.setDate(currentSaturday.getDate() + 7);
  }

  return weekends;
};

const formatWeekend = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const formattedStart = start.toLocaleDateString("en-GB", options);
  const formattedEnd = end.toLocaleDateString("en-GB", options);
  return `${formattedStart} - ${formattedEnd}`;
};

export { getWeekendDates, getIcon, getNextSixWeekends, formatWeekend };
