import React from 'react';

const MinMaxPhoneNumber = ({ min, max, total, phoneNumbers }) => (
  <div>
    {phoneNumbers.length > 0 && (
      <div>
        <div>
          <strong>Min Phone number: </strong>
          <span>{`0${min}`}</span>
        </div>
        <div>
          <strong>Max Phone number: </strong>
          <span>{`0${max}`}</span>
        </div>
        <div>
          <strong>Total number of Phone numbers: </strong>
          <span>{total}</span>
        </div>
      </div>
    )}
  </div>
);
export default MinMaxPhoneNumber;
