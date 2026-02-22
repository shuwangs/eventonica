import React, { useState, useReducer, useEffect } from "react";
import UserEventList from "../components/UserEventList";
import {
  managerReducer,
  initialState,
  ACTIONS,
} from "../hooks/managerReducer.jsx";
import {
  fetchEvents,
  fetchUsers,
} from "../controller/userManagerController.jsx";

import "../App.css";
import "./UserPage.css";
import "./ManagerPage.css";

const UserPage = () => {
  const [state, dispatch] = useReducer(managerReducer, initialState);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [userFavEvents, setUserFavEvents] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("calling fetchEvents...");
    fetchEvents(dispatch);
    fetchUsers(dispatch);
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!currentUserId) return;
    fetchUserFavorite(currentUserId);
  }, [currentUserId]);

  const fetchUserFavorite = async (currentUserId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${currentUserId}/favorites`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUserFavEvents(data);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch(`/api/categories`);
      if (!response.ok) {
        throw new Error("Failed to get event category");
      }
      const data = await response.json();
      console.log("categories include: ", data);
      setEventCategories(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const addUserFavorite = async (currentUserId, event_id) => {
    setLoading(true);
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
      setLoading(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteUserFavorite = async (currentUserId, event_id) => {
    console.log("deleting from the user favorite");

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
      setLoading(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showFavorite = (events) => {
    const filteredEvents = events.filter((event) => {
      return userFavEvents.some(
        (fav) => Number(fav.event_id) === Number(event.id),
      );
    });

    return filteredEvents;
  };

  const displayedEvents = showFavOnly
    ? showFavorite(state.events)
    : state.events;

  const toggleHeartBtn = (event_id) => {
    if (!currentUserId) return;
    const isFav = userFavEvents.some((f) => f.event_id === event_id);
    if (isFav) {
      return deleteUserFavorite(currentUserId, event_id);
    } else {
      return addUserFavorite(currentUserId, event_id);
    }
  };

  return (
    <div className="user-page-container">
      {/* UserPage Header area */}
      <div className="user-page-header">
        <div>
          <h1>✨ Event Manager</h1>
        </div>
        <div className="user-page-welcome">
          <div>Hello</div>
          <select
            value={currentUserId}
            onChange={(e) => setCurrentUserId(Number(e.target.value))}
          >
            {state.users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
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
        <button
          className="btn-primary show-favorites-btn"
          onClick={() => setShowFavOnly(!showFavOnly)}
        >
          {showFavOnly ? "Show All" : "Show Favorites"}
        </button>
      </div>

      <UserEventList
        events={displayedEvents}
        userFavEvents={userFavEvents}
        onToggleFavorite={toggleHeartBtn}
      />
    </div>
  );
};

export default UserPage;
