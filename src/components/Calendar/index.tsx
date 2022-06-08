import styles from './styles.module.scss';
import ptBR from '../../util/pt-BR.json';
import Kalend, { CalendarEvent, CalendarView, OnPageChangeData, OnSelectViewData } from 'kalend';
import { RiDeleteBinLine, RiAttachmentLine } from "react-icons/ri"

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, 
  AlertDialogOverlay, Button, Container, Flex, FormControl, FormLabel, HStack, Icon, Input, Link, 
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tag, TagCloseButton, TagLabel, 
  Textarea, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';

  import { useEffect, useRef, useState } from 'react';
import { api } from '../../pages/services/api';
import DateHourInput from '../DateHourInput';
import { addHours, format } from 'date-fns';

type event = {
  id: string;
  startAt: string;
  endAt: string;
  timezoneStartAt: string;
  summary: string;
  color: string;
  [key: string]: any;
}

type updateEvent = {
  id: string;
  start?: { dateTime: string, timeZone: string };
  end?: { dateTime: string, timeZone: string };
  summary: string;
  color?: string;
  [key: string]: any;
}

type OnNewEventClickData = {
  event: CalendarEvent;
  day: Date;
  hour: number;
}

interface CalendarProps {
  events: any[]
  updateCalendar: () => void;
}

