import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Button, { BUTTON_THEME } from '../../components/Ui/Button';
import Input from '../../components/Ui/Input';
import axios from 'axios';
import uiSlce from '../../slices/ui';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Container = styled.section`
  margin: 3rem auto 0rem auto;
  width: 30%;

  @media all and (max-width: 650px) {
    width: 80%;
  }
`;

const Row = styled.div`
  display: flex;
`;

const Label = styled.label`
  display: block;
  margin: 1rem 0px;
  text-align: left;
`;

const Certification = styled(Button)`
  min-width: 120px;

  @media all and (max-width: 479px) {
    min-width: 120px;
  }
`;

const ChangeButton = styled(Button)`
  margin: 2em auto;
  width: 100%;
  height: 3.5rem;
  font-size: 1.2rem;
`;

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState({
    new: '',
    confirm: '',
  });

  const inputRef = useRef([]);

  const isFullFill = Object.values(password).every((v) => !!v);

  const requestEmailFromServer = useCallback(async () => {
    const id = inputRef.current.id.value.trim();

    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!emailRegex.test(id)) {
      return;
    }

    dispatch(uiSlce.actions.showLoading());

    try {
      const resposne = await axios.post('api/auth/code/email', {
        id,
      });

      const {
        data: { isSend },
      } = resposne;

      setIsSendEmail(isSend);
    } catch (error) {
      setIsSendEmail(false);
      if (error.response) {
        alert(error.response.data.message);
        return;
      }

      alert(error.message);
    } finally {
      dispatch(uiSlce.actions.hideLoading());
    }
  }, [dispatch]);

  const requestAuthEmailFromServer = useCallback(async () => {
    const id = inputRef.current.id.value.trim();
    const code = inputRef.current.code.value.trim();

    if (!id || !code) {
      return;
    }

    dispatch(uiSlce.actions.showLoading());

    try {
      const resposne = await axios.post('api/auth/email', {
        id,
        code,
      });

      const {
        data: { isAuth },
      } = resposne;

      setIsValidEmail(isAuth);
    } catch (error) {
      setIsValidEmail(false);
      if (error.response) {
        alert(error.response.data.message);
        return;
      }

      alert(error.message);
    } finally {
      dispatch(uiSlce.actions.hideLoading());
    }
  }, [dispatch]);

  const onChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      setPassword({
        ...password,
        [name]: value,
      });
    },
    [password]
  );

  const changePassword = useCallback(async () => {
    const { new: newPassword, confirm: confirmPassword } = { ...password };
    const id = inputRef.current.id.value.trim();

    if (newPassword !== confirmPassword) {
      alert('비밀번호가 다릅니다.');
      return;
    }

    dispatch(uiSlce.actions.showLoading());

    try {
      const resposne = await axios.post('api/help/password', {
        id,
        password: newPassword,
        verifyPassword: confirmPassword,
      });

      const {
        data: { isSucceeded },
      } = resposne;

      if (isSucceeded) {
        navigate('/login');
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
  }, [dispatch, navigate, password]);

  return (
    <Container>
      <Label>아이디(이메일)</Label>
      <Row>
        <Input
          type="text"
          ref={(el) => (inputRef.current['id'] = el)}
          disabled={isSendEmail}
        />
        <Certification
          type="button"
          theme={BUTTON_THEME.PRIMARY}
          onClick={requestEmailFromServer}
          disabled={isSendEmail}
        >
          이메일 인증
        </Certification>
      </Row>
      <Label>이메일 인증 코드</Label>
      <Row>
        <Input
          type="text"
          ref={(el) => (inputRef.current['code'] = el)}
          disabled={isValidEmail}
        />
        <Certification
          type="button"
          theme={BUTTON_THEME.PRIMARY}
          onClick={requestAuthEmailFromServer}
          disabled={isValidEmail}
        >
          인증하기
        </Certification>
      </Row>
      <Label>새 비밀번호</Label>
      <Row>
        <Input
          value={password.new}
          name="new"
          disabled={!isValidEmail}
          onChange={onChange}
          type="password"
        ></Input>
      </Row>
      <Label>새 비밀번호 확인</Label>
      <Row>
        <Input
          value={password.confirm}
          name="confirm"
          disabled={!isValidEmail}
          onChange={onChange}
          type="password"
        ></Input>
      </Row>
      <ChangeButton
        type="button"
        theme={BUTTON_THEME.PRIMARY}
        disabled={!isFullFill}
        onClick={changePassword}
      >
        변경
      </ChangeButton>
    </Container>
  );
};

export default ResetPassword;
