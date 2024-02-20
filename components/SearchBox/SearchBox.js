import React, { useState } from "react";
// import AutoComplete from "./AutoComplete";

export default function SearchBox({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
