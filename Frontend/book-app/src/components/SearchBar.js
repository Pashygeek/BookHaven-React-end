import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ searchQuery, handleInputChange, handleSearch }) {
  return (
    <div className="search-bar" style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
      <div style={{ maxWidth: "500px", position: "relative" }}>
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchQuery}
          onChange={handleInputChange}
          style={{
            borderRadius: "8px",
            backgroundColor: "#E2E8F0",
            color: "black",
            padding: "0.5rem 2rem 0.5rem 1rem",
            width: "100%",
            outline: "none",
            border: "none",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            borderRadius: "10px",
            backgroundColor: "burlywood",
            color: "white",
            padding: "0.5rem",
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
