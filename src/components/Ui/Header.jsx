import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BLACK } from '../../constants/color';
import { useSelector, useDispatch } from 'react-redux';
import userSlice from '../../slices/user';

const StyledHeader = styled.header`
  width: 100%;
  height: 56px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: right;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const StyledTitle = styled.h3`
  margin-right: auto;
  font-weight: bold;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
`;

const StyledLi = styled.li`
  margin-left: 2em;
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${BLACK};
`;

const Header = () => {
  const dispatch = useDispatch();
  const { email, nickname, isAdmin } = useSelector((state) => state.user);
  const isLoggiend = !!email;

  const logoutHandler = () => {
    localStorage.removeItem('refreshToken');
    dispatch(userSlice.actions.initUser());
  };

  return (
    <StyledHeader>
      <StyledTitle>
        <StyledLink to="/">졸업 작품 전시회</StyledLink>
      </StyledTitle>
      <nav>
        <StyledUl>
          <StyledLi>
            <StyledLink to="/jobposting">채용공고</StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink to="/community">커뮤니티</StyledLink>
          </StyledLi>
          {isAdmin && (
            <StyledLi>
              <StyledLink to="/admin/add">관리자 추가</StyledLink>
            </StyledLi>
          )}
          {isLoggiend ? (
            <>
              <StyledLi>
                <StyledLink to={`/profile/detail/${email}`}>
                  {nickname} 님
                </StyledLink>
              </StyledLi>
              <StyledLi onClick={logoutHandler}>로그아웃</StyledLi>
            </>
          ) : (
            <StyledLi>
              <StyledLink to="/login">로그인/회원가입</StyledLink>
            </StyledLi>
          )}
        </StyledUl>
      </nav>
    </StyledHeader>
  );
};

export default Header;
