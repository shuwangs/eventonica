import React from "react";
import Table from "react-bootstrap/Table";
import { TiEdit } from "react-icons/ti";
import { MdOutlineDeleteForever } from "react-icons/md";
import "./EventForm.css";

const EventList = ({ events, onDelete, onEdit }) => {
  console.log(events);
  return (
    <div className="event-list-container">
      <h2>Event List</h2>

      <Table responsive>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Time</th>
            <th>Location</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((event) => (
              <tr>
                <td>{event.name}</td>
                <td>{new Date(event.event_date_time).toLocaleString()}</td>
                <td>{event.location}</td>
                <td>{event.category}</td>
                <td>{event.description}</td>
                <td>
                  <button
                    className="icon-btn edit"
                    onClick={() => onEdit(event)}
                    title="Edit event"
                  >
                    <TiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button
                    className="icon-btn delete"
                    onClick={() => onDelete(event.id)}
                    title="Delete event"
                  >
                    <MdOutlineDeleteForever size={18} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EventList;
