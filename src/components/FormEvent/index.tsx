import { FormEvent, useState } from 'react';
import { api } from '../../pages/services/api';


import styles from './styles.module.scss';

interface FormEventProps {
    method: 'create' | 'update',
    data: any [] | null
}

function FromEvent({ method, data } : FormEventProps) {

    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endHour, setEndHour] = useState('');


    const handleCreateNewEvent = async (event: FormEvent) => {
        event.preventDefault();
        console.log({
            summary,
            description,
            startDate,
            startHour,
            endDate,
            endHour
        })
        
        switch(method) {
            case 'create':
        // await api.post('/event', {
        //     summary,
        //     description,
        //     start : { dateTime: '2022-03-22T13:00:00-03:00', timeZone: 'America/Sao_Paulo' } ,
        //     end : { dateTime: '2022-03-22T15:00:00-03:00', timeZone: 'America/Sao_Paulo' } ,
        //     attendees: [{ email: 'mfpaivati@gmail.com', responseStatus: 'needsAction'}]
        // })
            break;
            case 'update':
             // await api.put('/event', {
            //     summary,
            //     description,
            //     start : { dateTime: '2022-03-22T13:00:00-03:00', timeZone: 'America/Sao_Paulo' } ,
            //     end : { dateTime: '2022-03-22T15:00:00-03:00', timeZone: 'America/Sao_Paulo' } ,
            //     attendees: [{ email: 'mfpaivati@gmail.com', responseStatus: 'needsAction'}]
            // })
            default:
                break
        }
      
    }

    return (
        <main>
            <form className={styles.container} onSubmit={handleCreateNewEvent}>
                <h2>Cadastrar Evento</h2>
                <input
                    placeholder="Título"
                    value={summary}
                    onChange={(event) => setSummary(event.target.value)}
                />
                <textarea                   
                    placeholder="Descrição"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <h2>Inicio</h2>
                <div className={styles.TransactionTypeContainer}>
                  
                    <input
                        type="date"
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                    <input 
                        type="time"
                        onChange={(event) => setStartHour(event.target.value)}
                    />
                </div>

                <h2>Fim</h2>
                <div className={styles.TransactionTypeContainer}>
                  
                    <input
                        type="date"
                        onChange={(event) => setEndDate(event.target.value)}
                    />
                    <input 
                        type="time"
                        onChange={(event) => setEndHour(event.target.value)}
                    />
                </div>
                <button
                    type="submit"
                >
                    Cadastrar
                </button>
            </form>
        </main>

    )
}

export default FromEvent;