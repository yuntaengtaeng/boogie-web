import React, { useState, useCallback, useReducer } from 'react';
import styled from 'styled-components';
import Block from '../../components/Ui/Block';
import Button, { BUTTON_THEME } from '../../components/Ui/Button';
import Input from '../../components/Ui/Input';
import Line from '../../components/Ui/Line';
import { LIGHT_GRAY, WHITE } from '../../constants/color';
import AddressSearch from '../../components/Jobposting/Add/AddressSearch';
import { format } from 'date-fns';
import FloatingButton from '../../components/Jobposting/Add/FloatingButton';
import DetailInfo from '../../components/Jobposting/Add/DetailInfo';
import useGetCategory from '../../hooks/useGetCategory';
import { arrayToDropdownData } from '../../Utills/common';

const Container = styled.form`
  background-color: ${LIGHT_GRAY};
  height: 100vh;
  position: relative;
`;

const StyledInput = styled(Input)`
  border: none;
  padding: 0;
`;

const Textarea = styled.textarea`
  border: none;
  resize: none;
  height: 50vh;
  box-sizing: border-box;
  width: 100%;
  outline: none;
`;

const Section = styled.section`
  background-color: ${WHITE};
  box-sizing: border-box;
  padding: 2rem;
  width: 80%;
  margin: 1px auto;
`;

const StyledBlock = styled(Block)`
  background-color: ${WHITE};
  justify-content: flex-end;
`;

const initState = {
  companyName: '',
  title: '',
  content: '',
  address: '',
  deadline: '',
  positionId: null,
  image: null,
};

const formDataReducer = (state, action) => {
  const clone = { ...state };

  if (['INPUT', 'SELECT', 'DATE', 'FILE', 'ADDRESS'].includes(action.type)) {
    clone[action.name] = action.value;
    return clone;
  }

  return initState;
};

const Edit = ({ onSubmitHandler, storedValue, submitButtonText }) => {
  const [formData, reducerDispatch] = useReducer(
    formDataReducer,
    initState,
    (init) => {
      const cloneInit = { ...init };
      if (storedValue) {
        return { ...cloneInit, ...storedValue };
      }

      return cloneInit;
    }
  );

  const [isShowingAddressModal, setIsShowingAddressModal] = useState(false);

  const positionCategorys = useGetCategory('job');
  const positionData = arrayToDropdownData(positionCategorys);

  const addressSearchButtonPressed = useCallback(() => {
    setIsShowingAddressModal(true);
  }, []);

  const isValid = Object.values(formData).every((v) => !!v);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!isValid) {
        return;
      }

      const clone = { ...formData };

      const body = new FormData();

      ['companyName', 'title', 'content', 'positionId', 'image'].forEach(
        (key) => {
          body.append(key, clone[key]);
        }
      );
      body.append('address', JSON.stringify(clone.address));
      body.append('deadline', format(clone.deadline, 'yyyyMMdd'));

      onSubmitHandler(body);
    },
    [isValid, formData, onSubmitHandler]
  );

  return (
    <Container onSubmit={onSubmit}>
      <StyledBlock>
        {submitButtonText && (
          <Button
            theme={BUTTON_THEME.PRIMARY}
            disabled={!isValid}
            type="submit"
          >
            {submitButtonText}
          </Button>
        )}
      </StyledBlock>
      <Section>
        <StyledInput
          value={formData.companyName}
          placeholder="회사명을 입력해주세요."
          onChange={(event) => {
            reducerDispatch({
              type: 'INPUT',
              name: 'companyName',
              value: event.target.value,
            });
          }}
        />
        <Line />
        <StyledInput
          value={formData.title}
          placeholder="제목을 입력해주세요."
          onChange={(event) => {
            reducerDispatch({
              type: 'INPUT',
              name: 'title',
              value: event.target.value,
            });
          }}
        />
        <Line />
        <Textarea
          value={formData.content}
          placeholder="내용을 입력해주세요"
          onChange={(event) => {
            reducerDispatch({
              type: 'INPUT',
              name: 'content',
              value: event.target.value,
            });
          }}
        ></Textarea>
        <Line />
        <DetailInfo
          address={{
            onClick: addressSearchButtonPressed,
            address: formData?.address?.address,
          }}
          position={{
            positionId: formData.positionId,
            options: positionData,
            onChange: (event) => {
              reducerDispatch({
                type: 'SELECT',
                name: 'positionId',
                value: event.target.value,
              });
            },
          }}
          date={{
            deadline: formData.deadline,
            onChange: (date) => {
              reducerDispatch({
                type: 'DATE',
                name: 'deadline',
                value: date,
              });
            },
          }}
        ></DetailInfo>
      </Section>
      <FloatingButton
        count={Number(!!formData.image)}
        onChange={(e) => {
          const file = e.target.files[0];
          reducerDispatch({
            type: 'FILE',
            name: 'image',
            value: file || null,
          });
        }}
      ></FloatingButton>
      {isShowingAddressModal && (
        <AddressSearch
          onSelect={(address) => {
            reducerDispatch({
              type: 'ADDRESS',
              name: 'address',
              value: address || '',
            });
            setIsShowingAddressModal(false);
          }}
          onClose={() => {
            setIsShowingAddressModal(false);
          }}
        ></AddressSearch>
      )}
    </Container>
  );
};

export default Edit;
