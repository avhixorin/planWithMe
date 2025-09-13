import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from './theme-switcher';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A simple button to toggle between light and dark themes.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightMode: Story = {
  args: {},
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="dark bg-slate-900 p-4 rounded-lg">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};