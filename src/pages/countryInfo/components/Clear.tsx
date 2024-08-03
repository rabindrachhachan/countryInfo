import React from 'react';
import './Clear.css'; // Optional: for styling

// Define the interface for the component props
interface ClearProps {
  onClick: () => void;
}

const Clear: React.FC<ClearProps> = ({ onClick }) => {
  return (
    <span 
      className="clear-text"
      onClick={onClick}
    >
      Clear
    </span>
  );
};

export default Clear;
