"use client"

import React from "react"
import { format, isToday } from "date-fns"
import { fr } from "date-fns/locale"

export default function DateFormater({ date }: { date: Date | undefined | null }) {
    if (!date) {
      return <div data-testid="date-output">Pas de date définie</div>;
    }
  
    
    const currentDateStr = format(new Date(), "yyyy-MM-dd");
    const dateStr = format(date, "yyyy-MM-dd");
  
    if (dateStr < currentDateStr) {
      return (
        <div data-testid="date-output" className="text-sm text-destructive">
          En retard : {format(date, "dd  LLLL yyyy", { locale: fr })}
        </div>
      );
    }
  
    if (dateStr === currentDateStr) {
      return <div data-testid="date-output" className="text-sm text-mcePrimary">Aujourd'hui</div>;
    }
  
    return <div data-testid="date-output" className="text-sm ">{format(date, "dd  LLLL yyyy", { locale: fr })}</div>;
  }
  