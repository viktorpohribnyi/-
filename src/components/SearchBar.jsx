import React, { useState } from "react";
import styled from "styled-components";

const SearchWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;

  input {
    width: 300px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
`;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <SearchWrapper>
      <input
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={handleSearch}
      />
    </SearchWrapper>
  );
};

export default SearchBar;
