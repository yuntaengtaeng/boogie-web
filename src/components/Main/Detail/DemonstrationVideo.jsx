import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import uiSlce from '../../../slices/ui';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIframe = styled.iframe`
  box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.19),
    0 0.375rem 0.375rem rgba(0, 0, 0, 0.23);
  width: 720px;
  height: 450px;
  margin-bottom: 50px;

  @media all and (max-width: 479px) {
    box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.19),
      0 0.375rem 0.375rem rgba(0, 0, 0, 0.23);
    width: 90%;
    height: fit-content;
  }
`;

const DemonstrationVideo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState([]);

  useEffect(() => {
    const getVideoUrl = async () => {
      dispatch(uiSlce.actions.showLoading());
      try {
        const announced = await axios.get(
          `api/senier-project/detail/announced?id=${id}`
        );
        setVideoUrl(announced.data.link);
      } catch (e) {
        alert(e.response.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    };

    getVideoUrl();
  }, [dispatch, id]);

  return (
    <Wrap>
      {videoUrl.length === 0 ||
        videoUrl.map((v, i) => (
          <StyledIframe
            key={i}
            allowFullScreen
            src={v}
            frameBorder="0"
          ></StyledIframe>
        ))}
    </Wrap>
  );
};

export default DemonstrationVideo;
