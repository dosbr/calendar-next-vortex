import { Flex, Image } from '@chakra-ui/react';
import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

import ButtonSearch from '../ButtonSearch';

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
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src="/imagens/logo.png" alt="jm.consultoria" w="150px" />
                <Flex
                    w="100%"
                    maxWidth="630"
                    justifyContent="center"
                >
                <ButtonSearch />
                </Flex>
                <SignInButton />
            </div>
        </div>
    )
}