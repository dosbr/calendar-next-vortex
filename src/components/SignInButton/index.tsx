import { FaGoogle } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'

import styles from './styles.module.scss';

export function SignInButton() {
    const { data: session } = useSession()
    
    return session ? (
        <button 
            className={styles.signInButton} 
            type="button"
            onClick={() => signOut()}
        >
            <FaGoogle color="#04D361"/>
            {session.user.name}
            <FiX />
        </button>
    ) : (
        <button 
            className={styles.signInButton} 
            type="button"
            onClick={() => signIn('google')}
        >
            <FaGoogle color="#EDA417"/>
            Sign In with Google
        </button>
    )
        
}