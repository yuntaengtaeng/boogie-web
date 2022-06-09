import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uiSlice from '../../slices/ui';
import axios from 'axios';

import Form from '../../components/Main/Form';

const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken } = useSelector((state) => state.user);

  const postSenierProject = async (formData) => {
    dispatch(uiSlice.actions.showLoading());

    try {
      const senierProject = await axios.post('api/senier-project', formData, {
        headers: {
          authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate(-1);
    } catch (e) {
      alert(e.message);
    } finally {
      dispatch(uiSlice.actions.hideLoading());
    }
  };

  return <Form isEdit={false} onDataHandler={postSenierProject}></Form>;
};

export default Add;
