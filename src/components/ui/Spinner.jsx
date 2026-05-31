import React from 'react';

// Inherits the current text colour via `border-current`, so the caller controls
// the colour with a text-* class.
const Spinner = ({ size = 24, className = '' }) => (
  <span
    role="status"
    aria-label="Loading"
    className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
    style={{ width: size, height: size }}
  />
);

export default Spinner;
