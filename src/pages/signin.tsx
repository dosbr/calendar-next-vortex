import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"

import { Flex, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SignInButton } from "../components/SignInButton";

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
    <Flex 
      justify="center"
      alignItems="center"
      w="100vw"
      h="100vh"
      bg="var(--gray-800)"
    >
      <Flex flexDirection="column"  alignItems="center" >
        <Image src="/imagens/logo.png" alt="jm.consultoria" w="150px" mb="5rem" />
        <SignInButton />
      </Flex>
    </Flex>
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