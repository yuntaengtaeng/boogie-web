import React, { useState } from 'react';

import styled from 'styled-components';

import Input from '../../Ui/Input';
import Button, { BUTTON_THEME } from '../../Ui/Button';
import BasicTable, { TableBodyCell } from '../../Ui/BasicTable';

import { useSelector } from 'react-redux';
import axios from 'axios';

import { addKeyList } from '../../../Utills/common';

import { useUserManagementDispatch, useUserManagementState } from './Context';

const Top = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 2rem;
`;

const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.4rem;

  p {
    margin-bottom: 0.4rem;
  }
`;

const thead = [
  {
    id: 'uniId',
    label: '학번',
  },
  {
    id: 'name',
    label: '이름',
  },
];

const UserTable = () => {
  const dispatch = useUserManagementDispatch();
  const { list, selectedUser } = useUserManagementState();

  const { accessToken } = useSelector((state) => state.user);
  const [query, setQuery] = useState({
    uniId: '',
    name: '',
  });

  const isValud = ['uniId', 'name'].some((key) => !!query[key]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setQuery({ ...query, [name]: value });
  };

  const searchUser = async () => {
    const queries = { ...query };

    const queryString = Object.entries(queries)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    try {
      const {
        data: { studentList },
      } = await axios.get(`api/management/student?${queryString}`, {
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

  const onRowClickHandler = (data) => {
    dispatch({ type: 'SET_USER', user: { ...data } });
  };

  return (
    <div>
      <Top>
        <InputItem>
          <p>학번</p>
          <Input name="uniId" value={query.uniId} onChange={onChangeHandler} />
        </InputItem>
        <InputItem>
          <p>이름</p>
          <Input name="name" value={query.name} onChange={onChangeHandler} />
        </InputItem>
        <Button
          theme={BUTTON_THEME.PRIMARY}
          disabled={!isValud}
          onClick={searchUser}
        >
          검색
        </Button>
      </Top>
      <BasicTable
        thead={thead}
        dataSource={list}
        createBody={(data) => (
          <>
            <TableBodyCell>{data.uniId}</TableBodyCell>
            <TableBodyCell>{data.name}</TableBodyCell>
          </>
        )}
        onRowClickHandler={onRowClickHandler}
        selectedRowId={selectedUser.key}
      />
    </div>
  );
};

export default UserTable;
