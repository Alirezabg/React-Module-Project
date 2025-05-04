import React from "react";

const calculateNights = (checkIn, checkOut) => {
  const inDate  = new Date(checkIn);
  const outDate = new Date(checkOut);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((outDate - inDate) / msPerDay);
};

const SearchResults = ({ results }) => (
  <table className="search-results">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>First</th>
        <th>Surname</th>
        <th>Email</th>
        <th>Room</th>
        <th>Check In</th>
        <th>Check Out</th>
        <th>Nights</th>
      </tr>
    </thead>
    <tbody>
      {results.map((r) => (
        <tr key={r.id}>
          <td>{r.id}</td>
          <td>{r.title}</td>
          <td>{r.firstName}</td>
          <td>{r.surname}</td>
          <td>{r.email}</td>
          <td>{r.roomId}</td>
          <td>{r.checkInDate}</td>
          <td>{r.checkOutDate}</td>
          <td>{calculateNights(r.checkInDate, r.checkOutDate)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SearchResults;
