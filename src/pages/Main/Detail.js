import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { WHITE } from '../../constants/color';
import styled from 'styled-components';

import Title from '../../components/Main/Detail/Title';
import TabMenu from '../../components/Main/Detail/TabMenu';
import DetailContents from '../../components/Main/Detail/DetailContents';
import Recommend from '../../components/Main/Detail/Recommend';
import Button, { BUTTON_THEME } from '../../components/Ui/Button';
import axios from 'axios';

import uiSlice from '../../slices/ui';

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  margin: 3.125rem 0px;

  @media all and (max-width: 479px) {
    width: 80%;
    padding: 0;
    margin: 1rem auto;
  }
`;

const TabMenuParent = styled.div`
  display: flex;
  margin-bottom: 3.125rem;
  padding: 0 20vw;

  @media all and (max-width: 479px) {
    padding: 0;
  }
`;

const AdminAuthority = styled.div`
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: right;

  > button:first-child {
    margin-right: 1rem;
  }
`;

const StyledSection = styled.section`
  @media all and (max-width: 479px) {
    display: flex;
    justify-content: center;
  }
`;

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAdmin, accessToken } = useSelector((state) => state.user);
  const { id } = useParams();
  const tapMenu = ['팀원소개', '프로젝트 설계', '프로젝트 발표 및 시연'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const deleteProject = async () => {
    dispatch(uiSlice.actions.showLoading());

    try {
      const response = await axios.delete(`api/senier-project/${id}`, {
        headers: {
          authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
        },
      });

      navigate(-1);
    } catch (e) {
      alert(e.message);
    } finally {
      dispatch(uiSlice.actions.hideLoading());
    }
  };

  return (
    <>
      <StyledArticle>
        <Title />
        {isAdmin && (
          <AdminAuthority>
            <Button
              onClick={() => {
                deleteProject();
              }}
            >
              글 삭제
            </Button>
            <Button theme={BUTTON_THEME.SECONDARY}>
              <Link
                style={{ textDecoration: 'none', color: `${WHITE}` }}
                to={`/main/amend/${id}`}
              >
                글 수정
              </Link>
            </Button>
          </AdminAuthority>
        )}
        <TabMenuParent>
          {tapMenu.map((v, index) => (
            <TabMenu
              key={index}
              index={index}
              selectedTab={selectedIndex}
              onSelectedHandler={setSelectedIndex}
            >
              {v}
            </TabMenu>
          ))}
        </TabMenuParent>

        <StyledSection>
          <DetailContents selectedIndex={selectedIndex}></DetailContents>
        </StyledSection>
      </StyledArticle>
      <Recommend />
    </>
  );
};

export default Detail;
