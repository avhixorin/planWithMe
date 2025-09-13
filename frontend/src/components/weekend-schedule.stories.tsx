import { fn } from 'storybook/internal/test';
import { WeekendSchedule } from './weekend-schedule';
import type { Meta, StoryObj } from '@storybook/react-vite';
import MOODS from '../../types/moodTypes';

const sampleActivities = [
    { id: '1', day: 'saturday' as const, timeSlot: 'morning' as const, name: 'Morning Coffee', description: 'Enjoy a warm cup of coffee.', category: 'food' as const, mood: MOODS.RELAXED, icon: 'FaMugHot', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', day: 'saturday' as const, timeSlot: 'afternoon' as const, name: 'Mountain Hike', description: 'Explore scenic trails.', category: 'outdoor' as const, mood: MOODS.EXCITED, icon: 'FaTree', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const meta = {
  title: 'Components/WeekendSchedule',
  component: WeekendSchedule,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onActivityRemove: fn(),
    onActivityUpdate: fn(),
    onActivityAdd: fn(),
  },
} satisfies Meta<typeof WeekendSchedule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SaturdayWithActivities: Story = {
  args: {
    day: 'saturday',
    activities: sampleActivities.filter(a => a.day === 'saturday'),
  },
};

export const SundayWithActivities: Story = {
  args: {
    day: 'sunday',
    activities: [
        { id: '3', day: 'sunday', timeSlot: 'evening', name: 'Movie Night', description: 'Watch a classic film.', category: 'entertainment', mood: MOODS.RELAXED, icon: 'FaFilm', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ],
  },
};

export const EmptySaturday: Story = {
  args: {
    day: "sunday",
    activities: [],
  },
};