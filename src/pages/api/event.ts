
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import axios from "axios";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    if (req.method === 'POST') {
        
        try {
            console.log(req.body)
            const response = await axios.post(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, req.body, {
                headers: { 'Authorization': `Bearer ${session.accessToken}` },
            })
            session.events = response.data.items
            return res.status(200).json(response.data.items)
        }
        catch (error) {
            console.log(error.message)
        }

    } else if (req.method === 'PUT') {
        try {
            const response = await axios.put(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${req.body.id}`, req.body, {
                headers: { 'Authorization': `Bearer ${session.accessToken}` },
            })
            session.events = response.data.items
            return res.status(200).json(response.data.items)
        }
        catch (error) {
            console.log(error.message)
        }

    } else if (req.method === 'DELETE') {
        try {
            const {id} = req.query
            const response = await axios.delete(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`, {
                headers: { 'Authorization': `Bearer ${session.accessToken}` },
            })
            session.events = response.data.items
            return res.status(200).json(response.data.items)
        }
        catch (error) {
            console.log(error.message)
        }

    } 
    else {
        res.status(405).end('Method not Allowed')
    }
}