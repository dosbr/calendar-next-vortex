import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, FormLabel,  Icon,  Select,  useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { RiSearchLine } from "react-icons/ri"
import { api } from "../../pages/services/api"


interface ButtonSearchProps {
    events: any []
}

export default function ButtonSearch({events} : ButtonSearchProps)  {
    const {handleSubmit, register} = useForm()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const [searchList, setSearchList] = useState([])
    const [option, setOption] = useState('')

    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setSEndDate] = useState('')
    const [startHour, setStartHour] = useState('')
    const [endHour, setEndHour] = useState('')
    const [attendees, setAttendees] = useState([])

    async function handleSearch(data) {
        const response = await api.get(`/event?calendarId=${data.calendarId}`)
        console.log(response)
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
            size='xl'
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
                    <Flex ml={10} mt={10} direction='column' alignItems='center' w='100%'>
                        <Accordion w="100%" defaultIndex={[0]} allowMultiple>
                            {
                                searchList.map(item => (
                                    <AccordionItem key={item.id} mt={6} >
                                        <h2>
                                        <AccordionButton>
                                            <Box flex='1' textAlign='left'>
                                            {item.summary}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))
                            }
                        </Accordion>    
                    </Flex>
                </Flex>
            </DrawerBody>
            </DrawerContent>
            </Drawer>
        </>
    )
}