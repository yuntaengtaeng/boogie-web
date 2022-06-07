import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { LIGHT_GRAY, WHITE } from '../../constants/color';
import { VscChevronLeft } from 'react-icons/vsc';
import Card from '../../components/Ui/Card/Card';
import LoginModal from '../../components/Login/LoginModal';

import Content from '../../components/Community/Detail/Content';
import CommentList from '../../components/Community/Detail/CommentList';
import EditComment from '../../components/Community/Detail/EditComment';

import OutLineButton from '../../components/Ui/OutLineButton';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import uiSlce from '../../slices/ui';

const Container = styled.section`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  background-color: ${LIGHT_GRAY};
`;

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, email } = useSelector((state) => state.user);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [text, setText] = useState('');
  const [isShowingLoginModal, setIsShowingLoginModal] = useState(false);

  const isLoggiend = !!email;

  useEffect(() => {
    const getDetailData = async () => {
      dispatch(uiSlce.actions.showLoading());

      try {
        const {
          data: { content },
        } = await axios.get(`api/community?id=${id}`, {
          ...(!!accessToken && {
            headers: {
              authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
            },
          }),
        });
        setData(content);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
          return;
        }

        alert(error.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    };

    const getDetailComment = async () => {
      try {
        const {
          data: { comments },
        } = await axios.get(`api/community/comments?id=${id}`);
        setCommentData(comments);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
          return;
        }

        alert(error.message);
      }
    };

    const getAllData = async () => {
      dispatch(uiSlce.actions.showLoading());
      await Promise.all([getDetailData(), getDetailComment()]);
      dispatch(uiSlce.actions.hideLoading());
    };

    getAllData();
  }, [accessToken, dispatch, id]);

  const successCallback = () => {
    setIsShowingLoginModal(false);
  };

  const reqeustLike = useCallback(async () => {
    if (!isLoggiend) {
      setIsShowingLoginModal(true);
      return;
    }

    dispatch(uiSlce.actions.showLoading());

    try {
      const {
        data: { isLiked, likeCount },
      } = await axios.patch(
        `api/community/like/${id}`,
        {},
        {
          headers: {
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        }
      );

      const cloneData = { ...data, isLiked, likeCount };
      setData(cloneData);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return;
      }

      alert(error.message);
    } finally {
      dispatch(uiSlce.actions.hideLoading());
    }
  }, [isLoggiend, dispatch, id, accessToken, data]);

  const moveCommunityMain = useCallback(() => {
    navigate('/community');
  }, [navigate]);

  const writeCommnet = useCallback(
    async (event) => {
      event.preventDefault();

      if (!text) {
        return;
      }

      if (!isLoggiend) {
        setIsShowingLoginModal(true);
        return;
      }

      dispatch(uiSlce.actions.showLoading());

      try {
        const {
          data: { comments },
        } = await axios.post(
          'api/community/comment',
          {
            id,
            content: text,
          },
          {
            headers: {
              authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
            },
          }
        );

        setCommentData(comments);
        setText('');
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
          return;
        }

        alert(error.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    },
    [text, isLoggiend, dispatch, id, accessToken]
  );

  const closeLoginModal = useCallback(() => {
    setIsShowingLoginModal(false);
  }, []);

  return (
    <Container>
      {isShowingLoginModal && (
        <LoginModal
          successCallback={successCallback}
          onCloseHandler={closeLoginModal}
        />
      )}
      <Card
        style={{
          backgroundColor: WHITE,
          width: '60%',
          margin: '3.75rem auto 3.75rem auto',
        }}
      >
        <Content {...data} onLikeClickHandler={reqeustLike} />
        <CommentList comments={commentData} />
        <EditComment
          onSubmitHandler={writeCommnet}
          text={text}
          setText={setText}
        />
        <OutLineButton onClick={moveCommunityMain}>
          <VscChevronLeft size={24} />
          목록으로
        </OutLineButton>
      </Card>
    </Container>
  );
};

export default Detail;
