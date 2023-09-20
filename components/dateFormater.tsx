import React from "react";
import { format, isPast, isToday } from "date-fns";
import { fr } from "date-fns/locale";

export default function DateFormater({ date, done }: { date: Date | undefined | null, done: boolean }) {
  
  // Function to determine style and content
  const getDisplayData = () => {
    if (!date) return { content: "Pas de date définie", style: "" };

    // Check if the task is done first to account for all scenarios related to "done"
    if (done) {
      let content = format(date, "dd LLLL yyyy", { locale: fr });
      if (isToday(date)) {
        content = "Aujourd'hui";
      }
      return {
        content,
        style: "text-sm text-muted-foreground line-through",
      };
    }

    if (isToday(date)) {
      return {
        content: "Aujourd'hui",
        style: "text-sm text-mcePrimary",
      };
    }

    if (isPast(date)) {
      return {
        content: "En retard " + format(date, "dd LLLL yyyy", { locale: fr }),
        style: "text-sm text-destructive",
      };
    }

    return {
      content: format(date, "dd LLLL yyyy", { locale: fr }),
      style: "text-sm",
    };
  };

  const { content, style } = getDisplayData();

  return (
    <div data-testid="date-output" className={style}>
      {content}
    </div>
  );
}