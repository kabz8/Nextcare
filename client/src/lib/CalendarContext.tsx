import { createContext, useContext, useState, ReactNode } from "react";

interface CalendarContextType {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <CalendarContext.Provider value={{
      currentDate,
      setCurrentDate,
      selectedDate,
      setSelectedDate,
    }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
