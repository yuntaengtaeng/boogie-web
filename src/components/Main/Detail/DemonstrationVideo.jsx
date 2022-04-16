import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import uiSlce from '../../../slices/ui';

const StyledIframe = styled.iframe`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const DemonstrationVideo = ({ id }) => {
  const dispatch = useDispatch();
  const [videoUrl, setVideoUrl] = useState([]);

  useEffect(() => {
    const getVideoUrl = async () => {
      dispatch(uiSlce.actions.showLoading());
      try {
        const announced = await axios.get(
          `api/senier-project/announced?id=${id}`
        );
        setVideoUrl(announced.data.link);
      } catch (e) {
        alert(e.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    };

    getVideoUrl();
  }, [id]);

  return (
    <>
      {videoUrl.length === 0 ||
        videoUrl.map((v, i) => (
          <StyledIframe
            key={i}
            style={{ width: '720px', height: '450px', marginBottom: '50px' }}
            allowFullScreen
            src={v}
            frameBorder="0"
          ></StyledIframe>
        ))}
    </>
  );
};

DemonstrationVideo.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DemonstrationVideo;
