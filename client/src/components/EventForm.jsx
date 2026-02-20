import React, { useState, useEffect } from "react";
import userFrom from "../hooks/useForm";
import Form from "react-bootstrap/Form";

const EventForm = ({ eventOnSubmit }) => {
  const [event, handleOnChange, resetForm] = userFrom({
    name: "",
    event_date_time: "",
    location: "",
    category: "",
    descriptions: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    eventOnSubmit(event);
    resetForm();
  };

  return (
    <div className="event-form-container">
      <Form className="event-form" onSubmit={handleSubmit}>
        <label htmlFor="event-name">Event Name*</label>
        <input
          className="input-style"
          type="text"
          id="event-name"
          name="name"
          value={event.name}
          onChange={handleOnChange}
          required
        />

        <label htmlFor="event-date-time"> Date and Time*</label>
        <input
          type="datetime-local"
          id="event-date-time"
          name="event_date_time"
          value={event.event_date_time}
          onChange={handleOnChange}
          required
        />

        <label htmlFor="event-location"> Location* </label>
        <input
          className="input-style"
          type="text"
          id="event-location"
          name="location"
          value={event.location}
          onChange={handleOnChange}
          required
        />

        <label htmlFor="event-category"> Category*</label>
        <input
          className="input-style"
          type="text"
          id="event-category"
          name="category" 
          value={event.category}
          onChange={handleOnChange}
          required
        />

        <label htmlFor="event-descriptions"> Description*</label>
        <textarea
          className="input-style"
          id="event-descriptions"
          name="descriptions"
          value={event.descriptions}
          onChange={handleOnChange}
          required
        ></textarea>

        <button type="submit" className="btn-primary">Save</button>
        <button type="reset" className="btn-secondary">Cancel</button>
      </Form>
    </div>
  );
};

export default EventForm;
