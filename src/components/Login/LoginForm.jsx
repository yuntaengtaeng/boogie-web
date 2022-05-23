import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import Button, { BUTTON_THEME } from '../../components/Ui/Button';
import Input from '../../components/Ui/Input';
import { GRAY } from '../../constants/color';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import uiSlce from '../../slices/ui';
import userSlice from '../../slices/user';
import axios from 'axios';

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

const StyledDiv = styled.div`
  color: ${GRAY};
  text-decoration: underline;
  margin-bottom: 1rem;
`;

const LoginForm = ({ successCallback }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const idRef = useRef(null);
  const passwordRef = useRef(null);

  const moveJoin = useCallback(() => {
    navigate('/join');
  }, [navigate]);

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
        const resposne = await axios.post('api/auth/login', {
          id,
          password,
        });

        const {
          data: { data },
        } = resposne;

        const { refreshToken, ...rest } = data;
        dispatch(userSlice.actions.setUser(rest));
        localStorage.setItem('refreshToken', refreshToken);

        successCallback();
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
    [dispatch, successCallback]
  );

  return (
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
        로그인
      </StyledButton>
      <StyledDiv onClick={moveJoin}>회원가입</StyledDiv>
      <StyledDiv>비밀번호 찾기</StyledDiv>
    </StyledForm>
  );
};

export default LoginForm;
