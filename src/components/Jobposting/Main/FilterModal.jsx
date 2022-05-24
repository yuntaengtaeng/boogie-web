import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../Ui/Modal/Modal';
import axios from 'axios';
import SearchSelect from '../../Ui/SearchSelect';
import Button, { BUTTON_THEME } from '../../Ui/Button';
import Chip from '../../Ui/Chip';

import Header from '../../Ui/Modal/Header';

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
  padding: 4rem 0rem;

  > * {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`;

const FilterModal = ({ onClose, onSubmit, options }) => {
  const { position, region } = options;
  const [positionData, setPositionData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(position || []);
  const [selectedRegion, setSelectedRegion] = useState(region || []);

  useEffect(() => {
    const getDropdownData = async (url, key) => {
      try {
        const { data } = await axios.get(url);
        const renameList = data[key].map(({ id, name }) => ({
          value: id,
          name,
        }));
        return renameList;
      } catch (error) {
        Promise.reject(error);
      }
    };

    const getAllDropdownData = async () => {
      try {
        const [position, region] = await Promise.all([
          getDropdownData('api/category/job', 'jobCategoryList'),
          getDropdownData('api/category/region', 'regionList'),
        ]);

        setPositionData(position);
        setRegionData(region);
      } catch (error) {
        alert('필터 옵션을 불러오는데 실패했습니다.\n다시 시도해주세요.');
      }
    };

    getAllDropdownData();
  }, []);

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

  const applyButtonPressed = useCallback(() => {
    onSubmit({ position: selectedPosition, region: selectedRegion });
  }, [onSubmit, selectedPosition, selectedRegion]);

  return (
    <Modal>
      <Header onClose={onClose} />
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
