"use client";
import React, { useState, useEffect, useRef } from "react";

const Autocomplete = ({ suggestions, onSuggestionSelected, ...props }) => {
  const [value, setValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleBodyClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    const filtered = suggestions.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion);
    setFilteredSuggestions([]);
    onSuggestionSelected(suggestion);
  };

  return (
    <div className="relative w-auto" ref={inputRef}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        className="p-2 border"
        {...props}
      />
      {isFocused && filteredSuggestions.length > 0 && (
        <div className="absolute w-full bg-white top-12">
          <ul className="p-0 m-0 overflow-y-scroll list-none">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
