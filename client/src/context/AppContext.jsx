import React, { createContext, useReducer, useEffect } from "react";
import { appReducer, initialState, ACTIONS } from "../hooks/appReducer";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  useEffect(() => {
    const loadInitialData = async () => {
      dispatch({ type: ACTIONS.setLoading, payload: true });
      dispatch({ type: ACTIONS.setError, payload: null });

      try {
        const [eventsRes, usersRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/users"),
        ]);

        if (!eventsRes.ok) throw new Error("Failed to fetch events");
        if (!usersRes.ok) throw new Error("Failed to fetch users");

        const events = await eventsRes.json();
        const users = await usersRes.json();

        dispatch({ type: ACTIONS.setEventsAll, payload: events });
        dispatch({ type: ACTIONS.setUsers, payload: users });
      } catch (err) {
        dispatch({ type: ACTIONS.setError, payload: err.message });
      } finally {
        dispatch({ type: ACTIONS.setLoading, payload: false });
      }
    };
    loadInitialData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
