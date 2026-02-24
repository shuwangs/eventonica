import { ACTIONS } from "../hooks/appReducer.jsx";

export const addUserFavorite = async (currentUserId, event_id) => {
  dispatch({ type: ACTIONS.setError, payload: null });
  dispatch({ type: ACTIONS.setLoading, payload: true });
  console.log("adding to the user favorite");
  try {
    const response = await fetch(`/api/users/${currentUserId}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: currentUserId, event_id: event_id }),
    });
    if (!response.ok) {
      throw new Error("Failed to post user favorites event");
    }
    const data = await response.json();
    setUserFavEvents((prev) => [
      ...prev,
      { user_id: currentUserId, event_id: event_id },
    ]);
  } catch (err) {
    dispatch({ type: ACTIONS.setError, payload: null });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: false });
  }
};
export const deleteUserFavorite = async (currentUserId, event_id) => {
  console.log("deleting from the user favorite");
  dispatch({ type: ACTIONS.setError, payload: null });
  dispatch({ type: ACTIONS.setLoading, payload: true });
  try {
    const response = await fetch(
      `/api/users/${currentUserId}/favorites/${event_id}`,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to delete favorite");
    }
    const data = await response.json();

    setUserFavEvents((prev) => {
      return prev.filter((fav) => Number(fav.event_id) !== Number(event_id));
    });
  } catch (err) {
    dispatch({ type: ACTIONS.setError, payload: err.message });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: false });
  }
};
