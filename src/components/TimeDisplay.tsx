import React, { useState, useEffect } from "react";

export const TimeDisplay: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
      const amPm = hours >= 12 ? "PM" : "AM";
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      setTime(
        `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amPm}`
      );
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  return <div className="text-sm text-muted-foreground">{time}</div>;
};
