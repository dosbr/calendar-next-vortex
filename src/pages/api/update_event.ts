
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import axios from "axios";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const session = await getSession({ req })
        try {
            console.log(req.body)
            const response = await axios.put(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, req.body, {
                headers: { 'Authorization': `Bearer ${session.accessToken}` },
            })

            return res.status(200).json(response.data.items)
        }
        catch (error) {
            console.log(error.message)
        }

    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not Allowed')
    }
}