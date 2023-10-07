import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "app/@/lib/utils";
import { Button } from "app/@/components/ui/button";
import { Calendar } from "app/@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "app/@/components/ui/popover";
import { useRevalidator, useSearchParams } from "@remix-run/react";

export function DatePicker({ title }: { title: string }) {
  const [date, setDate] = useState<Date>();
  const [searchParams, setSearchParams] = useSearchParams();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (date) {
      const params = new URLSearchParams(searchParams);
      params.set(
        `${title.toLowerCase()}date`,
        date?.toISOString().split("T")[0],
      );
      setSearchParams(params);
      revalidator.revalidate();
    }
  }, [date]);

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
          {date ? format(date, "PPP") : <span>{title}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
