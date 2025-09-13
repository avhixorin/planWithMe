const MOODS = {
  HAPPY: "Happy",
  SAD: "Sad",
  EXCITED: "Excited",
  ANGRY: "Angry",
  RELAXED: "Relaxed",
  ANXIOUS: "Anxious",
} as const;

export const moods = [...Object.values(MOODS)];

export const moodThemeMap = {
  [MOODS.HAPPY]: "light",
  [MOODS.SAD]: "dark",
  [MOODS.EXCITED]: "bumblebee",
  [MOODS.ANGRY]: "retro",
  [MOODS.RELAXED]: "caramellatte",
  [MOODS.ANXIOUS]: "synthwave",
} as const;

export type MOODSType = (typeof MOODS)[keyof typeof MOODS];
export default MOODS;
