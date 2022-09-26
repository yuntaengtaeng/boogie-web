import axios from 'axios';
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Button, { BUTTON_THEME } from '../../Ui/Button';
import Input from '../../Ui/Input';

import { useSelector } from 'react-redux';

import { useUserManagementState, useUserManagementDispatch } from './Context';

import { addKeyList } from '../../../Utills/common';

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

const Form = () => {
  const dispatch = useUserManagementDispatch();
  const { selectedUser } = useUserManagementState();
  const { accessToken } = useSelector((state) => state.user);

  const isExistSelectedUser = JSON.stringify(selectedUser) !== '{}';

  const [userData, setUserData] = useState({
    uniId: '',
    name: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (isExistSelectedUser) {
      const { uniId, name } = selectedUser;
      setUserData({ uniId, name });
    }
  }, [isExistSelectedUser, selectedUser]);

  const onModifyHandler = async (event) => {
    event.preventDefault();
    const body = { ...userData, id: selectedUser.id };

    try {
      const {
        data: { studentList },
      } = await axios.patch('api/management/student', body, {
        headers: {
          authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
        },
      });

      dispatch({ type: 'SET_LIST', list: addKeyList(studentList, 'id') });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return;
      }

      alert(error.message);
    }
  };

  return (
    <StyledForm onSubmit={onModifyHandler}>
      <Label>학번</Label>
      <Input onChange={onChangeHandler} name="uniId" value={userData.uniId} />
      <BottomLabel>이름</BottomLabel>
      <Input onChange={onChangeHandler} name="name" value={userData.name} />
      <StyledButton
        type="submit"
        theme={BUTTON_THEME.PRIMARY}
        disabled={!isExistSelectedUser}
      >
        수정
      </StyledButton>
    </StyledForm>
  );
};

export default Form;
