import styles from './styles.module.scss';
import { useRef, useState } from 'react';
import Kalend, { CalendarEvent, CalendarView, OnPageChangeData, OnSelectViewData } from 'kalend';

interface event {
  id:  string;
  startAt: string;
  endAt: string;
  timezoneStartAt: string;
  summary: string;
  color: string;
  [key: string]: any;
}

interface CalendarProps {
   events : event []
}


export default function Calendar ({ events } : CalendarProps) {
   
    type OnNewEventClickData = {
        event: CalendarEvent;
        day: Date;
        hour: number;
      }
      
      type OnEventClickData = {
        startAt: string;
        endAt: string;
        timezoneStartAt?: string;
        timezoneEndAt?: string;
        summary: string;
        color: string;
        [key: string]: any;
      }


      
     const onNewEventClick = (data: OnNewEventClickData) => {
       console.log(data)
     };  

     const onEventClick = (data: OnEventClickData) => {
       console.log(data)
     };
     const onSelectView = (view: OnSelectViewData) => {
       console.log(view)
     }
     const onPageChange = (data: OnPageChangeData) => {
       // do something
       console.log(data)
     }


    return (
        <div className={styles.calendar_container}>
            <Kalend
              onEventClick={onEventClick}
              onNewEventClick={onNewEventClick}
              events={events}
              initialDate={new Date().toISOString()}
              hourHeight={60}
              initialView={CalendarView.WEEK}
              onSelectView={onSelectView}
              onPageChange={onPageChange}
              timeFormat={'24'}
              weekDayStart={'Monday'}
              calendarIDsHidden={['work']}
              language={'en'}
          />
        </div>
    )
}

