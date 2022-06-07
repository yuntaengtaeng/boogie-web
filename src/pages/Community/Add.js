import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import uiSlce from '../../slices/ui';

import axios from 'axios';

import Edit from '../../components/Community/Edit';

const Add = () => {
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (body) => {
      console.log(body);

      dispatch(uiSlce.actions.showLoading());

      try {
        const {
          data: { isPosted },
        } = await axios.post('api/community', body, {
          headers: {
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
        dispatch(uiSlce.actions.hideLoading());
      }
    },
    [accessToken, dispatch, navigate]
  );

  return <Edit submitButtonText="등록하기" onSubmitHandler={onSubmit} />;
};

export default Add;
