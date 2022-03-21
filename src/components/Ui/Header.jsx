import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BLACK } from '../../constants/color';
import { useSelector } from 'react-redux';

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
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
`;

const StyledLi = styled.li`
  margin-left: 2em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${BLACK};
`;

const Header = () => {
  const { email, nickName } = useSelector((state) => state.user);
  const isLoggiend = !!email;

  const logoutHandler = () => {
    console.log('logoutHandler');
  };

  return (
    <StyledHeader>
      <StyledTitle>
        <StyledLink to="/">Boogie on &#38; on</StyledLink>
      </StyledTitle>
      <nav>
        <StyledUl>
          <StyledLi>
            <StyledLink to="/jobposting">채용공고</StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink to="/community">커뮤니티</StyledLink>
          </StyledLi>
          {isLoggiend ? (
            <>
              <StyledLi>
                <StyledLink to={`/profile/detail/${email}`}>
                  {nickName} 님
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
