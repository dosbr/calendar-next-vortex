import { Flex, Image } from '@chakra-ui/react';
import { useContext } from 'react';

import styles from './styles.module.scss';

import ButtonSearch from '../ButtonSearch';
import ButtonRefresh from '../ButtonRefresh';
import { SignInButton } from '../SignInButton';
import { EventsContext } from '../../Context/EventsContext';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';



export function Header() {
    const { updateCalendar, events } = useContext(EventsContext)
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src="/imagens/logo.png" alt="jm.consultoria" w="150px" />
                <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="flex-end"
                >
                <ButtonRefresh fn={updateCalendar} />
                <ButtonSearch  events={events} />
                <SignInButton />
                </Flex>
            </div>
        </div>
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