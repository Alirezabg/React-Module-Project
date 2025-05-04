import React, { useState, useEffect } from "react";
import Search from "@/components/Search/Search";
import SearchResults from "@/components/SearchResults/SearchResults";
import FakeBookings from "@/data/fakeBookings.json";

const Bookings = () => {
  // 1) State for the full list, and for whatever matches the current search
  const [bookings, setBookings] = useState([]);
  const [results, setResults]   = useState([]);

  // 2) On mount, load your fake data
  useEffect(() => {
    setBookings(FakeBookings);
    setResults(FakeBookings);
  }, []);

  // 3) Filter whenever user searches
  const search = (searchVal) => {
    const val = searchVal.trim().toLowerCase();
    const filtered = bookings.filter((b) => {
      // example: match firstName, surname or email
      return (
        b.firstName.toLowerCase().includes(val) ||
        b.surname.toLowerCase().includes(val) ||
        b.email.toLowerCase().includes(val)
      );
    });
    setResults(filtered);
  };

  return (
    <main className="bookings">
      <Search search={search} />
      <SearchResults results={results} />
    </main>
  );
};

export default Bookings;
