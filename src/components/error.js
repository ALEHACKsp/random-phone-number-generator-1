import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  text: {
    color: 'red'
  }
};

const Error = ({ error, message }) => (
  <div>
    {error && (
      <div style={styles.text}>
        <i>
          <strong>{message}</strong>
        </i>
      </div>
    )}
  </div>
);

Error.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string
};

export default Error;
