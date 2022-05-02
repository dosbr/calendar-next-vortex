
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import axios from "axios";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const session = await getSession({ req })
            const calendarEvents = []
            
            const calendarList = await axios.get(`https://www.googleapis.com/calendar/v3/users/me/calendarList`, {
                headers: {'Authorization': `Bearer ${session.accessToken}`}
            })
            
            for(let calendar of calendarList.data.items) {
                try {
                    const response = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events?timeMin=${new Date('03-01-2022').toISOString()}`, {
                    headers: {'Authorization': `Bearer ${session.accessToken}`}
                    })
                    console.log(response.status)
                    if(response.status === 200) {
                        calendarEvents.push({
                            ...calendar,
                            events: [...response.data.items]
                        })
                    }
                }catch (err) {
                    console.log(`Falha no request id: ${calendar.id} | status: ${err.response.status}`)
                }     

            }

            return res.status(200).json({
                    calendarEvents
                })

    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not Allowed')
    }
}