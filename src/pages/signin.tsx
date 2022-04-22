import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react"

import styles from './home.module.scss';
import { Box, Container } from "@chakra-ui/react";
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
        <Container w="100vw" m="0" padding="0">
            <Box
              m="0"
              p="0"
              w="99vw"
              h="100%"
              opacity='0.5' 
              bgImage="./imagens/banner.jpg"
              bgRepeat="no-repeat"
              bgSize="cover"
              >
            </Box>
          </Container>
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