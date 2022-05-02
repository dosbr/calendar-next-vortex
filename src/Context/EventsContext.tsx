import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../pages/services/api";

interface EventsProviderProps {
    children: ReactNode;
}

interface event {
    id: string;
    start: { string };
    endAt: string;
    timezoneStartAt: string;
    summary: string;
    color: string;
    [key: string]: any;
}
  
interface responseData {
    id: string,
    start: {
      dateTime: string,
      timeZone: string
    }
    end: {
      dateTime: string,
      timeZone: string
    }
    summary: string,
    [key: string]: any;
}

interface EventsContextData {
    events : event[];
    updateCalendar : () => void
}

export const EventsContext = createContext(
    {} as EventsContextData
)


export function EventsProvider({ children }: EventsProviderProps) {
    const [events, setEvents] = useState<event[]>([])
    
    async function updateCalendar() {
        const response = await api.post<responseData>('/calendar')
        
        const { calendarEvents } = response.data

        if (calendarEvents.length) {
          const response = []
          for (let calendar of calendarEvents) {
            response.push(...calendar.events.map((item: responseData) => ({
              id: item.id,
              calendarSummary: calendar.primary ? "Meu Calendario" : calendar.summary,
              calendarId: calendar.id,
              startAt: item.start.dateTime,
              endAt: item.end.dateTime,
              timezoneStartAt: item.start.timeZone,
              summary: item.summary,
              color: calendar.backgroundColor,
              attachments: item.attatchments || [],
              ...item
            })))
          }
          console.log(response)
          setEvents(response)
          }   
      }

    return (
        <EventsContext.Provider value={{ events, updateCalendar }}>
            {children}
        </EventsContext.Provider>
    )
}

