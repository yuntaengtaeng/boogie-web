import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SwiperBanner from '../../Ui/SwiperBanner';
import axios from 'axios';

const StyledHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledStrong = styled.strong`
  font-size: 3rem;
  font-weight: bold;
  line-height: 4rem;
  @media all and (max-width: 479px) {
    white-space: nowrap;
    font-size: 2rem;
    font-weight: bold;
    line-height: 2.5rem;
  }
`;

const StyledP = styled.p`
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  font-size: 1.4rem;
  @media all and (max-width: 479px) {
    word-break: keep-all;
    font-size: 1rem;
    line-height: 1.25rem;
  }
`;

const MainHeader = () => {
  const [bannerImgs, setBannerImgs] = useState([]);

  useEffect(() => {
    const getImgUrl = async () => {
      try {
        const imgList = await axios.get(`api/banner`);
        setBannerImgs(imgList.data.bannerImageList);
      } catch (e) {
        alert(e.message);
      }
    };

    getImgUrl();
  }, []);

  return (
    <StyledHeader>
      <StyledDiv>
        <StyledStrong>졸업 작품과</StyledStrong>
        <StyledStrong>채용 공고를</StyledStrong>
        <StyledStrong>찾는 가장 쉬운 방법</StyledStrong>
        <StyledP>작품을 구경해보세요.</StyledP>
      </StyledDiv>
      <SwiperBanner src={bannerImgs}></SwiperBanner>
    </StyledHeader>
  );
};

export default MainHeader;
