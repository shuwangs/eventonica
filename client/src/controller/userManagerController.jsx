import { ACTIONS } from "../hooks/managerReducer.jsx";

// get all events
export const fetchEvents = async (dispatch) => {
  dispatch({ type: ACTIONS.setLoading, payload: true });
  try {
    const response = await fetch("/api/events");
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    dispatch({
      type: ACTIONS.fetchEvents,
      payload: data,
    });
  } catch (err) {
    dispatch({ type: ACTIONS.setError, payload: err.message });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: false });
  }
};

export const fetchUsers = async (dispatch) => {
  dispatch({ type: ACTIONS.setLoading, payload: true });
  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    console.log(`fetched users are: ${data}`);
    dispatch({
      type: ACTIONS.fetchUsers,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ACTIONS.setError,
      payload: err.message,
    });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: false });
  }
};

export const createEvent = async (dispatch, eventData) => {
  dispatch({ type: ACTIONS.setLoading, payload: true });
  dispatch({ type: ACTIONS.setError, payload: null });
  console.log("create function...");

  try {
    const response = await fetch(`/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    const newEvent = await response.json();

    // Update the frontend
    dispatch({ type: ACTIONS.createEvent, payload: newEvent });

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

  console.log("delete function");
};

export const updateEvent = async (dispatch, id, eventData) => {
  console.log("passed in id:", id);
  console.log("passed in eventData:", eventData);
  dispatch({ type: ACTIONS.setLoading, payload: true });
  dispatch({ type: ACTIONS.setError, payload: null });
  const formatedData = { ...eventData, id: Number(id) };
  try {
    const response = await fetch(`/api/events/${Number(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update event");
    }

    const updatedEvent = await response.json();
    console.log(updatedEvent);

    // Update the frontend
    dispatch({ type: ACTIONS.updateEvent, payload: updatedEvent });
    dispatch({ type: ACTIONS.setShowEventForm, payload: false });
  } catch (err) {
    dispatch({ type: ACTIONS.setError, payload: err.message });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: false });
  }
};
