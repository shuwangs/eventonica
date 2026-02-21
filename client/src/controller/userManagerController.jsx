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

export const createEvent = async (dispatch) => {
  console.log("create function");
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
