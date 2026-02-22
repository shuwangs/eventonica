export const fetchUserFavorite = async (dispatch) => {
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
