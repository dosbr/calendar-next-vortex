import { Button, Icon } from "@chakra-ui/react"
import { RiRefreshLine } from "react-icons/ri"

interface buttonRefreshProps {
    fn : () => void;
}

export default function ButtonRefresh({ fn } : buttonRefreshProps) {
    return <Button bgColor="#1f2729" h={50} borderRadius='full' onClick={() => { fn() }} >
                <Icon as={RiRefreshLine} color="gray.50" alignSelf="center" />
            </Button>
}