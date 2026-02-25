import React, { useState, useEffect, useReducer } from "react";
import UserRegisterForm from "../components/UserRegisterForm";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm.jsx";
import UserList from "../components/UserList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { appReducer, initialState, ACTIONS } from "../hooks/appReducer.js";
import * as eventsApi from "../api/eventsApi.js";
import { fetchUsers } from "../api/userApi.js";

import "../App.css";
import "./ManagerPage.css";

const ManagerPage = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { eventsAll, users } = state.data;
  const { loading, error } = state.status;
  const { activeTab, showEventForm, editingEvent } = state.ui.manager;
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // const { events, users, error, loading, editingEvent, ui } = state;

  useEffect(() => {
    eventsApi.fetchEvents(dispatch);
    fetchUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchText.trim() && activeCategory === "All") {
        eventsApi.fetchEvents(dispatch);
        return;
      }

      eventsApi.searchEvents(dispatch, searchText.trim(), activeCategory);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText, activeCategory]);

  return (
    <div className="manager-page-container">
      <div className="manager-page-header">
        <h1>🔧 Host Panel</h1>
      </div>

      {/* Manager Tabs */}
      <div className="manager-page-tabs">
        <button
          className={`btn-tab ${activeTab === "events" ? "active" : ""}`}
          onClick={() =>
            dispatch({ type: ACTIONS.setActiveTab, payload: "events" })
          }
        >
          Events
        </button>
        <button
          className={`btn-tab ${activeTab === "users" ? "active" : ""}`}
          onClick={() =>
            dispatch({ type: ACTIONS.setActiveTab, payload: "users" })
          }
        >
          Users
        </button>
      </div>

      {/* Search + Add */}
      {activeTab === "events" && (
        <div className="search-container">
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.setShowEventForm, payload: true })
            }
            className="btn-primary"
          >
            + Add Event
          </button>

          <SearchBar
            searchText={searchText}
            onChange={(val) => setSearchText(val)}
          />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {/* Popup Window */}
      {showEventForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Event</h2>
            <EventForm
              initialEvent={editingEvent}
              eventOnSubmit={(eventData) => {
                if (editingEvent) {
                  eventsApi.updateEvent(dispatch, editingEvent.id, eventData);
                } else {
                  eventsApi.createEvent(dispatch, eventData);
                }
              }}
              onClose={() =>
                dispatch({ type: ACTIONS.setShowEventForm, payload: false })
              }
            />
          </div>
        </div>
      )}

      {/* Show the Events  */}
      {activeTab === "events" && (
        <EventList
          events={eventsAll}
          onDelete={(id) => eventsApi.deleteEvent(dispatch, id)}
          onEdit={(eventData) => {
            dispatch({ type: ACTIONS.setEditingEvent, payload: eventData });
            dispatch({ type: ACTIONS.setShowEventForm, payload: true });
          }}
        />
      )}

      {/* Show the users */}

      {activeTab === "users" && (
        <div>
          <h2> Registered Users</h2>
          <UserList users={users} />
        </div>
      )}
    </div>
  );
};

export default ManagerPage;
