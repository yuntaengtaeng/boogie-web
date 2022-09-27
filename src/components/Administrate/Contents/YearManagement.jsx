import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import YearTable from '../YeasManagement/YearTable';
import Form from '../YeasManagement/Form';
import { useDispatch, useSelector } from 'react-redux';
import uiSlce from '../../../slices/ui';
import axios from 'axios';
import useGetCategory from '../../../hooks/useGetCategory';

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

const YearManagement = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((staet) => staet.user.accessToken);
  const [yearList, setYearList] = useState([]);

  useEffect(() => {
    const getYearCategory = async () => {
      dispatch(uiSlce.actions.showLoading());
      try {
        const resposne = await axios.get('api/category/year');

        setYearList(resposne.data.yearList);
      } catch (error) {
        alert(error.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    };
    getYearCategory();
  }, [dispatch]);

  const addYear = async (id) => {
    dispatch(uiSlce.actions.showLoading());
    try {
      const resposne = await axios.post(
        'api/category/year',
        {
          id,
        },
        {
          headers: {
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        }
      );
      setYearList(resposne.data.yearList);
      alert('연도 추가 완료');
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(uiSlce.actions.hideLoading());
    }
  };

  const onDeleteHandler = async (year) => {
    try {
      const resposne = await axios.delete(`api/category/year/${year}`, {
        headers: {
          authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
        },
      });
      setYearList(resposne.data.yearList);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Wrap>
      <Left>
        <YearTable yearCategorys={yearList} onDeleteHandler={onDeleteHandler} />
      </Left>
      <Right>
        <Form addYear={addYear} />
      </Right>
    </Wrap>
  );
};

export default YearManagement;
