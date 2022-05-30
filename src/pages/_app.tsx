import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
import { EventsProvider } from "../Context/EventsContext";

import '../styles/global.scss'
import 'kalend/dist/styles/index.css';

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps} 
}) {

  return (
    <>   
    <SessionProvider session={session}>
      <ChakraProvider>
        <EventsProvider>
          <Component {...pageProps} />
        </EventsProvider>
        </ChakraProvider>
    </SessionProvider>
    </>
  )
}

export default MyApp
