import React, { createContext, useReducer } from "react";
import { appReducer, initialState } from "../hooks/appReducer";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default { AppContext, AppContextProvider };
