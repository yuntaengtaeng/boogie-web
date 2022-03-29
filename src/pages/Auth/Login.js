import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import Button, { BUTTON_THEME } from '../../components/Ui/Button';
import Input from '../../components/Ui/Input';
import { GRAY } from '../../constants/color';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import userSlice from '../../slices/user';
import uiSlce from '../../slices/ui';

const Container = styled.div`
  width: 80%;
  margin: auto;
`;

const Introduce = styled.div`
  margin-top: 2rem;
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  font-size: 1.4rem;
  color: ${GRAY};
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

const Join = styled.span`
  color: ${GRAY};
  text-decoration: underline;
`;

const Login = () => {
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

        navigate('/');
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
    [dispatch, navigate]
  );

  return (
    <Container>
      <Introduce>
        <Title>
          서일대를 위한
          <br />
          커리어 플랫폼, boogie on &#38; on!
        </Title>
        <SubTitle>
          커리어 성장과 행복을 위한 여정
          <br />
          지금 boogie on &#38; on에서 시작하세요.
        </SubTitle>
      </Introduce>
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
        <Join onClick={moveJoin}>회원가입</Join>
      </StyledForm>
    </Container>
  );
};

export default Login;