export default function Calendar({ events, updateCalendar }: CalendarProps) {
  const cancelRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [id, setId] = useState('')
  const [calendarId, setCalendarId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setSEndDate] = useState('')
  const [startHour, setStartHour] = useState('')
  const [endHour, setEndHour] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [attendees, setAttendees] = useState([])
  const [attachments, setAttachments] = useState([])
  const [status, setStatus] = useState(false)
  const [modifyDate, setModifyDate] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)


  const onNewEventClick = (data: OnNewEventClickData) => {
    const date = format(data.day, "yyyy-MM-dd")
    const startHour = Math.floor(data.hour)
    const endHour = Math.floor(data.hour) + 1
  
    const startHourFormatted = startHour >= 10 ? `${startHour}:00` : `0${startHour}:00`
    const endHourFormatted = endHour >= 10 ? `${endHour}:00` : `0${endHour}:00`

    setTitle('');
    setCalendarId('');
    setId('');
    setDescription('')
    setStartDate(date);
    setSEndDate(date);
    setStartHour(startHourFormatted);
    setEndHour(endHourFormatted);
    setAttendees([]);
    setAttachments([]);
    setStatus(true);
    setModifyDate(true);
    setOrganizer('');
    onOpen();
  };


  const onEventClick = (data: event) => {

    const [startDate, startHour] = data.startAt.split('T')
    const [endtDate, endHour] = data.endAt.split('T')

    setId(data.id)
    setCalendarId(data.calendarId)
    setTitle(data.summary)
    setDescription(data.description)
    setModifyDate(false);
    setStartDate(startDate);
    setSEndDate(endtDate);
    setStartHour(startHour.split('-')[0])
    setEndHour(endHour.split('-')[0])
    setOrganizer(data.organizer.email)
    setAttachments([...data.attachments])
    setStatus(false)

    if (data.attendees) {
      setAttendees([...data.attendees])
    } else {
      setAttendees([])
    }
    onOpen()
  };
  const onSelectView = (view: OnSelectViewData) => {

  }
  
  const onPageChange = (data: OnPageChangeData) => {

  }

  const handleAddAttendees = (event) => {
    const value = event.target.previousSibling.value
    setAttendees([...attendees, {
      email: value,
      responseStatus: 'needsAction'
    }])
    event.target.previousSibling.value = ''
  }

  const handleRemoveAttendees = (event) => {
    const email = event.target.parentNode.parentNode.textContent
    setAttendees(attendees.filter(element => element.email !== email))
  }

  const handleUpdateEvent = async () => {
      await api.put('/event', {
        id,
        summary: title,
        description,
        start: { dateTime: `${startDate}T${startHour}-03:00`, timeZone: 'America/Sao_Paulo' },
        end: { dateTime: `${endDate}T${endHour}-03:00`, timeZone: 'America/Sao_Paulo' },
        attendees
      })
      onClose()
      updateCalendar()
  }

  const handleDeleteEvent = async () => {
      await api.delete(`/event?id=${id}&calendarId=${calendarId}`)
      setAlertOpen(false)
      onClose()
      updateCalendar()
  }

  const handleCreateNewEvent = async () => {
    await api.post('/event', {
      summary: title,
      description,
      start: { dateTime: startHour.length > 5 ? `${startDate}T${startHour}-03:00` : `${startDate}T${startHour}:00-03:00`, timeZone: 'America/Sao_Paulo' },
      end: { dateTime: endHour.length > 5 ? `${endDate}T${endHour}-03:00` : `${endDate}T${endHour}:00-03:00`, timeZone: 'America/Sao_Paulo' },
      attendees
    })

    onClose()
    updateCalendar()
  }

  const handleEditDate = () => {
    setModifyDate(true)
  }

  function handleAlertClick () {
    setAlertOpen(true)
  }

  function handleClickAlertCancel () {
    setAlertOpen(false)
  }

  return (
    <div className={styles.calendar_container}>
      <Kalend
        onEventClick={onEventClick}
        onNewEventClick={onNewEventClick}
        events={events}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        onSelectView={onSelectView}
        onPageChange={onPageChange}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        customLanguage={ptBR}
      />

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay /> 
        <ModalContent>
          <ModalHeader>Evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <form>
          <FormControl>
            <FormLabel>Titulo</FormLabel>
            <Input placeholder='Titulo' defaultValue={title} size='lg' onChange={(event) => setTitle(event.target.value)} />
            <FormLabel mt={6} >Descrição</FormLabel >
            <Textarea placeholder='Descrição' defaultValue={description} size='lg' onChange={(event) => setDescription(event.target.value)} />
            {
              modifyDate
                ? <>
                    <DateHourInput label={"Inicio"} date={startDate} hour={startHour} setDate={setStartDate} setHour={setStartHour} />
                    <DateHourInput label={"Final"} date={endDate} hour={endHour} setDate={setSEndDate} setHour={setEndHour} />
                  </>
                : <>
                  <Container p={0} onClick={handleEditDate}>
                    <DateHourInput label={"Inicio"} date={startDate} hour={startHour} setDate={setStartDate} setHour={setStartHour} />
                    <DateHourInput label={"Final"} date={endDate} hour={endHour} setDate={setSEndDate} setHour={setEndHour} />
                  </Container>
                </>}

            <FormLabel mb={0} mt={6}>Organizador</FormLabel>
            <Input disabled defaultValue={organizer} size='lg' onChange={(event) => setOrganizer(event.target.value)} />
            
            {
              attachments.length 
                ? <>
                    <FormLabel mb={0} mt={3}>Anexo</FormLabel>
                    <Link href={attachments[0].fileUrl} isExternal cursor='pointer' >
                      <Icon mt={3} as={RiAttachmentLine} color="#3182CE" fontSize={25} />
                    </Link> 
                  </> 
                : <></>
            }
            
            <FormLabel mb={0} mt={6}>Participantes</FormLabel>
            <Flex>
              <Input placeholder='E-mail' size='lg' />
              <Button size='lg' ml={2} onClick={handleAddAttendees}>Adicionar</Button>
            </Flex>
            <HStack spacing={4} mt={6}>
              <Wrap>
                {attendees.map((attendeer) => (
                  <WrapItem key={attendeer.email}>
                    <Tag
                      size='lg'
                      borderRadius='full'
                      variant='solid'
                      colorScheme='green'
                    >
                      <TagLabel>{attendeer.email}</TagLabel>
                      <TagCloseButton onClick={(handleRemoveAttendees)} />
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </HStack>
            {status
              ? <Button colorScheme='blue' mt={3} mb={6} size='lg' onClick={handleCreateNewEvent}>Create</Button>
              : <>
                  <Button ref={cancelRef} mt={3} mb={6} colorScheme='red' size='lg' mr={2} onClick={handleAlertClick} >
                    <Icon as={RiDeleteBinLine} />
                  </Button>
                  <Button colorScheme='blue' mt={3} mb={6} size='lg' onClick={handleUpdateEvent}>Update</Button>
                </>
            }
          </FormControl>
          </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {<AlertDialog
        isOpen={alertOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClickAlertCancel}
      >
        <AlertDialogOverlay>
          <AlertDialogHeader>Deletar evento</AlertDialogHeader>
          <AlertDialogContent>
            <AlertDialogBody>
              Deseja excluir o evento ?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleClickAlertCancel}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={handleDeleteEvent} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>}
    </div>
  )
}

