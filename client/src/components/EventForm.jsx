import React, { useState, useEffect } from "react";
import useForm from "../hooks/useForm";
import Form from "react-bootstrap/Form";
import "./EventForm.css";

const EventForm = ({ eventOnSubmit }) => {
  // TODO: fetch categories from the backend and populate the category input as a dropdown

  const [event, handleOnChange, resetForm] = useForm({
    name: "",
    event_date_time: "",
    location: "",
    category: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    eventOnSubmit(event);
    resetForm();
  };

  const handleCancel = (e) => {
    resetForm();
  };

  return (
    <div className="event-form-container">
      <Form className="event-form" onSubmit={handleSubmit}>
        <h2>Add Event</h2>
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

        <label htmlFor="event-description"> Description*</label>
        <textarea
          className="input-style"
          id="event-description"
          name="description"
          value={event.description}
          onChange={handleOnChange}
          required
        ></textarea>

        <label htmlFor="event-date-time"> Date and Time*</label>
        <input
          className="input-style"
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

        <div className="btn-group">
          <button type="submit" className="btn-primary">
            Save
          </button>
          <button type="reset" className="btn-secondary">
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
};

export default EventForm;
