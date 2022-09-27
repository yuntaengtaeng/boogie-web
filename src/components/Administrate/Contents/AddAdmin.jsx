import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Form from '../AddAdmin/Form';
import AdminTable from '../AddAdmin/AdminTable';
import axios from 'axios';

import { addKeyList } from '../../../Utills/common';

const Wrap = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 0.6;
  margin-right: 1rem;
`;

const Right = styled.div`
  flex: 0.4;
`;

const AddAdmin = () => {
  const { accessToken } = useSelector((state) => state.user);
  const [list, setList] = useState([]);

  const getAdminList = async () => {
    try {
      const {
        data: { adminList },
      } = await axios.get('api/management/admin/list', {
        headers: {
          authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
        },
      });

      const addKeyAdminList = addKeyList(adminList, 'id');

      setList(addKeyAdminList);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return;
      }

      alert(error.message);
    }
  };

  useEffect(() => {
    if (!!accessToken) {
      getAdminList();
    }
  }, [accessToken]);

  const generateAdmin = () => {
    getAdminList();
  };

  const delteHandler = async (id) => {
    try {
      const {
        data: { adminList },
      } = await axios.delete(`api/management/admin/${id}`, {
        headers: {
          authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
        },
      });

      const addKeyAdminList = addKeyList(adminList, 'id');
      setList(addKeyAdminList);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return;
      }

      alert(error.message);
    }
  };

  return (
    <Wrap>
      <Left>
        <AdminTable list={list} onDeleteHandler={delteHandler} />
      </Left>
      <Right>
        <Form successCallback={generateAdmin} />
      </Right>
    </Wrap>
  );
};

export default AddAdmin;
