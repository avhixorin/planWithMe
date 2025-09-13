import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Clock, Trash2 } from "lucide-react"
import type { ScheduledActivity } from "../../types/planTypes"
import { CATEGORY_ICONS, TIME_SLOT_HOURS } from "../constants/activity"

interface TimelineViewProps {
  activities: ScheduledActivity[]
  onActivityRemove: (activityId: string) => void
}

export function TimelineView({ activities, onActivityRemove }: TimelineViewProps) {
  const sortedActivities = [...activities].sort((a, b) => {
    if (a.day !== b.day) {
      return a.day === "saturday" ? -1 : 1
    }
    const timeOrder = { morning: 0, afternoon: 1, evening: 2 }
    return timeOrder[a.timeSlot] - timeOrder[b.timeSlot]
  })

  const saturdayActivities = sortedActivities.filter((a) => a.day === "saturday")
  const sundayActivities = sortedActivities.filter((a) => a.day === "sunday")

  const renderDayTimeline = (dayActivities: ScheduledActivity[], day: "saturday" | "sunday") => {
    const timeSlots = ["morning", "afternoon", "evening"] as const

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
          <h3 className="text-xl font-semibold text-foreground capitalize">{day}</h3>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border"></div>

          {timeSlots.map((timeSlot, index) => {
            const slotActivities = dayActivities.filter((a) => a.timeSlot === timeSlot)
            const timeInfo = TIME_SLOT_HOURS[timeSlot]

            return (
              <div
                key={timeSlot}
                className="relative mb-8 animate-slide-in"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-primary border-4 border-background shadow-lg ring-2 ring-primary/20"></div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground capitalize">{timeSlot}</span>
                    <span className="text-xs text-muted-foreground">
                      {timeInfo.start} - {timeInfo.end}
                    </span>
                  </div>
                </div>

                <div className="ml-7 space-y-3">
                  {slotActivities.length === 0 ? (
                    <div className="p-4 border-2 border-dashed border-border rounded-lg transition-all duration-300 hover:border-primary/50">
                      <p className="text-sm text-muted-foreground text-center">No activities planned</p>
                    </div>
                  ) : (
                    slotActivities.map((activity, activityIndex) => {
                      const IconComponent = CATEGORY_ICONS[activity.category]
                      return (
                        <Card
                          key={activity.id}
                          className="bg-card/80 hover:bg-card transition-all duration-300 group hover:shadow-lg transform hover:-translate-y-1"
                          style={{
                            animationDelay: `${index * 200 + activityIndex * 100}ms`,
                            animationFillMode: "both",
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors duration-300">
                                  <IconComponent className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                    {activity.name}
                                  </h4>
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {activity.description}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className="text-xs transition-all duration-300">
                                      {activity.category}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {activity.mood}
                                    </Badge>
                                    {activity.duration && (
                                      <span className="text-xs text-muted-foreground">{activity.duration}min</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onActivityRemove(activity.id)}
                                className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-muted-foreground hover:text-destructive hover:scale-110"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardContent className="p-8 text-center">
          <div className="animate-bounce">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No timeline to show</h3>
          <p className="text-muted-foreground">Add some activities to see your weekend timeline!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-12">
      {saturdayActivities.length > 0 && renderDayTimeline(saturdayActivities, "saturday")}
      {sundayActivities.length > 0 && renderDayTimeline(sundayActivities, "sunday")}
    </div>
  )
}
