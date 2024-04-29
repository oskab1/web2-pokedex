import React from 'react';
import './navigation.css'; 

export default function Navigation({ goToNextPage, goToPreviousPage }) {
  return (
    <div className="nav-container">
      {goToNextPage && ( // If goToNextPage is truthy, render the button
        <button className="nav-button" onClick={goToNextPage}>
          Next
        </button>
      )}
      {goToPreviousPage && ( // If goToPreviousPage is truthy, render the button
        <button className="nav-button" onClick={goToPreviousPage}>
          Previous
        </button>
      )}
    </div>
  );
}
