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
    colors : {}
    updateCalendar : () => void
}

export const EventsContext = createContext(
    {} as EventsContextData
)


export function EventsProvider({ children }: EventsProviderProps) {
    const [events, setEvents] = useState<event[]>([])
    const [colors, setColors] = useState({})
    
    async function updateCalendar() {
        const response = await api.post<responseData>('/calendar')
    
        const { colorsEvents, calendarEvents } = response.data
    
        if(colorsEvents) {
          setColors({
            default: 'blue',
            ...colorsEvents
          })
        }
    
        if (calendarEvents.length) {
          setEvents(calendarEvents.map((item: responseData) => ({
            id: item.id,
            startAt: item.start.dateTime,
            endAt: item.end.dateTime,
            timezoneStartAt: item.start.timeZone,
            summary: item.summary,
            color: item.colorId ? colorsEvents[item.colorId].background : 'blue',
            ...item
          })))
        }
      }

    return (
        <EventsContext.Provider value={{ events, colors, updateCalendar }}>
            {children}
        </EventsContext.Provider>
    )
}

