import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ErrorMessage = ({ message, retry = null }) => {
  return (
    <div className="error-message-container">
      <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
      <p>{message}</p>
      {retry && (
        <button onClick={retry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
