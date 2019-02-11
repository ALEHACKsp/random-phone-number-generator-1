import React from 'react';
import './__styles__/sort.scss';

const Sorter = ({ phoneNumbers, onChange }) => (
  <div className="sort">
    {phoneNumbers.length > 0 && (
      <div>
        <span className="text">
          <strong>Sort by:</strong>
        </span>
        {''}
        <select onChange={onChange} className="select">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    )}
  </div>
);

export default Sorter;
