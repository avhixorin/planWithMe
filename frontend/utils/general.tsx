import {
  BookOpen,
  Coffee,
  Film,
  PartyPopper,
  Tent,
  type LucideProps,
} from "lucide-react";
import React from "react";

export const getWeekendDates = (date: Date) => {
  const dayOfWeek = date.getDay();
  const current = new Date(date);

  let saturday: Date;
  let sunday: Date;

  if (dayOfWeek === 6) {
    saturday = current;
    sunday = new Date(current);
    sunday.setDate(current.getDate() + 1);
  } else if (dayOfWeek === 0) {
    sunday = current;
    saturday = new Date(current);
    saturday.setDate(current.getDate() - 1);
  } else {
    saturday = new Date(current);
    saturday.setDate(current.getDate() + (6 - dayOfWeek));
    sunday = new Date(saturday);
    sunday.setDate(saturday.getDate() + 1);
  }

  const formatDate = (d: Date) =>
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
    }).format(d);

  return {
    saturday: formatDate(saturday),
    sunday: formatDate(sunday),
  };
};

export const getIcon = (
  iconName: string,
  props?: LucideProps
): React.ReactElement => {
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
