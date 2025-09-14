import { useState } from "react";
import { Button } from "./ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConfirmDialog } from "./confirm-dialog";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    isOpen: { control: "boolean" },
    onClose: { action: "closed" },
    onConfirm: { action: "confirmed" },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Delete item?",
    description: "Are you sure you want to delete this item? This action cannot be undone.",
  },
};

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-center justify-center h-[300px] gap-4">
        <Button onClick={() => setOpen(true)}>Open Confirm Dialog</Button>
        <ConfirmDialog
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            args.onConfirm?.();
            setOpen(false);
          }}
        />
      </div>
    );
  },
  args: {
    title: "Are you sure?",
    description: "This will permanently delete your data.",
  },
};
