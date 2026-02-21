import React, { useState, useEffect } from "react";
import useForm from "../hooks/useForm";
import Form from "react-bootstrap/Form";
import {
  managerReducer,
  initialState,
  ACTIONS,
} from "../hooks/managerReducer.jsx";
import "./EventForm.css";

const EventForm = ({ eventOnSubmit, onClose, initialEvent = null }) => {
  // TODO: fetch categories from the backend and populate the category input as a dropdown
  const initalData = {
    name: "",
    event_date_time: "",
    location: "",
    category: "",
    description: "",
  };
  const [event, handleOnChange, resetForm] = useForm(initalData);

  useEffect(() => {
    if (initialEvent) {
      resetForm({
        name: initialEvent.name ?? "",
        event_date_time: initialEvent.event_date_time ?? "",
        location: initialEvent.location ?? "",
        category: initialEvent.category ?? initialEvent.categoryName ?? "",
        description: initialEvent.description ?? "",
      });
    } else {
      resetForm(initalData);
    }
  }, [initialEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    eventOnSubmit(event);
    resetForm(initalData);
  };

  const handleCancel = () => {
    resetForm(initalData);
  };

  return (
    <div className="event-form-container">
      <Form className="event-form" onSubmit={handleSubmit}>
        <div className="event-form-header">
          <h2>Add Event</h2>
          <p>
            <span className="close-icon" onClick={onClose}>
              ✖︎
            </span>
          </p>
        </div>

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
          <button type="submit" className="save-btn btn-primary">
            Save
          </button>
          <button
            type="reset"
            className="cancel-btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
};

export default EventForm;
