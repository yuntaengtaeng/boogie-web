import React, { useState, useCallback, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import Block from '../../components/Ui/Block';
import Button, { BUTTON_THEME } from '../../components/Ui/Button';
import Input from '../../components/Ui/Input';
import Line from '../../components/Ui/Line';
import { LIGHT_GRAY, WHITE } from '../../constants/color';
import AddressSearch from '../../components/Jobposting/Add/AddressSearch';
import { format } from 'date-fns';
import FloatingButton from '../../components/Jobposting/Add/FloatingButton';
import DetailInfo from '../../components/Jobposting/Add/DetailInfo';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uiSlce from '../../slices/ui';

const Container = styled.form`
  background-color: ${LIGHT_GRAY};
  height: 100vh;
  position: relative;
`;

const StyledInput = styled(Input)`
  border: none;
  padding: 0;
`;

const Textarea = styled.textarea`
  border: none;
  resize: none;
  height: 50vh;
  box-sizing: border-box;
  width: 100%;
  outline: none;
`;

const Section = styled.section`
  background-color: ${WHITE};
  box-sizing: border-box;
  padding: 2rem;
  width: 80%;
  margin: 1px auto;
`;

const StyledBlock = styled(Block)`
  background-color: ${WHITE};
  justify-content: flex-end;
`;

const initState = {
  title: '',
  content: '',
  address: '',
  deadline: '',
  positionId: null,
  image: null,
};

const formDataReducer = (state, action) => {
  const clone = { ...state };

  if (['INPUT', 'SELECT', 'DATE', 'FILE', 'ADDRESS'].includes(action.type)) {
    clone[action.name] = action.value;
    return clone;
  }

  return initState;
};

const Add = () => {
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, reducerDispatch] = useReducer(formDataReducer, initState);
  const [isShowingAddressModal, setIsShowingAddressModal] = useState(false);
  const [positionData, setPositionData] = useState([]);

  useEffect(() => {
    const getPositionData = async () => {
      try {
        const {
          data: { jobCategoryList },
        } = await axios.get('api/category/job');
        const renameJobCategoryList = jobCategoryList.map(({ id, name }) => ({
          value: id,
          name,
        }));

        setPositionData(renameJobCategoryList);
      } catch (error) {
        alert('채용 포지션 목록을 불러오지 못 했습니다. 다시 시도해주세요.');
      }
    };

    getPositionData();
  }, []);

  const addressSearchButtonPressed = useCallback(() => {
    setIsShowingAddressModal(true);
  }, []);

  const isValid = Object.values(formData).every((v) => !!v);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!isValid) {
        return;
      }

      const clone = { ...formData };

      const body = new FormData();
      body.append('title', clone.title);
      body.append('content', clone.content);
      body.append('address', JSON.stringify(clone.address));
      body.append('deadline', format(clone.deadline, 'yyyyMMdd'));
      body.append('deadline', clone.positionId);
      body.append('image', clone.image);

      dispatch(uiSlce.actions.showLoading());

      try {
        const { data: isPosted } = await axios.post('api/employment', body, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        });

        if (isPosted) {
          navigate(-1);
        }
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
    [isValid, formData, dispatch, accessToken, navigate]
  );

  return (
    <Container onSubmit={onSubmit}>
      <StyledBlock>
        <Button theme={BUTTON_THEME.PRIMARY} disabled={!isValid} type="submit">
          등록하기
        </Button>
      </StyledBlock>
      <Section>
        <StyledInput
          placeholder="제목을 입력해주세요."
          onChange={(event) => {
            reducerDispatch({
              type: 'INPUT',
              name: 'title',
              value: event.target.value,
            });
          }}
        />
        <Line />
        <Textarea
          placeholder="내용을 입력해주세요"
          onChange={(event) => {
            reducerDispatch({
              type: 'INPUT',
              name: 'content',
              value: event.target.value,
            });
          }}
        ></Textarea>
        <Line />
        <DetailInfo
          address={{
            onClick: addressSearchButtonPressed,
            address: formData?.address?.address,
          }}
          position={{
            positionId: formData.positionId,
            options: positionData,
            onChange: (event) => {
              reducerDispatch({
                type: 'SELECT',
                name: 'positionId',
                value: event.target.value,
              });
            },
          }}
          date={{
            deadline: formData.deadline,
            onChange: (date) => {
              reducerDispatch({
                type: 'DATE',
                name: 'deadline',
                value: date,
              });
            },
          }}
        ></DetailInfo>
      </Section>
      <FloatingButton
        count={Number(!!formData.image)}
        onChange={(e) => {
          const file = e.target.files[0];
          reducerDispatch({
            type: 'FILE',
            name: 'image',
            value: file || null,
          });
        }}
      ></FloatingButton>
      {isShowingAddressModal && (
        <AddressSearch
          onSelect={(address) => {
            reducerDispatch({
              type: 'ADDRESS',
              name: 'address',
              value: address || '',
            });
            setIsShowingAddressModal(false);
          }}
          onClose={() => {
            setIsShowingAddressModal(false);
          }}
        ></AddressSearch>
      )}
    </Container>
  );
};

export default Add;
