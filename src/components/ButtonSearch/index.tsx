import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, FormLabel, HStack, Icon, Input, Tag, TagCloseButton, TagLabel, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { RiSearchLine } from "react-icons/ri"

export default function ButtonSearch() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const [searchList, setSearchList] = useState([])
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setSEndDate] = useState('')
    const [startHour, setStartHour] = useState('')
    const [endHour, setEndHour] = useState('')
    const [attendees, setAttendees] = useState([])

    function handleSearch() {

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
                        <FormLabel>Titulo</FormLabel>
                        <Input placeholder='Titulo' defaultValue={title} size='lg' onChange={(event) => setTitle(event.target.value)} />
                        <Flex as='label' mb={0} mt={6}>Inicio</Flex>
                        <Flex justifyContent={'space-between'}>
                            <Input type={'date'} defaultValue={startDate} size='lg' 
                                onChange={(event) => setStartDate(event.target.value)} />
                            <Input type={'time'} defaultValue={startHour} placeholder='large size' size='lg' ml={2} 
                                onChange={(event) => setStartHour(event.target.value)} />
                        </Flex>
                        <Flex as='label' mb={0} mt={6}>Final</Flex>
                        <Flex justifyContent={'space-between'}>
                            <Input type={'date'} defaultValue={endDate} size='lg' 
                                onChange={(event) => setSEndDate(event.target.value)} />
                            <Input type={'time'} defaultValue={endHour} placeholder='large size' size='lg' ml={2} 
                                onChange={(event) => setEndHour(event.target.value)} />
                        </Flex>
                        <FormLabel mb={0} mt={6}>Participantes</FormLabel>
                        <Flex>
                            <Input placeholder='E-mail' size='lg' />
                            <Button size='lg' ml={2}  >Adicionar</Button>
                        </Flex>
                        <HStack spacing={4} mt={6}>
                            <Wrap>
                                {attendees.map((attendeer) => (
                                    <WrapItem key={attendeer.email}>
                                        <Tag size='lg' borderRadius='full' variant='solid' colorScheme='green'>
                                            <TagLabel>{attendeer.email}</TagLabel>
                                            <TagCloseButton />
                                        </Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </HStack>
                        <Button mt={10} colorScheme='blue' onClick={handleSearch}>Buscar</Button>
                    </Flex>
                    <Flex ml={10} mt={10} direction='column' alignItems='center' w='100%'>
                    </Flex>
                </Flex>
            </DrawerBody>
            </DrawerContent>
            </Drawer>
        </>
    )
}