import React, { useState } from "react";
// import AutoComplete from "./AutoComplete";
import styles from "./SearchBox.module.css";
import { CiSearch } from "react-icons/ci";

export default function SearchBox({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className={styles.form}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles.button} type="submit">
        <CiSearch />
      </button>
    </form>
  );
}
