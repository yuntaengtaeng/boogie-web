import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BLACK } from '../../../constants/color';
import { useSelector } from 'react-redux';
import ProfileImage from '../ProfileImage';

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

const StyledLi = styled.li`
  margin-left: 2em;
  font-size: 1rem;
`;

const Logout = styled(StyledLi)`
  font-weight: 300;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${BLACK};
`;

const ProfileMenu = styled(StyledLink)`
  display: flex;
  align-items: center;
`;

const Web = ({ onLogoutHandler }) => {
  const { email, nickname, isAdmin, profileImage } = useSelector(
    (state) => state.user
  );
  const isLoggiend = !!email;

  return (
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
              <ProfileMenu to={`/profile/detail/${email}`}>
                <ProfileImage size={20} src={profileImage} />
                {nickname} 님
              </ProfileMenu>
            </StyledLi>
            <Logout onClick={onLogoutHandler}>로그아웃</Logout>
          </>
        ) : (
          <StyledLi>
            <StyledLink to="/login">로그인/회원가입</StyledLink>
          </StyledLi>
        )}
      </StyledUl>
    </nav>
  );
};

export default Web;
