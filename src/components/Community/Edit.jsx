import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Block from '../../components/Ui/Block';
import Button, { BUTTON_THEME } from '../../components/Ui/Button';
import Line from '../../components/Ui/Line';
import Input from '../../components/Ui/Input';
import Dropdown from '../../components/Ui/Dropdown';

import axios from 'axios';

import { LIGHT_GRAY, WHITE } from '../../constants/color';

const Container = styled.form`
  background-color: ${LIGHT_GRAY};
  height: 100vh;
  position: relative;
`;

const StyledBlock = styled(Block)`
  background-color: ${WHITE};
  justify-content: space-between;
`;

const StyledDropdown = styled(Dropdown)`
  width: 12vw;
`;

const Section = styled.section`
  background-color: ${WHITE};
  box-sizing: border-box;
  padding: 2rem;
  width: 80%;
  margin: 1px auto;
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

const Edit = ({ onSubmitHandler, storedValue, submitButtonText }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [postData, setPostData] = useState(
    storedValue || {
      categoryId: 1,
      title: '',
      content: '',
    }
  );

  useEffect(() => {
    const getCommunityCategory = async () => {
      const {
        data: { communityList },
      } = await axios.get('api/category/community');

      const renameCategoryData = communityList.map(({ id, name }) => ({
        name,
        value: id,
      }));

      setCategoryData(renameCategoryData);
    };

    getCommunityCategory();
  }, []);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const body = { ...postData };
      onSubmitHandler(body);
    },
    [onSubmitHandler, postData]
  );

  const onChange = useCallback(
    (event) => {
      const { value, name } = event.target;

      setPostData({ ...postData, [name]: value });
    },
    [postData]
  );

  const isValid = Object.values({ ...postData }).every((v) => !!v);

  return (
    <Container onSubmit={onSubmit}>
      <StyledBlock>
        <StyledDropdown
          disabled={!!storedValue}
          options={categoryData}
          value={postData.categoryId}
          name="categoryId"
          onChange={onChange}
        ></StyledDropdown>
        <Button theme={BUTTON_THEME.PRIMARY} type="submit" disabled={!isValid}>
          {submitButtonText}
        </Button>
      </StyledBlock>
      <Section>
        <StyledInput
          placeholder="제목을 입력해주세요."
          value={postData.title}
          name="title"
          onChange={onChange}
        />
        <Line />
        <Textarea
          placeholder="내용을 입력해주세요"
          value={postData.content}
          name="content"
          onChange={onChange}
        ></Textarea>
      </Section>
    </Container>
  );
};

export default Edit;
