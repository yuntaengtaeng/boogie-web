import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import OutLineButton from '../../Ui/OutLineButton';
import Modal from '../../Ui/Modal/Modal';
import Header from '../../Ui/Modal/Header';
import FilterForm from './FilterForm';

const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
  width: fit-content;
`;

const StyledSpan = styled.span`
  margin-bottom: 1rem;
`;

const FilterOptionDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const MainFilter = ({ filterOption, onFilterOptionHandler }) => {
  const [plattformList, setPlattformList] = useState([]);
  const [technologyList, setTechnologyList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [isShowingModal, setIsShowingModal] = useState(false);

  const showModal = () => {
    setIsShowingModal(true);
  };

  const hideModal = () => {
    setIsShowingModal(false);
  };

  useEffect(() => {
    const renameKeys = (arr) => {
      const rename = arr.map(({ id, name }) => ({
        value: id,
        name,
      }));
      return rename;
    };

    const getList = async () => {
      try {
        const [plattform, technology, classID] = await Promise.all([
          await axios.get('api/category/plattform'),
          await axios.get('api/category/technology'),
          await axios.get('api/category/class'),
        ]);

        setPlattformList([...renameKeys(plattform.data.plattformList)]);
        setTechnologyList([...renameKeys(technology.data.technologyList)]);
        setClassList([...renameKeys(classID.data.classList)]);
      } catch (e) {
        alert(e.message);
      }
    };
    getList();
  }, []);

  const filterSatisfied =
    !!filterOption.name ||
    filterOption.plattform.length !== 0 ||
    filterOption.technology.length !== 0 ||
    Object.keys(filterOption.classID).length !== 0;

  return (
    <>
      <FilterDiv>
        <StyledSpan>
          <OutLineButton
            onClick={() => {
              showModal();
            }}
          >
            조건에 맞는 작품 찾기
          </OutLineButton>
        </StyledSpan>
        {filterSatisfied && (
          <FilterOptionDiv>
            {Object.keys(filterOption.classID).length !== 0 && (
              <OutLineButton>{filterOption.classID.name}</OutLineButton>
            )}
            {filterOption.name && (
              <OutLineButton>{filterOption.name}</OutLineButton>
            )}
            {filterOption.plattform.length !== 0 &&
              filterOption.plattform.map((v) => (
                <OutLineButton key={v.value}>{v.name} </OutLineButton>
              ))}
            {filterOption.technology.length !== 0 &&
              filterOption.technology.map((v) => (
                <OutLineButton key={v.value}>{v.name} </OutLineButton>
              ))}
          </FilterOptionDiv>
        )}
      </FilterDiv>
      {isShowingModal && (
        <Modal>
          <Header
            onClose={() => {
              hideModal();
            }}
          ></Header>
          <FilterForm
            plattformList={plattformList}
            technologyList={technologyList}
            classList={classList}
            onFilterOptionHandler={onFilterOptionHandler}
            item={filterOption}
            hideModal={hideModal}
          ></FilterForm>
        </Modal>
      )}
    </>
  );
};

export default MainFilter;
