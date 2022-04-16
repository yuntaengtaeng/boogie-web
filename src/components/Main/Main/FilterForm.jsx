import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../Ui/Button';
import SearchSelect from '../../Ui/SearchSelect';
import Chip from '../../Ui/Chip';
import Input from '../../Ui/Input';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const StyledSpan = styled.span`
  display: inline-flex;
  margin-bottom: 20px;
`;

const FilterForm = ({
  platList,
  skillList,
  setFillterOption,
  item,
  setIsFillterClicked,
}) => {
  const [userName, setUserName] = useState(item.userName || '');
  const [platforms, setPlatforms] = useState(item.platforms);
  const [skills, setSkills] = useState(item.skills);

  const onPlatformsItemHandler = (e) => {
    const find = platforms.find((element) => element.name === e.name);
    if (!find) {
      const item = {
        value: e.value,
        name: e.name,
      };
      setPlatforms([...platforms, item]);
    } else {
      alert('중복입니다.');
    }
  };

  const onSkillsItemHandler = (e) => {
    const find = skills.find((element) => element.value === e.value);
    if (!find) {
      const item = {
        value: e.value,
        name: e.name,
      };
      setSkills([...skills, item]);
    } else {
      alert('중복입니다.');
    }
  };

  const onPlatformsDeleteHandler = (e) => {
    setPlatforms(platforms.filter((v) => v !== e));
  };

  const onSkillDeleteHandler = (e) => {
    setSkills(skills.filter((v) => v !== e));
  };

  const onHandlerSubmit = (e) => {
    e.preventDefault();

    setFillterOption({
      userName: userName,
      platforms: platforms,
      skills: skills,
    });

    setIsFillterClicked(true);
  };
  return (
    <StyledForm onSubmit={onHandlerSubmit}>
      <Input
        style={{ width: '250px', marginBottom: '100px' }}
        type="text"
        placeholder="이름"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      ></Input>
      <SearchSelect
        style={{
          width: '250px',
          marginBottom: '100px',
        }}
        placeholder="플랫폼"
        options={platList}
        onSelectItemHandler={onPlatformsItemHandler}
      ></SearchSelect>
      {platforms && (
        <StyledSpan>
          {platforms.map((v) => (
            <span style={{ marginRight: '8px' }} key={v.name}>
              <Chip onDeleteHandler={() => onPlatformsDeleteHandler(v)}>
                {v.name}
              </Chip>
            </span>
          ))}
        </StyledSpan>
      )}
      <SearchSelect
        style={{
          width: '250px',
          marginBottom: '100px',
        }}
        placeholder="기술"
        options={skillList}
        onSelectItemHandler={onSkillsItemHandler}
      ></SearchSelect>
      {skills && (
        <StyledSpan>
          {skills.map((v) => (
            <span style={{ marginRight: '8px' }} key={v.name}>
              <Chip onDeleteHandler={() => onSkillDeleteHandler(v)}>
                {v.name}
              </Chip>
            </span>
          ))}
        </StyledSpan>
      )}
      <Button type="submit">적용</Button>
    </StyledForm>
  );
};

FilterForm.propTypes = {
  platList: PropTypes.array,
  skillList: PropTypes.array,
  setFillterOption: PropTypes.func,
  item: PropTypes.object,
  setIsFillterClicked: PropTypes.func,
};

export default FilterForm;
