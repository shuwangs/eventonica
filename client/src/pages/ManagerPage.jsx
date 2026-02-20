import React, { useState, useEffect } from "react";
import UserRegisterForm from "../components/UserRegisterForm";
import EventList from "../components/EventList";
import fakeEvents from "../components/hardCodedEventsList.js";

const ManagerPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events").then();
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      console.log(`fetched data is: ${data}`);
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-page">
      <h1>Manager Page</h1>
      <UserRegisterForm
        onSubmit={(user) => console.log("New user added:", user)}
      />

      <EventList events={events} />
    </div>
  );
};

export default ManagerPage;
