
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import axios from "axios";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const session = await getSession({ req })
        try {
            const response = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${new Date('03-01-2022').toISOString()}`, {
                headers: {'Authorization': `Bearer ${session.accessToken}`}
            })

            const responseColors = await axios.get(`https://www.googleapis.com/calendar/v3/colors`, {
                headers: {'Authorization': `Bearer ${session.accessToken}`}
            })
        
            return res.status(200).json({
                    colorsEvents: responseColors.data.event,
                    calendarEvents: response.data.items
                })
        }
        catch (error) {
            console.log(error.message)
        }

    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not Allowed')
    }
}