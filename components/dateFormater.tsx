import React from "react";
import { format, isPast, isToday } from "date-fns";
import { fr } from "date-fns/locale";

export default function DateFormater({ date, done }: { date: Date | undefined | null, done: boolean }) {
  
  let baseclass = "text-sm";


  // Guard clausing
  const getDisplayData = () => {
    if (!date) return { content: "Pas de date définie", style: "" };

    if (done && isToday(date)) {
      return {
        content: "Aujourd'hui",
        style: baseclass + " text-muted-foreground line-through",
      };
    }

    if (done) {
      return {
        content: format(date, "dd LLLL yyyy", { locale: fr }),
        style: baseclass + " text-muted-foreground line-through",
      };
    }

    if (isToday(date)) {
      return {
        content: "Aujourd'hui",
        style: baseclass + " text-mcePrimary",
      };
    }

    if (isPast(date)) {
      return {
        content: "En retard " + format(date, "dd LLLL yyyy", { locale: fr }),
        style: baseclass + " text-destructive",
      };
    }

    return {
      content: format(date, "dd LLLL yyyy", { locale: fr }),
      style: baseclass,
    };
  };

  const { content, style } = getDisplayData();

  return (
    <div data-testid="date-output" className={style}>
      {content}
    </div>
  );
}