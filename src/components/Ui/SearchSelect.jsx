import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import { AiFillCaretDown } from 'react-icons/ai';
import styled from 'styled-components';
import Input from './Input';

const Autocomplete = styled.div`
  position: relative;
  display: flex;

  .icon {
    margin-left: -28px;
    align-self: center;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  width: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const SearchResults = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Items = styled.li`
  padding: 0.75rem 1rem;
  cursor: pointer;
`;

const SearchSelect = ({ options, placeholder, onSelectItemHandler, style }) => {
  const dropdownRef = useRef(null);
  const [results, setResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const filterMethod = useCallback((optionList, query) => {
    return optionList.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
  }, []);

  useEffect(() => {
    setResults(options);
  }, [options]);

  const searchList = useCallback(
    (event) => {
      const findResults = filterMethod([...options], event.target.value);
      setResults(findResults);
    },
    [filterMethod, options]
  );

  const showDropdown = useCallback(() => {
    setDropdownVisible(true);
  }, []);

  const hideDropdown = useCallback(() => {
    setDropdownVisible(false);
  }, []);

  const selectItem = useCallback(
    (item) => {
      onSelectItemHandler(item);
      hideDropdown();
    },
    [hideDropdown, onSelectItemHandler]
  );

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownVisible(!dropdownVisible);
      }
    };

    if (dropdownVisible) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [dropdownVisible]);

  return (
    <Autocomplete ref={dropdownRef} style={style}>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={searchList}
        onFocus={showDropdown}
      />
      <AiFillCaretDown className="icon" size={24} />
      {dropdownVisible && (
        <Dropdown>
          <SearchResults>
            {results.map(({ value, name }) => (
              <Items
                key={value}
                onClick={() => {
                  selectItem({ value, name });
                }}
              >
                {name}
              </Items>
            ))}
          </SearchResults>
        </Dropdown>
      )}
    </Autocomplete>
  );
};

SearchSelect.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onSelectItemHandler: PropTypes.func,
};

export default SearchSelect;
