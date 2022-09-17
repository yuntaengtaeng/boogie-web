import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BLACK, WHITE } from '../../constants/color';
import { useDispatch } from 'react-redux';
import userSlice from '../../slices/user';
import useDeviceDetect from '../../hooks/useDeviceDetect';

import Web from './Header/Web';
import Mobile from './Header/Mobile';

const StyledHeader = styled.header`
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: right;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: sticky;
  top: 0;
  background-color: ${WHITE};
  z-index: 5;
`;

const StyledImg = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.4rem;
`;

const StyledTitle = styled.h3`
  margin-right: auto;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${BLACK};
  display: flex;
  align-items: center;
`;

const Header = () => {
  const { isMobile } = useDeviceDetect();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem('refreshToken');
    dispatch(userSlice.actions.initUser());

    const { pathname } = location;

    //프로필 상세인 경우에만 로그아웃 시 메인으로 이동
    if (pathname.includes('/profile/detail/')) {
      navigate('/');
    }
  };

  return (
    <StyledHeader>
      <StyledTitle>
        <StyledLink to="/">
          <StyledImg
            alt="로고이미지"
            src={process.env.PUBLIC_URL + '/asset/header/logo.png'}
          />
          소프트웨어공학과
        </StyledLink>
      </StyledTitle>
      {isMobile ? (
        <Mobile onLogoutHandler={logoutHandler} />
      ) : (
        <Web onLogoutHandler={logoutHandler} />
      )}
    </StyledHeader>
  );
};

export default Header;
