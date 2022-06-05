import React, { useCallback, useState, useRef } from 'react';
import styled from 'styled-components';
import Input from '../../components/Ui/Input';
import Button, { BUTTON_THEME } from '../../components/Ui/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import uiSlce from '../../slices/ui';
import { useDispatch } from 'react-redux';
import { PRIMARY } from '../../constants/color';

const Title = styled.h1`
  color: ${PRIMARY};
  text-align: center;
  font-weight: bold;
  margin: 2rem;
  font-size: 3.5rem;
`;

const Form = styled.form`
  margin: auto;
  width: 30%;

  @media all and (max-width: 650px) {
    width: 80%;
  }
`;

const Row = styled.div`
  display: flex;
`;

const RaidoRow = styled(Row)`
  margin: 1rem 0px;
`;

const Certification = styled(Button)`
  min-width: 120px;

  @media all and (max-width: 479px) {
    min-width: 120px;
  }
`;

const SubmitButton = styled(Button)`
  margin: 2em auto;
  width: 100%;
  height: 3.5rem;
  font-size: 1.2rem;
`;

const Label = styled.label`
  display: block;
  margin: 1rem 0px;
  text-align: left;
`;

const Join = () => {
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [role, setRole] = useState('student');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputRef = useRef([]);

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

  const jobChangeHandler = (event) => {
    setRole(event.target.value);
  };

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!isSendEmail || !isValidEmail) {
        return;
      }

      const inputs = inputRef.current;
      const { body, isFullFill } = Object.entries(inputs).reduce(
        (data, [key, elem]) => {
          if (!!elem) {
            const value = elem.value.trim();

            if (!value) {
              data.isFullFill = false;
            }

            data.body[key] = value;
          }

          return data;
        },
        { body: {}, isFullFill: true }
      );

      if (!isFullFill) {
        return;
      }

      Object.assign(body, { isStudent: role === 'student' });

      dispatch(uiSlce.actions.showLoading());

      try {
        const resposne = await axios.post('api/auth/join', {
          ...body,
        });

        const {
          data: { isJoin },
        } = resposne;

        if (isJoin) {
          navigate('/');
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
    [dispatch, isSendEmail, isValidEmail, navigate, role]
  );

  return (
    <>
      <Title>Boogie</Title>
      <Form onSubmit={onSubmit}>
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
        <Label>닉네임</Label>
        <Input type="text" ref={(el) => (inputRef.current['nickname'] = el)} />
        <Label>비밀번호</Label>
        <Input
          type="password"
          ref={(el) => (inputRef.current['password'] = el)}
        />
        <Label>비밀번호 확인</Label>
        <Input
          type="password"
          ref={(el) => (inputRef.current['verifyPassword'] = el)}
        />
        <RaidoRow>
          <label htmlFor="student">
            학생
            <input
              id="student"
              value="student"
              name="role"
              type="radio"
              checked={role === 'student'}
              onChange={jobChangeHandler}
            />
          </label>
          <label htmlFor="basic">
            일반
            <input
              id="basic"
              value="basic"
              name="role"
              type="radio"
              checked={role === 'basic'}
              onChange={jobChangeHandler}
            />
          </label>
        </RaidoRow>
        {role === 'student' && (
          <>
            <Label>학번</Label>
            <Input type="text" ref={(el) => (inputRef.current['uniId'] = el)} />
            <Label>이름</Label>
            <Input type="text" ref={(el) => (inputRef.current['name'] = el)} />
            <Label>생년월일(8자리)</Label>
            <Input
              type="text"
              ref={(el) => (inputRef.current['birthday'] = el)}
            />
          </>
        )}
        <SubmitButton type="submit" theme={BUTTON_THEME.PRIMARY}>
          회원가입
        </SubmitButton>
      </Form>
    </>
  );
};

export default Join;
