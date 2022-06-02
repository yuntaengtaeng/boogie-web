import React, { useCallback } from 'react';

import Edit from '../../components/Jobposting/Edit';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uiSlice from '../../slices/ui';

const Add = () => {
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (body) => {
      dispatch(uiSlice.actions.showLoading());

      try {
        const { data: isPosted } = await axios.post('api/employment', body, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        });

        if (isPosted) {
          navigate(-1);
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
          return;
        }

        alert(error.message);
      } finally {
        dispatch(uiSlice.actions.hideLoading());
      }
    },
    [accessToken, dispatch, navigate]
  );

  return <Edit onSubmitHandler={onSubmit} submitButtonText="등록하기" />;
};

export default Add;
