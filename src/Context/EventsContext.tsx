import { createContext, ReactNode, useEffect, useState } from "react";
import { format } from 'date-fns'
import { api } from "../pages/services/api";
import Router from "next/router";
import { signOut } from "next-auth/react";

interface EventsProviderProps {
  children: ReactNode;
}

interface event {
  id: string;
  start: {};
  endAt: string;
  timezoneStartAt: string;
  summary: string;
  color: string;
  [key: string]: any;
}

interface responseData {
  id: string,
  start: {
    dateTime?: string,
    date?: string,
    timeZone?: string
  }
  end: {
    dateTime?: string,
    date?: string,
    timeZone?: string
  }
  summary: string,
  [key: string]: any;
}

interface EventsContextData {
  events: event[];
  updateCalendar: () => void
}

export const EventsContext = createContext(
  {} as EventsContextData
)


export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<event[]>([])

  async function updateCalendar() {
    try {
      const response = await api.post<responseData>('/calendar')

      const { calendarEvents } = response.data

      if (calendarEvents.length) {
        const response = []

        for (let calendar of calendarEvents) {

          response.push(...calendar.events.map((item: responseData) => ({
            id: item.id,
            calendarSummary: calendar.primary ? "Meu Calendario" : calendar.summary,
            calendarId: calendar.id,
            startAt: item.start?.dateTime || item.start?.date,
            endAt: item.end?.dateTime || item.end?.date,
            timezoneStartAt: item.start?.timeZone || 'America/Sao_Paulo',
            summary: item.summary,
            color: calendar.backgroundColor,
            attachments: item.attatchments || [],
            ...item
          })))
        }

        console.log(response.map(({ startAt }) => {
          if (startAt) {
            console.log(format(new Date(startAt), "yyyy-MM-dd'T'kk:mm:ssxxx"))
          }
        }))
        setEvents(response)
      }
    } catch {
      signOut()
    }

  }

  return (
    <EventsContext.Provider value={{ events, updateCalendar }}>
      {children}
    </EventsContext.Provider>
  )
}

