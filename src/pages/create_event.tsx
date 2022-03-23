import { GetServerSideProps } from "next"
import FromEvent from "../components/FormEvent"

export default function CreateEvent() {
  return (
    <main className="" >
      <FromEvent method="create" data={null} />
    </main>
  )
}


export const getServerSideProps : GetServerSideProps = async ({ req, res }) => {
  console.log(req, res)

  return {
    props: {}
  }
}