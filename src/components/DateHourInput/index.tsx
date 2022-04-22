import { Flex, FormLabel, Input } from "@chakra-ui/react";

interface DateHourProps {
    label: string;
    date: string;
    hour: string;
    setDate: (e : string) => void;
    setHour: (e: string) => void;
}

export default function DateHourInput({ label, date, hour, setDate, setHour }: DateHourProps) {
    return (
        <>
            <FormLabel mb={0} mt={6}>{label}</FormLabel>
                <Flex justifyContent={'space-between'}>
                    <Input type={'date'} defaultValue={date} size='lg' onChange={(event) => setDate(event.target.value)} />
                    <Input type={'time'} defaultValue={hour} placeholder='large size' size='lg' ml={2} onChange={(event) => setHour(event.target.value)} />
                  </Flex>
        </>
    )
}