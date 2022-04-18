import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from '../components/Header'
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
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
    </SessionProvider>
    
    </>
  )
}

export default MyApp
