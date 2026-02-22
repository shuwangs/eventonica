import React, { useState, useReducer, useEffect } from "react";
import UserEventList from "../components/UserEventList";
import {
  managerReducer,
  initialState,
  ACTIONS,
} from "../hooks/managerReducer.jsx";
import { fetchEvents } from "../controller/userManagerController.jsx";

import "../App.css";
import "./UserPage.css";
import "./ManagerPage.css";

const UserPage = () => {
  const [state, dispatch] = useReducer(managerReducer, initialState);

  const [showFavOnly, setShowFavOnly] = useState(false);

  useEffect(() => {
    console.log("calling fetchEvents...");
    fetchEvents(dispatch);
  }, []);

  useEffect(() => {
    console.log("UserPage events updated:", state.events);
  }, [state.events]);

  return (
    <div className="user-page-container">
      {/* UserPage Header area */}
      <div className="user-page-header">
        <div>
          <h1>✨ Event Manager</h1>
        </div>
        <div>
          <h3>Hello, Bobo!</h3>
        </div>
      </div>
      <div className="user-page-content">
        {/* UserPage Left area */}
        <input
          className="input-style search-input"
          type="text"
          placeholder="Search events..."
        />
        <button className="btn-primary show-categories-btn">
          All Categories{" "}
        </button>
        <button className="btn-primary show-favorites-btn">
          Show Favorites
        </button>
      </div>

      <UserEventList events={state.events} />
    </div>
  );
};

export default UserPage;
