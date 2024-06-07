"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils/ui";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../layout/popover";
import { Button } from "../basic/button";
import { Calendar } from "../utility/calendar";

export function DatePicker({
  date,
  onDateSelect: onDateChange,
}: {
  date?: Date;
  onDateSelect?: (date: Date | undefined) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    if (date) setSelectedDate(date);
  }, [date, setSelectedDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange || setSelectedDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export function DatePickerWithRange({
  date,
  onDateSelect: onDateChange,
}: {
  date?: DateRange;
  onDateSelect?: (date: DateRange | undefined) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  useEffect(() => {
    if (date) setSelectedDate(date);
  }, [date, setSelectedDate]);

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate?.from ? (
              selectedDate.to ? (
                <>
                  {format(selectedDate.from, "LLL dd, y")} -{" "}
                  {format(selectedDate.to, "LLL dd, y")}
                </>
              ) : (
                format(selectedDate.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={selectedDate}
            onSelect={onDateChange || setSelectedDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

DatePicker.displayName = "DatePicker";
