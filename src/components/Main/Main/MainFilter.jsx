import React from 'react';
import styled from 'styled-components';

import OutLineButton from '../../Ui/OutLineButton';
import DeleteOutLineButton from '../../Ui/DeleteOutLineButton';
import Modal from '../../Ui/Modal/Modal';
import Header from '../../Ui/Modal/Header';
import FilterForm from './FilterForm';

import { useMainState, useMainDispatch } from './MainContext';

const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  width: fit-content;
`;

const StyledSpan = styled.span`
  margin-bottom: 1rem;
`;

const FilterOptionDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const MainFilter = () => {
  const { isModalShowing, options } = useMainState();
  const { name, plattform, technology, classId } = options;
  const dispatch = useMainDispatch();

  const showModal = () => {
    dispatch({
      type: 'OPEN',
    });
  };

  const filterSatisfied =
    !!name ||
    plattform.length !== 0 ||
    technology.length !== 0 ||
    Object.keys(classId).length !== 0;

  const onDeleteClassNameHandler = () => {
    dispatch({ type: 'REMOVE_CLASSID' });
  };

  const onDeleteNameHandler = () => {
    dispatch({ type: 'REMOVE_NAME' });
  };

  const onDeletePlattformHandler = (item) => {
    dispatch({ type: 'REMOVE_PLATTFORM', item: item });
  };

  const onDeleteTechnologyHandler = (item) => {
    dispatch({ type: 'REMOVE_TECHNOLOGY', item: item });
  };

  return (
    <>
      <FilterDiv>
        <StyledSpan>
          <OutLineButton
            style={{ width: 'max-content' }}
            onClick={() => {
              showModal();
            }}
          >
            조건에 맞는 작품 찾기
          </OutLineButton>
        </StyledSpan>
        {filterSatisfied && (
          <FilterOptionDiv>
            {Object.keys(classId).length !== 0 && (
              <DeleteOutLineButton
                onDeleteHandler={() => {
                  onDeleteClassNameHandler();
                }}
              >
                {classId.name}
              </DeleteOutLineButton>
            )}
            {name && (
              <DeleteOutLineButton
                onDeleteHandler={() => {
                  onDeleteNameHandler();
                }}
              >
                {name}
              </DeleteOutLineButton>
            )}
            {plattform.length !== 0 &&
              plattform.map((v) => (
                <DeleteOutLineButton
                  key={v.value}
                  onDeleteHandler={() => {
                    onDeletePlattformHandler(v);
                  }}
                >
                  {v.name}
                </DeleteOutLineButton>
              ))}
            {technology.length !== 0 &&
              technology.map((v) => (
                <DeleteOutLineButton
                  key={v.value}
                  onDeleteHandler={() => {
                    onDeleteTechnologyHandler(v);
                  }}
                >
                  {v.name}
                </DeleteOutLineButton>
              ))}
          </FilterOptionDiv>
        )}
      </FilterDiv>
      {isModalShowing && (
        <Modal>
          <Header></Header>
          <FilterForm></FilterForm>
        </Modal>
      )}
    </>
  );
};

export default MainFilter;
