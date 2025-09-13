import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Download, Share2, Copy, Check, Calendar, Clock } from "lucide-react";
import type { ScheduledActivity } from "../../types/planTypes";

interface ExportDialogProps {
  activities: ScheduledActivity[];
  children: React.ReactNode;
}

export function ExportDialog({ activities, children }: ExportDialogProps) {
  const [copied, setCopied] = useState(false);

  const generateTextSummary = () => {
    if (activities.length === 0) {
      return "No weekend activities planned yet!";
    }

    const saturdayActivities = activities.filter((a) => a.day === "saturday");
    const sundayActivities = activities.filter((a) => a.day === "sunday");

    let summary = "🎉 My Weekend Plan\n\n";

    if (saturdayActivities.length > 0) {
      summary += "📅 SATURDAY\n";
      const timeSlots = ["morning", "afternoon", "evening"] as const;
      timeSlots.forEach((slot) => {
        const slotActivities = saturdayActivities.filter(
          (a) => a.timeSlot === slot
        );
        if (slotActivities.length > 0) {
          summary += `\n⏰ ${slot.toUpperCase()}\n`;
          slotActivities.forEach((activity) => {
            summary += `• ${activity.name}`;
            if (activity.duration) {
              summary += ` (${activity.duration}min)`;
            }
            summary += `\n`;
          });
        }
      });
    }

    if (sundayActivities.length > 0) {
      summary += "\n📅 SUNDAY\n";
      const timeSlots = ["morning", "afternoon", "evening"] as const;
      timeSlots.forEach((slot) => {
        const slotActivities = sundayActivities.filter(
          (a) => a.timeSlot === slot
        );
        if (slotActivities.length > 0) {
          summary += `\n⏰ ${slot.toUpperCase()}\n`;
          slotActivities.forEach((activity) => {
            summary += `• ${activity.name}`;
            if (activity.duration) {
              summary += ` (${activity.duration}min)`;
            }
            summary += `\n`;
          });
        }
      });
    }

    summary += "\n✨ Created with Weekendly";
    return summary;
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateTextSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const handleDownloadJSON = () => {
    const data = {
      weekendPlan: activities,
      exportedAt: new Date().toISOString(),
      totalActivities: activities.length,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `weekend-plan-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: "My Weekend Plan",
      text: generateTextSummary(),
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
        // Fallback to clipboard
        handleCopyToClipboard();
      }
    } else {
      // Fallback to clipboard
      handleCopyToClipboard();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Export Your Weekend Plan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-foreground">
              Preview
            </h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-foreground">
                      My Weekend Plan
                    </h4>
                  </div>

                  {activities.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      No activities planned yet!
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {["saturday", "sunday"].map((day) => {
                        const dayActivities = activities.filter(
                          (a) => a.day === day
                        );
                        if (dayActivities.length === 0) return null;

                        return (
                          <div key={day} className="space-y-2">
                            <h5 className="font-medium text-foreground capitalize flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {day}
                            </h5>
                            {["morning", "afternoon", "evening"].map((slot) => {
                              const slotActivities = dayActivities.filter(
                                (a) => a.timeSlot === slot
                              );
                              if (slotActivities.length === 0) return null;

                              return (
                                <div key={slot} className="ml-6 space-y-1">
                                  <h6 className="text-sm font-medium text-muted-foreground capitalize flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    {slot}
                                  </h6>
                                  <div className="ml-5 space-y-1">
                                    {slotActivities.map((activity) => (
                                      <div
                                        key={activity.id}
                                        className="flex items-center gap-2 text-sm"
                                      >
                                        <span>•</span>
                                        <span>{activity.name}</span>
                                        {activity.duration && (
                                          <Badge
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            {activity.duration}min
                                          </Badge>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
=
          <div>
            <h3 className="text-sm font-medium mb-3 text-foreground">
              Export Options
            </h3>
            <div className="grid gap-3">
              <Button
                onClick={handleShare}
                className="flex items-center gap-2 justify-start bg-transparent"
                variant="outline"
              >
                <Share2 className="h-4 w-4" />
                Share with Friends
              </Button>

              <Button
                onClick={handleCopyToClipboard}
                className="flex items-center gap-2 justify-start bg-transparent"
                variant="outline"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>

              <Button
                onClick={handleDownloadJSON}
                className="flex items-center gap-2 justify-start bg-transparent"
                variant="outline"
              >
                <Download className="h-4 w-4" />
                Download as JSON
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
