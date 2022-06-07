import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { WHITE } from '../../constants/color';
import styled from 'styled-components';

import Title from '../../components/Main/Detail/Title';
import TabMenu from '../../components/Main/Detail/TabMenu';
import DetailContents from '../../components/Main/Detail/DetailContents';
import Button from '../../components/Ui/Button';
import axios from 'axios';

const StyledArticle = styled.article`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 3.125rem 0px;
  height: fit-content;
`;

const StyledSpan = styled.span`
  display: inline-flex;
  font-size: 1.875rem;
  margin-bottom: 3.125rem;
`;

const Detail = () => {
  const { isAdmin, accessToken } = useSelector((state) => state.user);
  const { id } = useParams();
  const tapMenu = ['팀원소개', '프로젝트 설계', '프로젝트 발표 및 시연'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const deleteProject = async () => {
    try {
      const response = await axios.delete(`api/senier-project/${id}`, {
        headers: {
          authorization: accessToken,
        },
      });
    } catch (e) {
      alert(e.message);
    } finally {
      window.history.back();
    }
  };

  return (
    <StyledArticle>
      <Title>title</Title>
      <StyledSpan>
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
        {isAdmin && (
          <>
            <Button style={{ marginLeft: 'auto', marginRight: '1rem' }}>
              <Link
                style={{ textDecoration: 'none', color: `${WHITE}` }}
                to={`/main/amend/${id}`}
              >
                수정
              </Link>
            </Button>
            <Button
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                deleteProject();
              }}
            >
              삭제
            </Button>
          </>
        )}
      </StyledSpan>
      <section>
        <DetailContents selectedIndex={selectedIndex}></DetailContents>
      </section>
    </StyledArticle>
  );
};

export default Detail;
