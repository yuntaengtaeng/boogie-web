import styled from 'styled-components';
import PropTypes from 'prop-types';
import { AiFillCaretDown } from 'react-icons/ai';
import { GRAY } from '../../constants/color';

const SelectBoxWrapper = styled.div`
  display: flex;

  .icon {
    margin-left: -1.75rem;
    align-self: center;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const StyledDropdown = styled.select`
  margin: 0;
  min-width: 0;
  display: block;
  width: 100%;
  padding: 0.5rem 0.5rem;
  border: 1px solid ${GRAY};
  border-radius: 0.25rem;
  color: inherit;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;

  ${({ invalid }) =>
    invalid &&
    `
        color : ${GRAY}
    `}
`;

const Dropdown = ({ options, defaultValue, placeholder, ...props }) => {
  const invalid = !props.value && !!placeholder;

  return (
    <SelectBoxWrapper>
      <StyledDropdown {...{ ...props, invalid }}>
        <option value="" hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={defaultValue === option.value}
          >
            {option.name}
          </option>
        ))}
      </StyledDropdown>
      <AiFillCaretDown className="icon" size={20} />
    </SelectBoxWrapper>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array,
};

export default Dropdown;
