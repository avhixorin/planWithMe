import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Trash2, Clock, Calendar, GripVertical } from "lucide-react";
import type { Activity, ScheduledActivity } from "../../types/planTypes";
import { DAYS, TIME_SLOTS } from "../constants/activity";

interface WeekendScheduleProps {
  day: "saturday" | "sunday";
  activities: ScheduledActivity[];
  onActivityRemove: (activityId: string) => void;
  onActivityUpdate: (activity: ScheduledActivity) => void;
  onActivityAdd?: (
    activity: Activity,
    day: "saturday" | "sunday",
    timeSlot: "morning" | "afternoon" | "evening"
  ) => void;
}

export function WeekendSchedule({
  day,
  activities,
  onActivityRemove,
  onActivityUpdate,
  onActivityAdd,
}: WeekendScheduleProps) {
  const [draggedActivity, setDraggedActivity] = useState<string | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<{
    day: string;
    timeSlot: string;
  } | null>(null);
  const [recentlyMoved, setRecentlyMoved] = useState<string | null>(null);

  const saturdayActivities = activities.filter((a) => a.day === "saturday");
  const sundayActivities = activities.filter((a) => a.day === "sunday");

  const handleDragStart = (e: React.DragEvent, activity: ScheduledActivity) => {
    setDraggedActivity(activity.id);
    e.dataTransfer.setData("application/json", JSON.stringify(activity));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedActivity(null);
    setDragOverSlot(null);
  };

  const handleDragOver = (
    e: React.DragEvent,
    day: "saturday" | "sunday",
    timeSlot: "morning" | "afternoon" | "evening"
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverSlot({ day, timeSlot });
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverSlot(null);
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    day: "saturday" | "sunday",
    timeSlot: "morning" | "afternoon" | "evening"
  ) => {
    e.preventDefault();
    setDragOverSlot(null);

    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));

      if (data.day && data.timeSlot) {
        const scheduledActivity = data as ScheduledActivity;
        if (
          scheduledActivity.day !== day ||
          scheduledActivity.timeSlot !== timeSlot
        ) {
          setRecentlyMoved(scheduledActivity.id);
          onActivityUpdate({ ...scheduledActivity, day, timeSlot });

          setTimeout(() => {
            setRecentlyMoved(null);
          }, 1000);
        }
      } else {
        const activity = data as Activity;
        if (onActivityAdd) {
          onActivityAdd(activity, day, timeSlot);
        }
      }
    } catch (error) {
      console.error("Failed to parse dropped data:", error);
    }
  };

  const renderDaySchedule = (
    dayActivities: ScheduledActivity[],
    day: "saturday" | "sunday"
  ) => {
    const morningActivities = dayActivities.filter(
      (a) => a.timeSlot === "morning"
    );
    const afternoonActivities = dayActivities.filter(
      (a) => a.timeSlot === "afternoon"
    );
    const eveningActivities = dayActivities.filter(
      (a) => a.timeSlot === "evening"
    );

    const renderTimeSlot = (
      slotActivities: ScheduledActivity[],
      slot: "morning" | "afternoon" | "evening"
    ) => {
      const isDropTarget =
        dragOverSlot?.day === day && dragOverSlot?.timeSlot === slot;

      return (
        <div
          className={`space-y-2 transition-all duration-300 ${
            isDropTarget
              ? "bg-primary/10 rounded-lg p-2 ring-2 ring-primary/20"
              : ""
          }`}
          onDragOver={(e) => handleDragOver(e, day, slot)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, day, slot)}
        >
          <h4 className="text-sm font-medium text-muted-foreground capitalize flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {slot}
          </h4>
          {slotActivities.length === 0 ? (
            <div
              className={`p-4 border-2 border-dashed border-border rounded-lg text-center transition-all duration-300 ${
                isDropTarget
                  ? "border-primary bg-primary/5 scale-105"
                  : "hover:border-primary/50"
              }`}
            >
              <p className="text-sm text-muted-foreground">
                {isDropTarget ? "Drop activity here" : "No activities planned"}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {slotActivities.map((activity, index) => {
                const isDragging = draggedActivity === activity.id;
                const isRecentlyMoved = recentlyMoved === activity.id;
                return (
                  <Card
                    key={activity.id}
                    className={`bg-card/50 cursor-move transition-all duration-300 group hover:shadow-md transform hover:-translate-y-0.5 ${
                      isDragging ? "opacity-50 scale-95" : ""
                    } ${
                      isRecentlyMoved ? "ring-2 ring-primary animate-pulse" : ""
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, activity)}
                    onDragEnd={handleDragEnd}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                              {activity.name}
                            </h5>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                variant="outline"
                                className="text-xs transition-all duration-200"
                              >
                                {activity.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {activity.mood}
                              </Badge>
                              {activity.duration && (
                                <span className="text-xs text-muted-foreground">
                                  {activity.duration}min
                                </span>
                              )}
                            </div>
                            <div className="flex max-sm:flex-col-reverse max-sm:items-start items-center gap-2 mt-2">
                              <Select
                                value={activity.day}
                                onValueChange={(value: "saturday" | "sunday") =>
                                  onActivityUpdate({ ...activity, day: value })
                                }
                              >
                                <SelectTrigger className="h-7 text-xs transition-all duration-200 hover:border-primary">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {DAYS.map((day) => (
                                    <SelectItem
                                      key={day.value}
                                      value={day.value}
                                    >
                                      {day.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select
                                value={activity.timeSlot}
                                onValueChange={(
                                  value: "morning" | "afternoon" | "evening"
                                ) =>
                                  onActivityUpdate({
                                    ...activity,
                                    timeSlot: value,
                                  })
                                }
                              >
                                <SelectTrigger className="h-7 text-xs transition-all duration-200 hover:border-primary">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {TIME_SLOTS.map((slot) => (
                                    <SelectItem
                                      key={slot.value}
                                      value={slot.value}
                                    >
                                      {slot.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onActivityRemove(activity.id)}
                          className="ml-2 h-7 w-7 p-0 text-muted-foreground hover:text-destructive transition-all duration-200 hover:scale-110 cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      );
    };

    return (
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {day === "saturday" ? "Saturday" : "Sunday"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderTimeSlot(morningActivities, "morning")}
          {renderTimeSlot(afternoonActivities, "afternoon")}
          {renderTimeSlot(eveningActivities, "evening")}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-4">
        {day === "saturday"
          ? renderDaySchedule(saturdayActivities, "saturday")
          : renderDaySchedule(sundayActivities, "sunday")}
      </div>
    </div>
  );
}
