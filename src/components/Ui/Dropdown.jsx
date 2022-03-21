import styled from 'styled-components';
import PropTypes from 'prop-types';
import { AiFillCaretDown } from 'react-icons/ai';
import { GRAY } from '../../constants/color';

const SelectBoxWrapper = styled.div`
  display: flex;

  .icon {
    margin-left: -28px;
    align-self: center;
    width: 24px;
    height: 24px;
  }
`;

const StyledDropdown = styled.select`
  margin: 0;
  min-width: 0;
  display: block;
  width: 100%;
  padding: 8px 8px;
  border: 1px solid ${GRAY};
  border-radius: 4px;
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
  return (
    <SelectBoxWrapper>
      <StyledDropdown {...{ ...props, invalid: !props.value }}>
        {placeholder && (
          <option value="" hidden>
            {placeholder}
          </option>
        )}
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
