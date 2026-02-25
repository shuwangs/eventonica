import React, { useState, useReducer, useEffect, useMemo } from "react";
import UserEventList from "../components/UserEventList";
import SearchBar from "../components/SearchBar.jsx";
import { appReducer, initialState, ACTIONS } from "../hooks/appReducer.jsx";
import { fetchEvents, searchEvents } from "../controller/eventsController.jsx";
import { fetchCategories } from "../controller/categoriesController.jsx";
import {
  fetchUserFavorite,
  addUserFavorite,
  deleteUserFavorite,
} from "../controller/favoriteController.jsx";
import { showFavorite, getEventByCategory } from "../utils/selectors.jsx";
import { fetchUsers } from "../controller/userController.jsx";
import "../App.css";
import "./UserPage.css";
import "./ManagerPage.css";

const UserPage = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { eventsAll, users, userFavEvents } = state.data;

  const [currentUserId, setCurrentUserId] = useState("");
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [eventCategories, setEventCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        await fetchEvents(dispatch);
        await fetchUsers(dispatch);

        const cats = await fetchCategories();
        setEventCategories(cats);
      } catch (err) {
        dispatch({ type: ACTIONS.setError, payload: err.message });
      }
    };

    init();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchText.trim() && activeCategory === "All") {
        fetchEvents(dispatch);
        return;
      }

      searchEvents(dispatch, searchText.trim(), activeCategory);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText, activeCategory]);

  useEffect(() => {
    if (!currentUserId) return;
    fetchUserFavorite(dispatch, currentUserId);
  }, [currentUserId, userFavEvents]);

  const toggleHeartBtn = (event_id) => {
    if (!currentUserId) return;
    const isFav = userFavEvents.some((f) => f.event_id === Number(event_id));
    if (isFav) {
      return deleteUserFavorite(dispatch, currentUserId, event_id);
    } else {
      return addUserFavorite(dispatch, currentUserId, event_id);
    }
  };

  const displayedEvents = useMemo(() => {
    const byCategory = getEventByCategory(eventsAll, activeCategory);
    if (!showFavOnly) {
      return byCategory;
    }
    return showFavorite(byCategory, userFavEvents);
  }, [eventsAll, activeCategory, showFavOnly, userFavEvents]);

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
            className="select-style"
            value={currentUserId}
            onChange={(e) => setCurrentUserId(Number(e.target.value))}
          >
            <option value="" disabled>
              Dear friend
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="user-page-content">
        {/* UserPage Left area */}
        <SearchBar
          searchText={searchText}
          onChange={(val) => setSearchText(val)}
        />
        <button
          className="btn-primary show-favorites-btn"
          onClick={() => setShowFavOnly(!showFavOnly)}
        >
          {showFavOnly ? "Show All" : "Show Favorites"}
        </button>
      </div>

      {/*  filter by category */}
      <div className="category-filter-bar">
        <button
          key="all"
          className={`category-filter-btn ${activeCategory === "All" ? "active" : ""}`}
          onClick={() => setActiveCategory("All")}
        >
          All
        </button>

        {eventCategories.map((cat) => (
          <button
            className={`category-filter-btn ${activeCategory === cat.name ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
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
