import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from '../components/Header'
import '../styles/global.scss'
import 'kalend/dist/styles/index.css';
import { EventsContext, EventsProvider } from "../Context/EventsContext";


function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps} 
}) {

  return (
    <>   
    <SessionProvider session={session}>
      <ChakraProvider>
        <EventsProvider>
          <Header />
          <Component {...pageProps} />
        </EventsProvider>
        </ChakraProvider>
    </SessionProvider>
    </>
  )
}

export default MyApp
