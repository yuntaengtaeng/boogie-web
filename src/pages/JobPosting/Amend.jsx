import React, { useEffect, useState, useCallback } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import Edit from '../../components/Jobposting/Edit';
import { useDispatch, useSelector } from 'react-redux';
import uiSlice from '../../slices/ui';
import axios from 'axios';

const Amend = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [storedValue, setStoredValue] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      dispatch(uiSlice.actions.showLoading());

      try {
        const { data } = await axios.get(`api/employment?id=${id}`, {
          headers: {
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        });

        const {
          companyName,
          title,
          content,
          deadline,
          image,
          addressInformation,
          positionId,
        } = data;

        setStoredValue({
          companyName,
          title,
          content,
          image,
          positionId,
          deadline: new Date(deadline.replaceAll('.', '-')),
          address: JSON.parse(addressInformation),
        });
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
          return;
        }

        alert(error.message);
      } finally {
        dispatch(uiSlice.actions.hideLoading());
      }
    };

    getDetail();
  }, [accessToken, dispatch, id]);

  const onSubmit = useCallback(
    async (body) => {
      dispatch(uiSlice.actions.showLoading());

      try {
        const { data: isUpdated } = await axios.patch(
          `api/employment/${id}`,
          body,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
            },
          }
        );

        if (isUpdated) {
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
    [accessToken, dispatch, id, navigate]
  );

  return (
    <>
      {storedValue && (
        <Edit
          storedValue={storedValue}
          submitButtonText="수정하기"
          onSubmitHandler={onSubmit}
        />
      )}
    </>
  );
};

export default Amend;
