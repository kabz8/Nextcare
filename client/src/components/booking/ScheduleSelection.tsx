import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, parse, addMonths, subMonths, isValid } from "date-fns";
import { Calendar as CalendarIcon, ChevronUp, ChevronDown, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CardContent } from "@/components/ui/card";
import { TimeSlot } from "@shared/schema";
import { BookingData } from "@/pages/booking";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ScheduleSelectionProps {
  bookingData: BookingData;
  onScheduleSelect: (date: string, time: string) => void;
  onBack: () => void;
}

export default function ScheduleSelection({ bookingData, onScheduleSelect, onBack }: ScheduleSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    bookingData.appointmentDate ? 
      parse(bookingData.appointmentDate, "yyyy-MM-dd", new Date()) : 
      undefined
  );
  const [selectedTime, setSelectedTime] = useState<string>(bookingData.appointmentTime || "");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Format date for API request
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  
  // Fetch available time slots for selected date
  const { data: timeSlots, isLoading: timeSlotsLoading } = useQuery<TimeSlot[]>({
    queryKey: ['/api/time-slots', formattedDate],
    enabled: !!formattedDate,
  });
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time when date changes
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleNextClick = () => {
    if (selectedDate && selectedTime) {
      onScheduleSelect(format(selectedDate, "yyyy-MM-dd"), selectedTime);
    }
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <CardContent className="px-6 py-8">
      {bookingData.serviceName && (
        <div className="border-b border-neutral-200 pb-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-lg text-primary">{bookingData.serviceName}</h4>
              <p className="text-sm text-neutral-700">{bookingData.serviceDescription}</p>
            </div>
            <Button variant="outline" size="sm" className="text-primary" onClick={onBack}>
              Change
            </Button>
          </div>
        </div>
      )}
      
      <h3 className="text-2xl font-bold mb-6">When would you like to come in?</h3>
      <p className="mb-6">Select the day and time that you want to schedule your appointment.</p>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "MMMM yyyy") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  defaultMonth={currentMonth}
                  onMonthChange={setCurrentMonth}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {selectedDate && (
          <>
            <Alert variant="warning" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                These open appointments are in a different time zone: MDT
              </AlertDescription>
            </Alert>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">
                Available Times for {format(selectedDate, "EEEE, MMM dd, yyyy")}
              </h4>
              {timeSlotsLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-10 bg-neutral-100 animate-pulse rounded-md"></div>
                  ))}
                </div>
              ) : timeSlots && timeSlots.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      className="text-sm"
                      disabled={!slot.available}
                      onClick={() => handleTimeSelect(slot.time)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500">No available time slots for this date. Please select another date.</p>
              )}
            </div>
          </>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={handleNextClick}
          disabled={!selectedDate || !selectedTime}
        >
          Next
        </Button>
      </div>
    </CardContent>
  );
}
