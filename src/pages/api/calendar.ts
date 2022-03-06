
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import axios from "axios";


export default async (req : NextApiRequest, res :NextApiResponse ) => {
    if(req.method === 'POST') {
        const session = await getSession({ req })
        
       const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events',     {
            headers: {'Authorization': `Bearer ${session.accessToken}`}
       })

        return res.status(200).json(response.data.items)
    }else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not Allowed')
    }
}