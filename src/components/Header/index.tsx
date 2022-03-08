import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';


export function Header () {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                
                <nav>
                    <a className={styles.active}>Home</a>
                </nav>
                <SignInButton />
            </div>
        </div>
    )
}

//<img src="/images/logo.svg" alt="ig.news"></img>