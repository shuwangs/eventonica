import { ACTIONS } from "../hooks/appReducer.jsx";

export const fetchUserFavorite = async (dispatch, currentUserId) => {
  dispatch({ type: ACTIONS.setError, payload: null });
  dispatch({ type: ACTIONS.setLoading, payload: true });
  try {
    const response = await fetch(`/api/users/${currentUserId}/favorites`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    dispatch({ type: ACTIONS.setUserFavEvents, payload: data });
  } catch (err) {
    dispatch({ type: ACTIONS.setError, payload: err.message });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: false });
  }
};

export const addUserFavorite = async (dispatch, currentUserId, event_id) => {
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

    dispatch({ type: ACTIONS.setUserFavEvents, payload: data });
    // setUserFavEvents((prev) => [
    //   ...prev,
    //   { user_id: currentUserId, event_id: event_id },
    // ]);
    const prev = getState().data.userFavEvents;
    const exists = prev.some(
      (f) =>
        Number(f.user_id) === Number(currentUserId) &&
        Number(f.event_id) === Number(event_id),
    );

    const next = exists
      ? prev
      : [...prev, { user_id: currentUserId, event_id }];

    dispatch({ type: ACTIONS.setUserFavEvents, payload: next });
  } catch (err) {
    dispatch({ type: ACTIONS.setError, payload: null });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: false });
  }
};

export const deleteUserFavorite = async (dispatch, currentUserId, event_id) => {
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
    const prev = getState().data.userFavEvents;

    const leftAfterDelete = prev.filter(
      (fav) => Number(fav.event_id) !== Number(event_id),
    );

    dispatch({ type: ACTIONS.setUserFavEvents, payload: leftAfterDelete });

    // setUserFavEvents((prev) => {
    //   return prev.filter((fav) => Number(fav.event_id) !== Number(event_id));
    // });
  } catch (err) {
    dispatch({ type: ACTIONS.setError, payload: err.message });
  } finally {
    dispatch({ type: ACTIONS.setLoading, payload: false });
  }
};
