import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddBanner from '../BannerManagement/AddBanner';
import BannerList from '../BannerManagement/BannerList';
import uiSlce from '../../../slices/ui';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Wrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
`;

const BannerManagement = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((staet) => staet.user.accessToken);

  const [bannerFiles, setBannerFiles] = useState([]);

  useEffect(() => {
    const getBannerList = async () => {
      dispatch(uiSlce.actions.showLoading());
      try {
        const resposne = await axios.get('api/management/banner', {
          headers: {
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        });
        setBannerFiles(resposne.data.bannerList);
      } catch (e) {
        alert(e.response.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    };

    getBannerList();
  }, [accessToken, dispatch]);

  const onDeleteHandler = async (e) => {
    const findIndex = bannerFiles.findIndex((v) => v === e);

    try {
      const resposne = await axios.delete(
        `api/management/banner/${bannerFiles[findIndex].key}`,
        {
          headers: {
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        }
      );
      setBannerFiles(resposne.data.bannerList);
    } catch (e) {
      alert(e.response.message);
    } finally {
      dispatch(uiSlce.actions.hideLoading());
    }
  };

  const addBanner = async (event) => {
    const formData = new FormData();
    if (bannerFiles.length <= 5) {
      formData.append(
        `bannerImage0`,
        event.target.files[0],
        event.target.files[0].name
      );

      dispatch(uiSlce.actions.showLoading());

      try {
        const resposne = await axios.post('api/management/banner', formData, {
          headers: {
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        });
        setBannerFiles(resposne.data.bannerList);
      } catch (e) {
        alert(e.response.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    }
  };

  console.log(bannerFiles);

  return (
    <Wrap>
      <BannerList
        list={bannerFiles}
        onDeleteHandler={onDeleteHandler}
      ></BannerList>
      <AddBanner addBanner={addBanner}></AddBanner>
    </Wrap>
  );
};

export default BannerManagement;
