import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import Button, { BUTTON_THEME } from '../../components/Ui/Button';
import Input from '../../components/Ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import uiSlce from '../../slices/ui';

const Container = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 10rem;
`;

const StyledForm = styled.form`
  margin: auto;
  text-align: center;
  width: 40%;

  @media all and (max-width: 479px) {
    width: 100%;
  }
`;

const Label = styled.label`
  display: block;
  margin: 1rem 0px;
  text-align: left;
`;

const StyledButton = styled(Button)`
  margin: 2rem auto;
`;

const Add = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((staet) => staet.user.accessToken);
  console.log(accessToken);

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
          'api/auth/admin',
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
    <Container>
      <StyledForm onSubmit={onSubmit}>
        <Label>아이디</Label>
        <Input ref={idRef} type="text" />
        <Label>비밀번호</Label>
        <Input
          ref={passwordRef}
          type="password"
          autocomplete="current-password"
        />
        <StyledButton type="submit" theme={BUTTON_THEME.PRIMARY}>
          관리자 추가
        </StyledButton>
      </StyledForm>
    </Container>
  );
};

export default Add;
