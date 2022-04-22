import { Flex, Image } from '@chakra-ui/react';
import { useContext } from 'react';

import styles from './styles.module.scss';

import ButtonSearch from '../ButtonSearch';
import ButtonRefresh from '../ButtonRefresh';
import { SignInButton } from '../SignInButton';
import { EventsContext } from '../../Context/EventsContext';

type event = {
    id: string;
    startAt: string;
    endAt: string;
    timezoneStartAt: string;
    summary: string;
    color: string;
    [key: string]: any;
}

export function Header() {
    const { updateCalendar } = useContext(EventsContext)

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
                <ButtonSearch />
                <SignInButton />
                </Flex>
            </div>
        </div>
    )
}