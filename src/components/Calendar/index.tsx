import styles from './styles.module.scss';
import ptBR from '../../util/pt-BR.json'; 
import Kalend, { CalendarEvent, CalendarView, OnPageChangeData, OnSelectViewData } from 'kalend';
import { useRouter } from 'next/router';

type event = {
  id:  string;
  startAt: string;
  endAt: string;
  timezoneStartAt: string;
  summary: string;
  color: string;
  [key: string]: any;
}

type OnNewEventClickData = {
  event: CalendarEvent;
  day: Date;
  hour: number;
}


interface CalendarProps {
   events : any []
}



export default function Calendar ({ events } : CalendarProps) {
      const router = useRouter()

      
     const onNewEventClick = (data: OnNewEventClickData) => {
       console.log(data)
     };  

     const onEventClick = (data: event) => {
       console.log({
        color: data.color,
        creator: data.creator,
        endAt: data.endAt,
        eventType: data.eventType,
        id: data.id,
        organizer: data.organizer,
        reminders: data.reminders,
        sequence: data.sequence,
        startAt: data.startAt,
        status: data.status,
        summary: data.summary,
       })
       router.push({
         pathname: '/create_event',
       })
     };
     const onSelectView = (view: OnSelectViewData) => {
       console.log(view)

     }
     const onPageChange = (data: OnPageChangeData) => {
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
              customLanguage={ptBR}
          />
        </div>
    )
}

