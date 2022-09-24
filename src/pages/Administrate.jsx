import React, { useState } from 'react';
import styled from 'styled-components';

import useDeviceDetect from '../hooks/useDeviceDetect';
import { Navigate } from 'react-router-dom';

import UserManagement from '../components/Administrate/Contents/UserManagement';
import AddAdmin from '../components/Administrate/Contents/AddAdmin';
import BannerManagement from '../components/Administrate/Contents/BannerManagement';
import YearManagement from '../components/Administrate/Contents/YearManagement';

import TextButton from '../components/Ui/TextButton';

const Container = styled.div`
  display: flex;
  width: 90%;
  margin: 2rem auto;
  box-sizing: border-box;
`;

const Menus = styled.div`
  flex: 0.3;
`;

const Content = styled.div`
  flex: 0.7;
  margin-left: 2rem;
`;

const MENUS = ['학번 이름 수정', '관리자 추가', '배너 관리', '연도 관리'];

const Administrate = () => {
  const [selectedMenuId, setSelectedMenuId] = useState('');
  const { isMobile } = useDeviceDetect();

  if (isMobile) {
    return <Navigate to="/noaccess" />;
  }

  const onMenuClickHandler = (id) => {
    setSelectedMenuId(id);
  };

  const content = (() => {
    switch (selectedMenuId) {
      case '학번 이름 수정':
        return <UserManagement />;

      case '관리자 추가':
        return <AddAdmin />;

      case '배너 관리':
        return <BannerManagement />;

      case '연도 관리':
        return <YearManagement />;

      default:
        return null;
    }
  })();

  return (
    <Container>
      <Menus>
        {MENUS.map((menu) => (
          <TextButton
            key={menu}
            onClick={onMenuClickHandler}
            isSelected={selectedMenuId === menu}
            id={menu}
          >
            {menu}
          </TextButton>
        ))}
      </Menus>
      <Content>{content}</Content>
    </Container>
  );
};

export default Administrate;
