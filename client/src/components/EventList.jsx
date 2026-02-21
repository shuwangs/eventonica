import React from "react";
import Table from "react-bootstrap/Table";
import { TiEdit } from "react-icons/ti";
import { MdOutlineDeleteForever } from "react-icons/md";

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
                <td>{event.event_date_time}</td>
                <td>{event.location}</td>
                <td>{event.category}</td>
                <td>{event.description}</td>
                <td onClick={onEdit}>
                  <TiEdit />
                </td>
                <td onClick={() => onDelete(event.id)}>
                  <MdOutlineDeleteForever />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EventList;
