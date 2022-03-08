import { SessionProvider } from "next-auth/react"
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
        <Header />
        <Component {...pageProps} />
    </SessionProvider>
    </>
  )
}

export default MyApp
