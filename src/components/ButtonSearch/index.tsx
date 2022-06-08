import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, FormLabel,  Icon,  Select,  useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { RiSearchLine } from "react-icons/ri"
import api from "../../services/api"


interface ButtonSearchProps {
    events: any []
}

export default function ButtonSearch({events} : ButtonSearchProps)  {
    const {handleSubmit, register} = useForm()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const [searchList, setSearchList] = useState([])

    async function handleSearch(data) {
        const response = await api.get(`/event?calendarId=${data.calendarId}`)
        if(response.status === 200) {
            setSearchList(response.data)
        }
    }
    
    return (
        <>
            <Button bgColor="#1f2729"
                h={50}
                borderRadius='full'
                ref={btnRef}
                onClick={onOpen}
            >
                <Icon
                    as={RiSearchLine}
                    color="gray.50"
                    alignSelf="center"
                />
            </Button>
            
            <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
            size='md'
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                    <Flex p={5} mt={5} h='100%'>
                    <Flex direction='column' w='100%' mt={10}>
                        <form onSubmit={handleSubmit(handleSearch)}>
                        <FormLabel>Cliente</FormLabel>
                        <Select {...register('calendarId')} size='lg'>
                            <option value='all'>Todos</option>
                            {events.reduce((acc, item) => {
                               const e = acc.find(e => e.calendarId === item.calendarId)
                               if(!e){
                                   acc.push({
                                    calendarId : item.calendarId,
                                    calendarSummary: item.calendarSummary,
                                   })
                               }
                               return acc 
                            } , []).map(item => (<option key={item.calendarId} value={item.calendarId}>{item.calendarSummary}</option>))}
                        </Select>
                        <Button type='submit' mt={10} colorScheme='blue' >Buscar</Button>
                        </form>
                    </Flex>
                  
                </Flex>
            </DrawerBody>
            </DrawerContent>
            </Drawer>
        </>
    )
}