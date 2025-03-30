import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";


const SearchBar = ({ suggestions = [] }) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filter suggestions based on input
    if (value) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
    navigate(`/search?q=${suggestion}`);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
      <button type="submit" className="search-button">
          <FaSearch />
        </button>

        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearchChange}
          className="search-input"
        />
      
      </form>

      {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((item, index) => (
            <li key={index} onClick={() => handleSuggestionClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};




export default SearchBar;
