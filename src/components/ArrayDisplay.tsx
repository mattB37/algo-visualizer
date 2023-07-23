// ArrayDisplay.tsx
import React from "react";
import "../styles/ArrayStyle.css"; // Adjust the path according to your project structure

interface ArrayDisplayProps {
  title: string;
  array: number[];
}

const ArrayDisplay: React.FC<ArrayDisplayProps> = ({ title, array }) => {
  return (
    <div className="array-display">
      <h3>{title}: </h3>
      {array.length > 0 ? (
        <ul className="array-values">
          {array.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      ) : (
        <p>N/A</p>
      )}
    </div>
  );
};

export default ArrayDisplay;
