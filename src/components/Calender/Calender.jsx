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
      <Calendar
        onChange={handleDateChange}
        value={date}  // Ensures a single date is passed
        view="month"  // Ensures the calendar only shows one month
        className="my-calendar"
        style={{ width: '100%', height: '250px', margin: '0 auto' }}  // Adjusted size
      />
    </div>
  );
};

export default MyCalendar;



