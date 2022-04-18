import styles from './styles.module.scss';
import ptBR from '../../util/pt-BR.json';
import Kalend, { CalendarEvent, CalendarView, OnPageChangeData, OnSelectViewData } from 'kalend';
import { useRouter } from 'next/router';
import { background, Button, Container, Flex, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tag, TagCloseButton, TagLabel, Textarea, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { api } from '../../pages/services/api';

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
  colors: any[]
  updateCalendar: () => void;
}

export default function Calendar({ events, colors, updateCalendar }: CalendarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setSEndDate] = useState('')
  const [startHour, setStartHour] = useState('')
  const [endHour, setEndHour] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [attendees, setAttendees] = useState([])
  const [status, setStatus] = useState(false)
  const [modifyDate, setModifyDate] = useState(false)


  const onNewEventClick = (data: OnNewEventClickData) => {
    const date = data.day.toISOString().split('T')[0]
    const startHour = data.hour.toString().split('.')[0]
    const startHourFormatted = startHour.length === 2 ? `${startHour}:00:00` : `0${startHour}:00:00`
    console.log(startHourFormatted)
    setTitle('')
    setDescription('')
    setStartDate(date);
    setSEndDate(date);
    setStartHour(startHourFormatted);
    setAttendees([])
    setStatus(true)
    setModifyDate(true)

    onOpen()
  };



  const onEventClick = (data: event) => {
    console.log({
      color: data.color,
      creator: data.creator,
      endAt: data.endAt,
      eventType: data.eventType,
      id: data.id,
      organizer: data.organizer,
      reminders: data.reminders,
      sequence: data.sequence,
      startAt: data.startAt,
      status: data.status,
      summary: data.summary,
      description: data.description,
      attendees: data.attendees
    })

    const [startDate, startHour] = data.startAt.split('T')
    const [endtDate, endHour] = data.endAt.split('T')

    setId(data.id)
    setTitle(data.summary)
    setDescription(data.description)
    setModifyDate(false)
    setStartDate(startDate);
    setSEndDate(endtDate);
    setStartHour(startHour.split('-')[0])
    setEndHour(endHour.split('-')[0])
    setOrganizer(data.organizer.email)
    setStatus(false)

    if (data.attendees) {
      console.log(data.attendees)
      setAttendees([...data.attendees])
    } else {
      setAttendees([])
    }
    console.log('chamei')
    onOpen()
  };
  const onSelectView = (view: OnSelectViewData) => {
    console.log(view)

  }
  const onPageChange = (data: OnPageChangeData) => {
    console.log(data)
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
    console.log({
      end: `${endDate}T${endHour}-03:00`,
      organizer,
      start: `${startDate}T${startHour}-03:00`,
      summary: title,
      description,
      attendees
    })
    try {
      let event: updateEvent = {
        id,
        summary: title,
        description,
        attendees
      }

      if (modifyDate) {
        event = {
          ...event,
          start: { dateTime: `${startDate}T${startHour}:00-03:00`, timeZone: 'America/Sao_Paulo' },
          end: { dateTime: `${endDate}T${endHour}:00-03:00`, timeZone: 'America/Sao_Paulo' },
        }
      }

      await api.put('/event', event)

      onClose()
      updateCalendar()

    } catch (error) {
      console.log(error)
    }
  }
  const handleCreateNewEvent = async () => {
    await api.post('/event', {
      summary: title,
      description,
      start: { dateTime: `${startDate}T${startHour}:00-03:00`, timeZone: 'America/Sao_Paulo' },
      end: { dateTime: `${endDate}T${endHour}:00-03:00`, timeZone: 'America/Sao_Paulo' },
      attendees
    })

    onClose()
    updateCalendar()
  }

  const handleEditDate = () => {
    setModifyDate(true)
  }

  useEffect(() => {
    const hourNumber = Number(startHour.split(':')[0]) + 1
    const hourFormatted = hourNumber < 10 ?`0${hourNumber}:00:00` : `${hourNumber}:00:00`
    setEndHour(hourFormatted)
  }, [startHour])

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
            <FormLabel>Titulo</FormLabel>
            <Input placeholder='Titulo' defaultValue={title} size='lg' onChange={(event) => setTitle(event.target.value)} />
            <FormLabel mt={6} >Descrição</FormLabel >
            <Textarea placeholder='Descrição' defaultValue={description} size='lg' onChange={(event) => setDescription(event.target.value)} />
            {
              modifyDate
                ? <>
                  <FormLabel mb={0} mt={6}>Inicio</FormLabel>
                  <Flex justifyContent={'space-between'}
                  >
                    <Input type={'date'} defaultValue={startDate} size='lg' onChange={(event) => setStartDate(event.target.value)} />
                    <Input type={'time'} defaultValue={startHour} placeholder='large size' size='lg' ml={2} onChange={(event) => setStartHour(event.target.value)} />
                  </Flex>
                  <FormLabel mb={0} mt={6}>Final</FormLabel>
                  <Flex justifyContent={'space-between'}>
                    <Input type={'date'} defaultValue={endDate} size='lg' onChange={(event) => setSEndDate(event.target.value)} />
                    <Input type={'time'} defaultValue={endHour} placeholder='large size' size='lg' ml={2} onChange={(event) => setEndHour(event.target.value)} />
                  </Flex>
                </>
                : <>
                  <Container p={0} onClick={handleEditDate}>
                    <FormLabel mb={0} mt={6}>Inicio</FormLabel>
                    <Flex justifyContent={'space-between'}>
                      <Input disabled type={'date'} defaultValue={startDate} size='lg' onChange={(event) => setStartDate(event.target.value)} />
                      <Input disabled type={'time'} defaultValue={startHour} placeholder='large size' size='lg' ml={2} onChange={(event) => setStartHour(event.target.value)} />
                    </Flex>
                    <FormLabel mb={0} mt={6}>Final</FormLabel>
                    <Flex justifyContent={'space-between'}>
                      <Input disabled type={'date'} defaultValue={endDate} size='lg' onChange={(event) => setSEndDate(event.target.value)} />
                      <Input disabled type={'time'} defaultValue={endHour} placeholder='large size' size='lg' ml={2} onChange={(event) => setEndHour(event.target.value)} />
                    </Flex>
                  </Container>
                </>}


            <FormLabel mb={0} mt={6}>Organizador</FormLabel>
            <Input disabled defaultValue={organizer} size='lg' onChange={(event) => setOrganizer(event.target.value)} />
            <FormLabel mb={0} mt={6}>Participantes</FormLabel>
            <Flex>
              <Input placeholder='E-mail' size='lg' />
              <Button size='lg' ml={2} onClick={handleAddAttendees} >Adicionar</Button>
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

          </ModalBody>
          <ModalFooter mt={6}>
            {status
              ? <Button colorScheme='red' size='lg' onClick={handleCreateNewEvent}>Create</Button>
              : <Button colorScheme='red' size='lg' onClick={handleUpdateEvent}>Update</Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

