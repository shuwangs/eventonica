import React from "react";
import "../App.css";
import "./UserPage.css";

const UserPage = () => {
  return (
    <div className="user-page-container">
      {/* UserPage Header area */}
       <div className="user-page-header">
        <div><h1>✨ Event Manager</h1></div>
        <div><h3>Hello, Bobo!</h3></div>
      </div>
      <div className="user-page-content">
        {/* UserPage Left area */}
        <input  className="input-style search-bar" type="text" placeholder="Search events..." />
        <button className="btn-primary show-categories-btn">All Categories </button>
        <button className="btn-primary show-favorites-btn">Show Favorites</button>
      </div>

    </div>
  );
}

export default UserPage;