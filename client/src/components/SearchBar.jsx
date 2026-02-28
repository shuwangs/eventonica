{
  /* UserPage Left area */
}
import React from "react";

const SearchBar = ({ searchText, onChange }) => {
  return (
    <input
      className="input-style search-input"
      type="text"
      placeholder="Search events..."
      value={searchText}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
export default SearchBar;
