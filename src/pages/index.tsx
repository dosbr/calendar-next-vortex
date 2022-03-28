import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react"
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { api } from "./services/api"


import styles from './home.module.scss';

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


const Calendar = dynamic(
  () => import("../components/Calendar"),
  { ssr: false }
);

interface HomeProps {
  signIn: boolean;
}


export default function Home({ signIn } : HomeProps) {
  const [events, setEvents] = useState<event[]>([])
  const [colors, setColors] = useState({})

  async function updateCalendar() {
    const response = await api.post<responseData>('/calendar')

    const { colorsEvents, calendarEvents } = response.data
    console.log(response.data)
    console.log(colorsEvents)

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



  useEffect(() => {
    if(signIn) {
      updateCalendar()
    }
  }, [])

  return (
    <main className={styles.contentContainer} >
      { signIn ? <Calendar events={events} colors={Object.entries(colors)} updateCalendar={updateCalendar} /> : <h1>Login Required</h1>}
    </main>
  )
}

export const getServerSideProps : GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  let signIn = false

  if(session){
    signIn = true
  }
  
  return {
    props: {
      signIn,
    }
  }
}