import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Bookings from "./Bookings.jsx";
import FakeBookings from "@/data/fakeBookings.json";

describe("Bookings Component", () => {
  beforeEach(() => {
    render(<Bookings />);
  });

  it("renders a <main> element with role='main'", () => {
    const mainEl = screen.getByRole("main");
    expect(mainEl).toBeInTheDocument();
  });

  it("renders a search input and button", () => {
    const input = screen.getByPlaceholderText(/search by name or email/i);
    const button = screen.getByRole("button", { name: /search/i });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("displays all bookings on initial load", () => {
    // count rows: one <tr> per booking plus header row
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(FakeBookings.length + 1);
  });

  it("filters the table when a search is submitted", async () => {
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/search by name or email/i);
    const button = screen.getByRole("button", { name: /search/i });

    // pick a term known to match at least one fake booking:
    const term = FakeBookings[0].firstName.slice(0, 2).toLowerCase();
    await user.clear(input);
    await user.type(input, term);
    await user.click(button);

    // All shown rows (minus header) should include the term
    const rows = screen.getAllByRole("row");
    // header + filtered results
    expect(rows.length).toBeLessThan(FakeBookings.length + 1);

    // Check each data row
    const dataRows = rows.slice(1);
    dataRows.forEach((row) => {
      const text = within(row).getByText(new RegExp(term, "i")).textContent;
      expect(text.toLowerCase()).toContain(term);
    });
  });
});
