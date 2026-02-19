import React from "react";
import Table from "react-bootstrap/Table";
import { TiEdit } from "react-icons/ti";
import { MdOutlineDeleteForever } from "react-icons/md";

const EventList = ({ events }) => {
  const updateEvent = () => {
    console.log("trying updating the table");
  };

  const deleteEvent = () => {
    console.log("deleting the event");
  };

  return (
    <div className="event-list-container">
      <h2>Event List</h2>

      <Table responsive>
        <thead>
          <th>Event Name</th>
          <th>Time</th>
          <th>Location</th>
          <th>Category</th>
          <th>Description</th>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr>
              <td>{event.name}</td>
              <td>{event.event_date_time.toLocaleString()}</td>
              <td>{event.location}</td>
              <td>{event.category}</td>
              <td>{event.description}</td>
              <td onClick={updateEvent}>
                <TiEdit />
              </td>
              <td onClick={deleteEvent}>
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
