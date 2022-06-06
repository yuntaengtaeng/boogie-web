import React, { useRef, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { VscEllipsis } from 'react-icons/vsc';

const Wrap = styled.div`
  position: relative;
`;

const Dropdown = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  width: max-content;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-height: 10rem;
  overflow-y: scroll;
`;

const StyledLi = styled.li`
  padding: 1rem;
`;

const Menu = ({ menuList }) => {
  const menuRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const showMenu = useCallback(() => {
    setMenuVisible(true);
  }, []);

  const hideMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  const selectMenu = useCallback(
    (func) => {
      func();
      hideMenu();
    },
    [hideMenu]
  );

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (menuRef.current !== null && !menuRef.current.contains(e.target)) {
        setMenuVisible(!menuVisible);
      }
    };

    if (menuVisible) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [menuVisible]);

  return (
    <Wrap ref={menuRef}>
      <VscEllipsis size={24} onClick={showMenu}></VscEllipsis>
      {menuVisible && (
        <Dropdown>
          <ul>
            {menuList.map(({ title, onClickHandler }) => (
              <StyledLi
                key={title}
                onClick={selectMenu.bind(this, onClickHandler)}
              >
                {title}
              </StyledLi>
            ))}
          </ul>
        </Dropdown>
      )}
    </Wrap>
  );
};

export default Menu;
