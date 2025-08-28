import React from 'react';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchHistory = ({ history, onSelect, onClear, onClose }) => {
  const { selectedIndex, setSelectedIndex } = useKeyboardNavigation(
    history,
    onSelect,
    onClose
  );
  if (!history.length) return null;

  return (
    <div className="search-history">
      <div className="search-history-header">
        <FontAwesomeIcon icon={faClock} />
        <span>Recent Searches</span>
        <button onClick={onClear} className="clear-history">
          Clear
        </button>
      </div>
      <ul className="search-history-list">
        {history.map((term, index) => (
          <li
            key={index}
            onClick={() => onSelect(term)}
            onMouseEnter={() => setSelectedIndex(index)}
            className={`search-history-item ${selectedIndex === index ? 'selected' : ''}`}
          >
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <span>{term}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
