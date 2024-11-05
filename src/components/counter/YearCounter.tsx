import React, { useEffect, useState } from 'react';
import './YearCounter.scss';

// Count the years of the simulation (10s = 1 year)
const YearCounter: React.FC = () => {
  const [yearsPassed, setYearsPassed] = useState(0);

  useEffect(() => {
    // Increment years every 10 seconds
    const yearInterval = setInterval(() => {
      setYearsPassed((prev) => prev + 1);
    }, 10000); // 10,000 ms = 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(yearInterval);
  }, []);

  return (
    <div className="year-counter">
      <p>Years Passed: <span>{yearsPassed}</span></p>
    </div>
  );
};

export default YearCounter;
