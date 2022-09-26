import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, A11y } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Wrap = styled.div`
  width: 60vw;
  @media all and (max-width: 479px) {
    width: 100%;
  }
`;

const StyledImg = styled.img`
  border-radius: 1rem;
  opacity: 0.8;

  @media all and (max-width: 479px) {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const SwiperBanner = ({ src }) => {
  const slideList = (
    <>
      {src.map((v, i) => {
        return (
          <SwiperSlide key={i}>
            <StyledImg alt="메인이미지" src={v} />
          </SwiperSlide>
        );
      })}
    </>
  );
  return (
    <Wrap>
      <Swiper
        modules={[Pagination, Autoplay, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 2500 }}
        style={{ margin: '0' }}
      >
        {slideList}
      </Swiper>
    </Wrap>
  );
};

export default SwiperBanner;
