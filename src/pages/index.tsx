import { api } from "../services/api"

import styles from './home.module.scss';
import { Calendar } from "../components/Calendar";

export default function Home() {
  async function onEventClick (event) {
    const response = await api.post('/calendar')
    console.log(event)
    console.log(response.data)
  }



  return (
    <main className={styles.contentContainer} >
      <button type="button" onClick={onEventClick} >Click</button>
      <Calendar />
    </main>
  )
}
