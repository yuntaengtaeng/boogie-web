import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../Ui/Button';
import SearchSelect from '../../Ui/SearchSelect';
import Chip from '../../Ui/Chip';
import Input from '../../Ui/Input';

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

const FilterForm = ({
  plattformList,
  technologyList,
  classList,
  onFilterOptionHandler,
  item,
  hideModal,
}) => {
  const [name, setName] = useState(item.name || '');
  const [plattform, setPlattform] = useState(item.plattform);
  const [technology, setTechnology] = useState(item.technology);
  const [classId, setClassId] = useState(item.classId);

  const onPlatformsItemHandler = (e) => {
    const find = plattform.find((element) => element.name === e.name);
    if (!find) {
      const item = [...plattform, e];
      setPlattform(item);
    } else {
      alert('중복입니다.');
    }
  };

  const onTechnologysItemHandler = (e) => {
    const find = technology.find((element) => element.value === e.value);
    if (!find) {
      const item = [...technology, e];
      setTechnology(item);
    } else {
      alert('중복입니다.');
    }
  };

  const onClassIdItemHandler = (e) => {
    setClassId(e);
  };

  const onPlatformsDeleteHandler = (e) => {
    const filter = plattform.filter((v) => v !== e);
    setPlattform(filter);
  };

  const onTechnologyDeleteHandler = (e) => {
    const filter = technology.filter((v) => v !== e);
    setTechnology(filter);
  };

  const onClassIdDeleteHandler = () => {
    setClassId({});
  };

  const onHandlerSubmit = (e) => {
    e.preventDefault();

    onFilterOptionHandler({
      name,
      plattform,
      technology,
      classId,
    });
    hideModal();
  };
  return (
    <StyledForm onSubmit={onHandlerSubmit}>
      <Input
        style={{ width: '100%', marginBottom: '64px' }}
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
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
      {plattform && (
        <StyledDiv>
          {plattform.map((v) => (
            <div
              style={{ marginRight: '8px', marginBottom: '8px' }}
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
      {technology && (
        <StyledDiv>
          {technology.map((v) => (
            <div
              style={{ marginRight: '8px', marginBottom: '8px' }}
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
      {Object.keys(classId).length !== 0 && (
        <StyledDiv>
          <div style={{ marginRight: '8px', marginBottom: '8px' }}>
            <Chip onDeleteHandler={() => onClassIdDeleteHandler()}>
              {classId.name}
            </Chip>
          </div>
        </StyledDiv>
      )}
      <Button type="submit">적용</Button>
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
