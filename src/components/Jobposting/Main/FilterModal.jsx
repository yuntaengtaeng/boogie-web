import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../Ui/Modal/Modal';
import SearchSelect from '../../Ui/SearchSelect';
import Button, { BUTTON_THEME } from '../../Ui/Button';
import Chip from '../../Ui/Chip';

import Header from '../../Ui/Modal/Header';
import useGetCategory from '../../../hooks/useGetCategory';
import { arrayToDropdownData } from '../../../Utills/common';

import { useJobState, useJobDispatch } from './Context';

const Container = styled.div`
  width: 50vw;

  @media all and (max-width: 479px) {
    width: 80vw;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const ChipsArea = styled.div`
  padding: 3rem 0rem;

  > * {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`;

const FilterModal = () => {
  const { options } = useJobState();
  const jobDispatch = useJobDispatch();

  const closeModal = () => {
    jobDispatch({ type: 'CLOSE' });
  };

  const { position, region } = options;

  const positionCategorys = useGetCategory('job');
  const positionData = arrayToDropdownData(positionCategorys);

  const regionCategorys = useGetCategory('region');
  const regionData = arrayToDropdownData(regionCategorys);

  const [selectedPosition, setSelectedPosition] = useState(position || []);
  const [selectedRegion, setSelectedRegion] = useState(region || []);

  const onSelctPosition = useCallback(
    (position) => {
      const clone = [...selectedPosition];
      const exceptingIndex = clone.findIndex(
        ({ name, value }) => name === position.name && value === position.value
      );

      if (exceptingIndex > -1) {
        return;
      }
      setSelectedPosition([...selectedPosition, position]);
    },
    [selectedPosition]
  );

  const onDeletePosition = useCallback(
    (position) => {
      const clone = [...selectedPosition];
      const exceptingIndex = clone.findIndex(
        ({ name, value }) => name === position.name && value === position.value
      );

      if (exceptingIndex > -1) {
        clone.splice(exceptingIndex, 1);
      }

      setSelectedPosition(clone);
    },
    [selectedPosition]
  );

  const onSelectRegion = useCallback(
    (region) => {
      const clone = [...selectedRegion];
      const exceptingIndex = clone.findIndex(
        ({ name, value }) => name === region.name && value === region.value
      );

      if (exceptingIndex > -1) {
        return;
      }

      setSelectedRegion([...selectedRegion, region]);
    },
    [selectedRegion]
  );

  const onDeleteRegion = useCallback(
    (region) => {
      const clone = [...selectedRegion];
      const exceptingIndex = clone.findIndex(
        ({ name, value }) => name === region.name && value === region.value
      );

      if (exceptingIndex > -1) {
        clone.splice(exceptingIndex, 1);
      }

      setSelectedRegion(clone);
    },
    [selectedRegion]
  );

  const applyButtonPressed = () => {
    jobDispatch({
      type: 'OVERWRITE',
      position: selectedPosition,
      region: selectedRegion,
    });
    jobDispatch({ type: 'CLOSE' });
  };

  return (
    <Modal>
      <Header onClose={closeModal} />
      <Container>
        <SearchSelect
          options={positionData}
          placeholder="채용 포지션"
          onSelectItemHandler={onSelctPosition}
        ></SearchSelect>
        <ChipsArea>
          {selectedPosition.map(({ name, value }) => (
            <Chip
              key={value}
              onDeleteHandler={onDeletePosition.bind(this, { name, value })}
            >
              {name}
            </Chip>
          ))}
        </ChipsArea>
        <SearchSelect
          options={regionData}
          placeholder="지역"
          onSelectItemHandler={onSelectRegion}
        ></SearchSelect>
        <ChipsArea>
          {selectedRegion.map(({ name, value }) => (
            <Chip
              key={value}
              onDeleteHandler={onDeleteRegion.bind(this, { name, value })}
            >
              {name}
            </Chip>
          ))}
        </ChipsArea>
        <StyledButton theme={BUTTON_THEME.PRIMARY} onClick={applyButtonPressed}>
          적용
        </StyledButton>
      </Container>
    </Modal>
  );
};

export default FilterModal;
