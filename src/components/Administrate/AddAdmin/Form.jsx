import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import Button, { BUTTON_THEME } from '../../Ui/Button';
import Input from '../../Ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import uiSlce from '../../../slices/ui';

const StyledForm = styled.form`
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  text-align: left;
`;

const BottomLabel = styled(Label)`
  margin-top: 1rem;
`;

const StyledButton = styled(Button)`
  margin: 2rem auto;
`;
const Form = ({ successCallback }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((staet) => staet.user.accessToken);

  const idRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const id = idRef.current.value;
      const password = passwordRef.current.value;

      if (!id || !password) {
        return;
      }

      dispatch(uiSlce.actions.showLoading());

      try {
        const resposne = await axios.post(
          'api/management/admin',
          {
            id,
            password,
          },
          {
            headers: {
              authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
            },
          }
        );

        const {
          data: { isJoin },
        } = resposne;

        if (isJoin) {
          alert('관리자 가입 완료');
          idRef.current.value = '';
          passwordRef.current.value = '';
          successCallback();
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
          return;
        }

        alert(error.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    },
    [accessToken, dispatch]
  );

  return (
    <StyledForm onSubmit={onSubmit}>
      <Label>아이디</Label>
      <Input ref={idRef} type="text" />
      <BottomLabel>비밀번호</BottomLabel>
      <Input
        ref={passwordRef}
        type="password"
        autocomplete="current-password"
      />
      <StyledButton type="submit" theme={BUTTON_THEME.PRIMARY}>
        관리자 추가
      </StyledButton>
    </StyledForm>
  );
};

export default Form;
