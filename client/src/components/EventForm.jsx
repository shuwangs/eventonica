import React, { useState, useEffect } from "react";
import userFrom from "../hooks/useForm";


const EventForm = ({ eventOnSubmit }) => {
    const [event, handleOnChange, resetForm] = userFrom({
        name: "",
        event_date_time: "",
        location: "",
        descriptions: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        eventOnSubmit(event);
        resetForm();
    }
    

    return (
        <Form>
            <label htmlFor="event-name">Event Name</label>
            <input type="text" id="event-name" name="name" value={event.name} onChange={handleOnChange} required />

            <label htmlFor="event-date-time">Event Date and Time</label>
            <input type="datetime-local" id="event-date-time" name="event_date_time" value={event.event_date_time} onChange={handleOnChange} required />

            <label htmlFor="event-location">Event Location</label>
            <input type="text" id="event-location" name="location" value={event.location} onChange={handleOnChange} required />

            <label htmlFor="event-descriptions">Event Descriptions</label>
            <textarea id="event-descriptions" name="descriptions" value={event.descriptions} onChange={handleOnChange} required></textarea>

            <button type="submit">Add Event</button>

        </Form>
    )
}

export default EventForm;