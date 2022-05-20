import React from 'react';
import styled from 'styled-components';
import SearchSelect from '../Ui/SearchSelect';
import Chip from '../Ui/Chip';

const StyledP = styled.p`
  font-size: 1.5rem;
  margin-right: 5rem;
  margin-bottom: 1rem;
`;

const ChipsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 15rem;
  gap: 1rem;
  margin: 1rem 0;
`;

const SelectGroub = ({
  onDeleteHandler,
  selectedItems,
  onSelectItemHandler,
  options,
  isMe,
  name,
}) => {
  return (
    <>
      <StyledP>{name}</StyledP>
      {isMe && (
        <SearchSelect
          style={{
            width: '15rem',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
          placeholder={name}
          options={options}
          onSelectItemHandler={onSelectItemHandler}
        />
      )}
      {selectedItems.length !== 0 && (
        <ChipsDiv>
          {selectedItems.map((v) => (
            <Chip
              key={v.value}
              onDeleteHandler={
                isMe
                  ? () => {
                      onDeleteHandler(v);
                    }
                  : null
              }
            >
              {v.name}
            </Chip>
          ))}
        </ChipsDiv>
      )}
    </>
  );
};

export default SelectGroub;
