import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' //For month view
import timeGridPlugin from '@fullcalendar/timegrid' //For week and day views
import { useEffect, useState } from 'react';


const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

export function CalendarView() {

    const [trainings, setTrainings] = useState([]);

    //Events will be shown in the calendar. Events has attribures title, start end 
    const [events, setEvents] = useState([{
        title: "",
        start: "",
        end: ""
    }]);

    //Fetch training data and save it to trainings variable
    useEffect(() => {
        fetch(`${BASE_URL}/gettrainings`)
            .then(response => response.json())
            .then(data => { setTrainings(data) }) //Asetetaan kaikki trainingsit trainings muuttujaan
            .catch(error => console.log(error))
    }, [])

    //If trainings change aka. if there is a new fetch for trainings, use map to collect needed values from trainings in to event variable
    useEffect(() => {
        const trainingEvents = trainings.map((training: any) => {
            return {
                title: training.activity + ' / ' + training.customer.firstname + ' ' + training.customer.lastname,
                start: training.date,
                end: new Date(new Date(training.date).getTime() + training.duration * 60000).toISOString()
            }
        })
        setEvents(trainingEvents);
    }, [trainings]);


    return (
        <div>
            <h1>Training calendar</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView='dayGridMonth'
                events={events} //Defines what events are seen in calendar
                headerToolbar={{ //Add header with view buttons and title (date or month)
                    start: 'dayGridMonth,timeGridWeek,timeGridDay', //Defines which views are possible
                    center: 'title',
                    end: 'prev,next'
                }}
                eventContent={renderEventContent}
            />
        </div>
    )
}

// a custom render function
function renderEventContent(eventInfo: any) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}