// src/components/Calendar.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";  // Import default styles
import "./Calender.css";  // Custom styles

const MyCalendar = ({ onChange, value }) => {
  const [date, setDate] = useState(value || new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (onChange) onChange(newDate);
  };

  return (
    <div className="calendar-container">
      <h2>Pick a Date</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="my-calendar"
      />
    </div>
  );
};

export default MyCalendar;
