import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import ProfileImage from '../ProfileImage';
import Button, { BUTTON_THEME } from '../Button';
import Backdrop from '../Modal/Backdrop';

import { VscMenu, VscClose, VscChevronRight } from 'react-icons/vsc';
import { WHITE, PRIMARY, BLACK, LIGHT_GRAY } from '../../../constants/color';

const SideMenuWrap = styled.div`
  width: 80vw;
  height: 100vh;
  background-color: ${WHITE};
  position: fixed;
  z-index: 100;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 2rem;
`;

const Top = styled.div`
  background-color: ${PRIMARY};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bottom = styled.div`
  background-color: ${LIGHT_GRAY};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  background-color: ${WHITE};
  border-radius: 8px;
  width: 80%;
  padding: 1rem;
  margin: 0 auto;
`;

const StyledLi = styled.li`
  font-size: 1rem;
  border-bottom: 1px solid ${LIGHT_GRAY};
  padding: 0.4rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${BLACK};
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  justify-content: space-between;
`;

const ProfileMenu = styled(Link)`
  text-decoration: none;
  color: ${WHITE};
  display: flex;
  align-items: center;
  font-size: 1.4rem;
`;

const StyledButton = styled(Button)`
  margin: 2rem auto;
  /* width: 100%; */
  /* height: 3.5rem; */
  font-size: 1.3rem;
`;

const Mobile = ({ onLogoutHandler }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isShowing, setIsShowing] = useState(false);

  const openSideMenu = () => {
    setIsShowing(true);
  };

  const closeSideMenu = () => {
    setIsShowing(false);
  };

  const { email, nickname, profileImage } = useSelector((state) => state.user);
  const isLoggiend = !!email;

  const onClickHandler = () => {
    if (isLoggiend) {
      onLogoutHandler();
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    closeSideMenu();
  }, [pathname]);

  return (
    <>
      <nav>
        <VscMenu size={24} onClick={openSideMenu} />
      </nav>
      {isShowing && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById('backdrop-root')
          )}
          {ReactDOM.createPortal(
            <SideMenuWrap>
              <Top>
                <Header>
                  <VscClose size={48} color={WHITE} onClick={closeSideMenu} />
                </Header>
                {isLoggiend && (
                  <ProfileMenu to={`/profile/detail/${email}`}>
                    <ProfileImage size={24} src={profileImage} />
                    {nickname} 님
                  </ProfileMenu>
                )}
                <StyledButton
                  theme={BUTTON_THEME.PRIMARY}
                  onClick={onClickHandler}
                >
                  {isLoggiend ? '로그아웃' : '로그인/회원가입'}
                </StyledButton>
              </Top>
              <Bottom>
                <StyledUl>
                  <StyledLi>
                    <StyledLink to="/jobposting">
                      채용공고
                      <VscChevronRight size={24} />
                    </StyledLink>
                  </StyledLi>
                  <StyledLi>
                    <StyledLink to="/community">
                      커뮤니티
                      <VscChevronRight size={24} />
                    </StyledLink>
                  </StyledLi>
                </StyledUl>
              </Bottom>
            </SideMenuWrap>,
            document.getElementById('overlay-root')
          )}
        </>
      )}
    </>
  );
};

export default Mobile;
