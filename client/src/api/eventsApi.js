import { ACTIONS } from "../hooks/appReducer.js";

// get all events
export const fetchEvents = async (dispatch) => {
  dispatch({ type: ACTIONS.setLoading, payload: true });
  dispatch({ type: ACTIONS.setError, payload: null });

  try {
    const response = await fetch("/api/events");
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    dispatch({
      type: ACTIONS.setEventsAll,
      payload: data,
    });
  } catch (err) {
    dispatch({ type: ACTIONS.setError, payload: err.message });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: false });
  }
};

export const createEvent = async (dispatch, eventData) => {
  dispatch({ type: ACTIONS.setLoading, payload: true });
  dispatch({ type: ACTIONS.setError, payload: null });
  const formatedEventData = {
    ...eventData,
    event_date_time: new Date(eventData.event_date_time).toISOString(),
  };
  try {
    const response = await fetch(`/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formatedEventData),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    const newEvent = await response.json();

    // Update the frontend
    dispatch({ type: ACTIONS.createEvent, payload: formatedEventData });

    // close the modal
    dispatch({ type: ACTIONS.setShowEventForm, payload: false });
  } catch (err) {
    dispatch({
      type: ACTIONS.setError,
      payload: err.message,
    });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: false });
  }
};

export const deleteEvent = async (dispatch, id) => {
  dispatch({ type: ACTIONS.setLoading, payload: true });
  dispatch({ type: ACTIONS.setError, payload: null });

  try {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete event");
    }
    dispatch({
      type: ACTIONS.deleteEvent,
      payload: id,
    });
  } catch (err) {
    dispatch({ type: ACTIONS.setError, payload: err.message });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: false });
  }

};

export const updateEvent = async (dispatch, id, eventData) => {
  dispatch({ type: ACTIONS.setLoading, payload: true });
  dispatch({ type: ACTIONS.setError, payload: null });
  const formattedEventData = {
    ...eventData,
    id: Number(id),
    event_date_time: new Date(eventData.event_date_time).toISOString(),
  };
  try {
    const response = await fetch(`/api/events/${Number(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedEventData),
    });

    if (!response.ok) {
      throw new Error("Failed to update event");
    }

    const updatedEvent = await response.json();

    // Update the frontend
    dispatch({ type: ACTIONS.updateEvent, payload: updatedEvent });
    dispatch({ type: ACTIONS.setShowEventForm, payload: false });
  } catch (err) {
    dispatch({ type: ACTIONS.setError, payload: err.message });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: false });
  }
};

export const searchEvents = async (dispatch, queryText, category) => {
  try {
    dispatch({ type: ACTIONS.setLoading, payload: true });
    dispatch({ type: ACTIONS.setError, payload: null });

    const params = new URLSearchParams();
    if (queryText) params.append("q", queryText);
    if (category && category === "All") params.append("category", category);

    const response = await fetch(`/api/events/search?${params.toString()}`);

    if (!response.ok) throw new Error("Search failed");

    const data = await response.json();
    dispatch({ type: ACTIONS.setEventsAll, payload: data });
  } catch (err) {
    dispatch({ type: ACTIONS.setError, payload: err.message });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: null });
  }
};
