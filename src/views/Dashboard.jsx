import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import axiosClient from "../axios-client";

const Calendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axiosClient.get("/appointmentsData").then(({ data }) => {
            setEvents(data);
        });
    }, []);

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView="dayGridMonth"
            events={events}
        />
    );
};

export default Calendar;
