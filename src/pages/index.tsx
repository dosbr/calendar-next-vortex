import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import styles from './home.module.scss';

import { EventsContext } from "../Context/EventsContext";

const Calendar = dynamic(
  () => import("../components/Calendar"),
  { ssr: false }
);

interface HomeProps {
  signIn: boolean;
}

export default function Home({ signIn } : HomeProps) {
  const router = useRouter()
  const { events, colors, updateCalendar } = useContext(EventsContext)

  useEffect(() => {
    if(signIn) {
      updateCalendar()
    }else {
      router.push('/signin')
    }
  }, [])

  return (
    <main className={styles.contentContainer} >
      <Calendar events={events} colors={Object.entries(colors)} updateCalendar={updateCalendar} /> 
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