import React, { useState, useReducer, useEffect, useMemo } from "react";
import UserEventList from "../components/UserEventList";
import { appReducer, initialState, ACTIONS } from "../hooks/appReducer.jsx";
import { fetchEvents, searchEvents } from "../controller/eventsController.jsx";
import { fetchCategories } from "../controller/categoriesController.jsx";

import { fetchUsers } from "../controller/userController.jsx";
import "../App.css";
import "./UserPage.css";
import "./ManagerPage.css";

const UserPage = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { eventsAll, users } = state.data;
  const { loading, error } = state.status;

  const [currentUserId, setCurrentUserId] = useState("");
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [userFavEvents, setUserFavEvents] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const [searchText, setSearchText] = useState("");

  // useEffect(() => {
  //   console.log("calling fetchEvents...");
  //   fetchEvents(dispatch);
  //   fetchUsers(dispatch);
  // }, []);

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
  }, [dispatch]);

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
    fetchUserFavorite(currentUserId);
  }, [currentUserId]);

  // const searchEvents = async (queryText, category) => {
  //   dispatch({ type: ACTIONS.setError, payload: null });
  //   dispatch({ type: ACTIONS.setLoading, payload: true });
  //   try {
  //     const params = new URLSearchParams();
  //     if (queryText) params.append("q", queryText);
  //     if (category && category === "All") params.append("category", category);
  //     console.log("querytext front is: ", queryText);
  //     console.log("query category is: ", category);
  //     console.log(params.toString());

  //     const response = await fetch(`/api/events/search?${params.toString()}`);

  //     if (!response.ok) throw new Error("Search failed");

  //     const data = await response.json();
  //     console.log("searched events: ", data);
  //     dispatch({ type: ACTIONS.setEvents, payload: data });
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchUserFavorite = async (currentUserId) => {
    dispatch({ type: ACTIONS.setError, payload: null });
    dispatch({ type: ACTIONS.setLoading, payload: true });
    try {
      const response = await fetch(`/api/users/${currentUserId}/favorites`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUserFavEvents(data);
    } catch (err) {
      dispatch({ type: ACTIONS.setError, payload: err.message });
    } finally {
      dispatch({ type: ACTIONS.setLoading, payload: false });
    }
  };

  const addUserFavorite = async (currentUserId, event_id) => {
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
  const deleteUserFavorite = async (currentUserId, event_id) => {
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

  const showFavorite = (events) => {
    const filteredEvents = events.filter((event) => {
      return userFavEvents.some(
        (fav) => Number(fav.event_id) === Number(event.id),
      );
    });

    return filteredEvents;
  };

  const toggleHeartBtn = (event_id) => {
    if (!currentUserId) return;
    const isFav = userFavEvents.some((f) => f.event_id === Number(event_id));
    if (isFav) {
      return deleteUserFavorite(currentUserId, event_id);
    } else {
      return addUserFavorite(currentUserId, event_id);
    }
  };

  const getEventByCategory = (events, cat) => {
    console.log("trying to get category id:", cat);
    if (cat === "All") return events;
    return events.filter((event) => event.category === cat);
  };

  const displayedEvents = useMemo(() => {
    const byCategory = getEventByCategory(eventsAll, activeCategory);

    if (!showFavOnly) return byCategory;
    return showFavorite(byCategory);
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
        <input
          className="input-style search-input"
          type="text"
          placeholder="Search events..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* <button className="btn-primary show-categories-btn">
          All Categories{" "}
        </button> */}
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
            className={`category-filter-btn ${activeCategory === cat ? "active" : ""}`}
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
