import React, { useState } from "react";

const Search = ({ search }) => {
  const [term, setTerm] = useState("");

  const doSearch = (e) => {
    e.preventDefault();
    search(term);
  };

  return (
    <form className="search-form" onSubmit={doSearch}>
      <input
        type="search"
        placeholder="Search by name or email"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
