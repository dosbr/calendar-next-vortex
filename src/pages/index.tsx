import dynamic from "next/dynamic";
import { useState } from "react";
import { api } from "../services/api"


import styles from './home.module.scss';

interface event {
  id:  string;
  start:{ string};
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
    {ssr: false}
  );


export default function Home() {
  const [events, setEvents] = useState<event>([])


  async function onEventClick (event) {
    const response = await api.post<responseData>('/calendar')
    console.log(event)
    console.log(response.data)



    if(response.data.length) {
      setEvents(response.data.map((item : responseData) => ({
        id: item.id,
        startAt:item.start.dateTime,
        endAt: item.end.dateTime,
        timezoneStartAt: item.start.timeZone,
        summary: item.summary,
        color: 'blue',
        ...item
      })))
    }
  }

  return (
    <main className={styles.contentContainer} >
      <button type="button" onClick={onEventClick}>Click</button>
      <Calendar events={events} />
    </main>
  )
}
