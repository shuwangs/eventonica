import React from 'react';

const EventList = ({ events }) => {

    return (
        <div className="event-list-container">
            <h2>Event List</h2>
            <ul className="event-list">
                {events.map((event) => (
                    <li key={event.id} className="event-item">
                        <h3>{event.name}</h3>
                        <p><strong>Date and Time:</strong> {new Date(event.event_date_time).toLocaleString()}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Category:</strong> {event.category}</p>
                        <p><strong>Description:</strong> {event.descriptions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;