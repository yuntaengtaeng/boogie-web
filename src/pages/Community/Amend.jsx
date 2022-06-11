import React, { useCallback, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import uiSlce from '../../slices/ui';

import axios from 'axios';

import Edit from '../../components/Community/Edit';

const Amend = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const {
        data: { content: contents },
      } = await axios.get(`api/community?id=${id}`, {
        headers: {
          authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
        },
      });

      const { categoryId, content, title } = contents;

      setData({
        categoryId,
        content,
        title,
      });
    };

    getData();
  }, [accessToken, id]);

  const onSubmit = useCallback(
    async (body) => {
      dispatch(uiSlce.actions.showLoading());

      try {
        const {
          data: { isUpdated },
        } = await axios.patch(`api/community/${id}`, body, {
          headers: {
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        });

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
        dispatch(uiSlce.actions.hideLoading());
      }
    },
    [accessToken, dispatch, id, navigate]
  );

  return (
    <>
      {data && (
        <Edit
          submitButtonText="수정하기"
          onSubmitHandler={onSubmit}
          storedValue={data}
        />
      )}
    </>
  );
};

export default Amend;
