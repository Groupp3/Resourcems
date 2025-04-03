import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calender.css"; // Import custom styles

const MyCalendar = ({ value }) => {
  const [date] = useState(value || new Date()); // Default to current date

  return (
    <div className="calendar-container">
      <Calendar
        value={date}
        tileDisabled={() => true} // Disable all date selection
        className="my-calendar"
        style={{ width: '100%', height: '250px', margin: '0 auto' }}  // Adjusted size
      />
    </div>
  );
};

export default MyCalendar;

