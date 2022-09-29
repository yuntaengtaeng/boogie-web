import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../Ui/Button';
import SearchSelect from '../../Ui/SearchSelect';
import Chip from '../../Ui/Chip';
import Input from '../../Ui/Input';

import useGetCategory from '../../../hooks/useGetCategory';
import { arrayToDropdownData } from '../../../Utills/common';
import { useMainState, useMainDispatch } from './MainContext';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50vw;
  max-height: 80vh;

  @media all and (max-width: 479px) {
    width: 80vw;
  }

  .box {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .box::-webkit-scrollbar {
    display: none;
  }
`;

const StyledDiv = styled.div`
  display: inline-flex;

  @media all and (max-width: 479px) {
    display: flex;
    flex-direction: column;
    width: 250px;
    margin-bottom: 8px;
  }
`;

const FilterForm = () => {
  const plattformList = arrayToDropdownData(useGetCategory('plattform'));
  const technologyList = arrayToDropdownData(useGetCategory('technology'));
  const classList = arrayToDropdownData(useGetCategory('class'));

  const dispatch = useMainDispatch();
  const { options } = useMainState();
  const { name, plattform, technology, classId } = options;

  const [selectedName, setSelectedName] = useState(name || '');
  const [selectedPlattform, setSelectedPlattform] = useState(plattform);
  const [selectedTechnology, setSelectedTechnology] = useState(technology);
  const [selectedClassId, setSelectedClassId] = useState(classId);

  const onPlatformsItemHandler = (e) => {
    const find = selectedPlattform.find((element) => element.name === e.name);
    if (!find) {
      const item = [...selectedPlattform, e];
      setSelectedPlattform(item);
    } else {
      return;
    }
  };

  const onTechnologysItemHandler = (e) => {
    const find = selectedTechnology.find(
      (element) => element.value === e.value
    );
    if (!find) {
      const item = [...selectedTechnology, e];
      setSelectedTechnology(item);
    } else {
      return;
    }
  };

  const onClassIdItemHandler = (e) => {
    setSelectedClassId(e);
  };

  const onPlatformsDeleteHandler = (e) => {
    const filter = plattform.filter((v) => v !== e);
    setSelectedPlattform(filter);
  };

  const onTechnologyDeleteHandler = (e) => {
    const filter = technology.filter((v) => v !== e);
    setSelectedTechnology(filter);
  };

  const onClassIdDeleteHandler = () => {
    setSelectedClassId({});
  };

  const onHandlerSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: 'OVERWRITE',
      name: selectedName,
      plattform: selectedPlattform,
      technology: selectedTechnology,
      classId: selectedClassId,
    });

    dispatch({
      type: 'CLOSE',
    });
  };
  return (
    <StyledForm onSubmit={onHandlerSubmit}>
      <Input
        style={{ width: '100%', marginBottom: '64px' }}
        type="text"
        placeholder="이름"
        value={selectedName}
        onChange={(e) => {
          setSelectedName(e.target.value);
        }}
      ></Input>
      <SearchSelect
        style={{
          width: '100%',
          marginBottom: '56px',
        }}
        placeholder="플랫폼"
        options={plattformList}
        onSelectItemHandler={onPlatformsItemHandler}
      ></SearchSelect>
      {selectedPlattform && (
        <StyledDiv>
          {selectedPlattform.map((v) => (
            <div
              style={{ marginRight: '0.5rem', marginBottom: '1rem' }}
              key={v.name}
            >
              <Chip onDeleteHandler={() => onPlatformsDeleteHandler(v)}>
                {v.name}
              </Chip>
            </div>
          ))}
        </StyledDiv>
      )}
      <SearchSelect
        style={{
          width: '100%',
          marginBottom: '56px',
        }}
        placeholder="기술"
        options={technologyList}
        onSelectItemHandler={onTechnologysItemHandler}
      ></SearchSelect>
      {selectedTechnology && (
        <StyledDiv>
          {selectedTechnology.map((v) => (
            <div
              style={{ marginRight: '0.5rem', marginBottom: '1rem' }}
              key={v.name}
            >
              <Chip onDeleteHandler={() => onTechnologyDeleteHandler(v)}>
                {v.name}
              </Chip>
            </div>
          ))}
        </StyledDiv>
      )}
      <SearchSelect
        style={{
          width: '100%',
          marginBottom: '64px',
        }}
        placeholder="반"
        options={classList}
        onSelectItemHandler={onClassIdItemHandler}
      ></SearchSelect>
      {Object.keys(selectedClassId).length !== 0 && (
        <StyledDiv>
          <div style={{ marginRight: '0.5rem', marginBottom: '1rem' }}>
            <Chip onDeleteHandler={() => onClassIdDeleteHandler()}>
              {selectedClassId.name}
            </Chip>
          </div>
        </StyledDiv>
      )}
      <Button style={{ marginTop: '5rem' }} type="submit">
        적용
      </Button>
    </StyledForm>
  );
};

FilterForm.propTypes = {
  plattformList: PropTypes.array,
  technologyList: PropTypes.array,
  onFilterOptionHandler: PropTypes.func,
  hideModal: PropTypes.func,
  item: PropTypes.object,
};

export default FilterForm;
