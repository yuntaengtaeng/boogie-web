import React, { useEffect, useState, useCallback } from 'react';
import { LIGHT_GRAY, WHITE } from '../../constants/color';
import axios from 'axios';
import styled from 'styled-components';

import CategoryList from '../../components/Community/Main/CategoryList';
import BestPick from '../../components/Community/Main/BestPick';
import PostWrite from '../../components/Community/Main/PostWrite';
import PostItemList from '../../components/Community/Main/PostItemList';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../../components/Ui/Card/Card';
import uiSlce from '../../slices/ui';

import useDeviceDetect from '../../hooks/useDeviceDetect';
import useGetCategory from '../../hooks/useGetCategory';

const Section = styled.section`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  background-color: ${LIGHT_GRAY};

  @media all and (max-width: 479px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  position: sticky;
  flex: 0.3;
`;

const Right = styled.div`
  flex: 0.7;
`;

const Community = () => {
  const { isMobile } = useDeviceDetect();
  const dispatch = useDispatch();

  const categoryData = useGetCategory('community');

  const [selectedCategory, setSelectedCategory] = useState(1);

  const [bestPickData, setBestPickData] = useState([]);
  const [pageNumbers, setPageNumbers] = useState({});
  const [postDatas, setPostDatas] = useState([]);

  const { isLoading } = useSelector((state) => state.ui);
  const { accessToken } = useSelector((state) => state.user);

  const getBestPickData = useCallback(async () => {
    try {
      const {
        data: { content },
      } = await axios.get(
        `api/community/best-pick?categoryId=${selectedCategory}`
      );
      setBestPickData(content);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return;
      }

      alert(error.message);
    }
  }, [selectedCategory]);

  const onCategorySelectHandler = useCallback((id) => {
    setSelectedCategory(id);
  }, []);

  const getPostItem = useCallback(async () => {
    if (pageNumbers[selectedCategory] === -1) {
      return;
    }

    try {
      const {
        data: { contentList, page },
      } = await axios.get(
        `api/community/list?categoryId=${selectedCategory}&page=${
          pageNumbers[selectedCategory] || 1
        }`,
        {
          ...(!!accessToken && {
            headers: {
              authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
            },
          }),
        }
      );

      const clonePages = { ...pageNumbers };
      clonePages[selectedCategory] = page;

      setPageNumbers(clonePages);

      const clonePostDatas = { ...postDatas };

      clonePostDatas[selectedCategory] = [
        ...(clonePostDatas[selectedCategory] || []),
        ...contentList,
      ];
      setPostDatas(clonePostDatas);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return;
      }

      alert(error.message);
    }
  }, [accessToken, pageNumbers, postDatas, selectedCategory]);

  const handleScroll = useCallback(async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollTop + clientHeight >= scrollHeight &&
      isLoading === false &&
      pageNumbers[selectedCategory] !== -1
    ) {
      dispatch(uiSlce.actions.showLoading());
      await getPostItem();
      dispatch(uiSlce.actions.hideLoading());
    }
  }, [dispatch, getPostItem, isLoading, pageNumbers, selectedCategory]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const getAllData = async () => {
      Promise.all([getBestPickData(), getPostItem()]);
    };

    getAllData();
  }, [getBestPickData, getPostItem, selectedCategory]);

  const { name: bestPickTitle } =
    [...categoryData].find((data) => data.id === selectedCategory) || {};

  return (
    <Section>
      <Left>
        <Card
          style={{
            backgroundColor: WHITE,
            width: '80%',
            margin: `${isMobile ? '1.75rem ' : '3.75rem '}auto 0 auto`,
            ...(isMobile && {
              display: 'flex',
              alignItems: 'center',
            }),
          }}
        >
          <CategoryList
            categorys={categoryData}
            selectedId={selectedCategory}
            onClick={onCategorySelectHandler}
          ></CategoryList>
        </Card>
      </Left>
      <Right>
        <Card
          style={{
            backgroundColor: WHITE,
            width: '80%',
            margin: '3.75rem auto',
          }}
        >
          <BestPick
            title={bestPickTitle}
            bestPickData={bestPickData}
          ></BestPick>
          <PostWrite />
          <PostItemList
            commentList={postDatas[selectedCategory] || []}
          ></PostItemList>
        </Card>
      </Right>
    </Section>
  );
};

export default Community;
