import React from 'react';
import styled from 'styled-components';
import { LIGHT_GRAY, GRAY } from '../../constants/color';

import IconRound from './IconRound';

const ICONS = [
  {
    src: `${process.env.PUBLIC_URL}/asset/footer/logo.png`,
    title: '학교홈페이지',
    url: 'http://hm.seoil.ac.kr/?kr',
  },
  {
    src: `${process.env.PUBLIC_URL}/asset/footer/youtube.png`,
    title: 'youtube',
    url: 'https://www.youtube.com/channel/UCyL95ai0tHvmtRzBLDmYLUQ',
  },
  {
    src: `${process.env.PUBLIC_URL}/asset/footer/blog.png`,
    title: 'blog',
    url: 'https://blog.naver.com/seoiluniv',
  },
  {
    src: `${process.env.PUBLIC_URL}/asset/footer/facebook.png`,
    title: 'facebook',
    url: 'https://www.facebook.com/seoiluniversity',
  },
  {
    src: `${process.env.PUBLIC_URL}/asset/footer/info.png`,
    title: '학과안내',
    url: 'https://www.youtube.com/watch?v=e9LKvSwHlnw',
  },
  {
    src: `${process.env.PUBLIC_URL}/asset/footer/logo.png`,
    title: '학과홈페이지',
    url: 'http://hm.seoil.ac.kr/software',
  },
];

const FooterWrap = styled.footer`
  background-color: ${LIGHT_GRAY};
  box-sizing: border-box;
  padding: 2rem;
  text-align: center;
`;

const Detail = styled.div`
  color: #777777;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  > * {
    margin-right: 0.2rem;
  }
`;

const TitleImg = styled.img`
  margin: 0.8rem 0;
`;

const MainText = styled.p`
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const TextWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  > * {
    margin-right: 0.2rem;
  }
`;

const Text = styled.span`
  font-size: 0.85rem;
`;

const Footer = () => {
  const iconPressed = (url) => {
    window.open(url, '_blank');
  };

  return (
    <FooterWrap>
      <Top>
        {ICONS.map(({ src, title, url }) => (
          <IconRound
            size={2.8125}
            onClick={iconPressed.bind(this, url)}
            key={url}
            color={GRAY}
          >
            <img src={src} title={title} alt={title} />
          </IconRound>
        ))}
      </Top>
      <TitleImg
        src="http://seoilsw.kr/data/designImages/TITLE_logo2_1634370376.png"
        alt="title"
      />
      <Detail>
        <TextWrap>
          <Text>서일대학교 소프트웨어공학과</Text>
          <Text>02192 서울특별시 중랑구 용마산로 90길 28</Text>
          <Text>TEL : 02.490.7398</Text>
          <Text>개인정보관리책임자 : 김희수 조교</Text>
        </TextWrap>
        <MainText>
          Copyright (c) 서일대학교 소프트웨어공학과. All Rights Reserved.
        </MainText>
      </Detail>
    </FooterWrap>
  );
};

export default Footer;
