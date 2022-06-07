import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Form from '../../components/Main/Form';

const Add = () => {
  const { accessToken } = useSelector((state) => state.user);

  const postSenierProject = async (formData) => {
    try {
      const senierProject = await axios.post('api/senier-project', formData, {
        headers: {
          authorization: accessToken,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (e) {
      alert(e.message);
    } finally {
      window.history.back();
    }
  };

  return <Form isEdit={false} onDataHandler={postSenierProject}></Form>;
};

export default Add;
