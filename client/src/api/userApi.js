import { ACTIONS } from "../hooks/appReducer.js";

export const fetchUsers = async (dispatch) => {
  dispatch({ type: ACTIONS.setLoading, payload: true });
  dispatch({ type: ACTIONS.setError, payload: null });

  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    console.log("fetched users are:", data);
    dispatch({
      type: ACTIONS.setUsers,
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
