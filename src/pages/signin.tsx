import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react"

import styles from './home.module.scss';
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface HomeProps {
  signIn: boolean;
}

export default function SignIn({ signIn } : HomeProps) {
  const router = useRouter()
  useEffect(() => {
    if(signIn) {
      router.push("/")
    }
  }, [])

  return (
    <main>

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