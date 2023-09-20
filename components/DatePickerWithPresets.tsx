"use client"

import { useEffect, useState } from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, X as XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TSetDueDateFunction = (date: Date | undefined) => void

type DatePickerWithPresetsProps = {
  setDueDate: TSetDueDateFunction
  existingDate?: Date
}

export function DatePickerWithPresets(props: DatePickerWithPresetsProps) {
  const [date, setDate] = useState<Date | undefined>(props.existingDate)

  const setDueDate = props.setDueDate

  const handleDateReset = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDate(undefined)
  }

  useEffect(() => {
    setDueDate(date)
  }, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-3">
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Selectionner une date</span>}
          </Button>
          <button onClick={handleDateReset}>
            <XIcon className="stroke-foreground"></XIcon>
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
