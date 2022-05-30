
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const session = await getSession({ req })
        const promisesCalendar = []
        const calendarEvents = []

        const calendarList = await axios.get(`https://www.googleapis.com/calendar/v3/users/me/calendarList`, {
            headers: { 'Authorization': `Bearer ${session.accessToken}` }
        })

        for (let calendar of calendarList.data.items) {
            promisesCalendar.push(axios.get(`https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events`, { //?timeMin=${new Date('03-01-2022').toISOString()}
                headers: { 'Authorization': `Bearer ${session.accessToken}` }
            }))
        }

        const response = await Promise.allSettled(promisesCalendar)

        for (let item of response) {
            if (item.status === 'fulfilled') {
                const calendar = calendarList.data.items.find(calendar => calendar.id === item.value.config.url.split('/')[6])
                calendarEvents.push({
                    ...calendar,
                    events: [...item.value.data.items]
                })

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