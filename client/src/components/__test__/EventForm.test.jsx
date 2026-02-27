import React from "react";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import EventForm from "../EventForm";

describe("EventForm", () => {
  test("fills input and submit form, calls eventOnsubmit with event data, then reset", async () => {
    const eventOnSubmit = vi.fn();
    const onClose = vi.fn();

    render(<EventForm eventOnSubmit={eventOnSubmit} onClose={onClose} />);

    // fill the form;
    fireEvent.change(screen.getByLabelText(/event name/i), {
      target: { value: "Tech Meetup" },
    });

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "A meetup for devs" },
    });

    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: "Seattle" },
    });

    fireEvent.change(screen.getByLabelText(/date and time/i), {
      target: { value: "2026-03-01T10:30" },
    });

    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "Tech" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(eventOnSubmit).toHaveBeenCalledWith({
      name: "Tech Meetup",
      event_date_time: "2026-03-01T10:30",
      location: "Seattle",
      category: "Tech",
      description: "A meetup for devs",
    });
  });

  test("clicking close button", () => {
    const eventOnSubmit = vi.fn();
    const onClose = vi.fn();

    render(<EventForm eventOnSubmit={eventOnSubmit} onClose={onClose} />);

    fireEvent.change(screen.getByLabelText(/event name/i), {
      target: { value: "Temp Event" },
    });

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    fireEvent.click(screen.getByText("✖︎"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
