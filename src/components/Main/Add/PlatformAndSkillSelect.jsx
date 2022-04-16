import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../../Ui/Button';
import Line from '../../Ui/Line';
import SearchSelect from '../../Ui/SearchSelect';
import Chip from '../../Ui/Chip';
import axios from 'axios';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
`;

const StyledSpan = styled.span`
  display: inline-flex;
`;

const StyleDiv = styled.div`
  position: relative;
`;

const PlatformAndSkillSelect = ({ isSubmit, getPlatAndSkill }) => {
  const [platforms, setPlatforms] = useState([]);
  const [skills, setSkills] = useState([]);
  const [platList, setPlatList] = useState([]);
  const [skillList, setSkillList] = useState([]);

  const renameKeys = (arr) => {
    const result = arr.map((v) => {
      const newKey = {};
      newKey['value'] = v.id;
      newKey['name'] = v.name;
      return newKey;
    });
    return result;
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const getPlatforms = await axios.get('api/category/plattform');
        const getSkills = await axios.get('api/category/technology');
        setPlatList([...renameKeys(getPlatforms.data.plattformList)]);
        setSkillList([...renameKeys(getSkills.data.technologyList)]);
      } catch (e) {
        alert(e.message);
      }
    };
    getList();
  }, []);

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

    getPlatAndSkill({
      platforms: platforms,
      skills: skills,
    });
    isSubmit(6);
  };

  return (
    <>
      <StyledForm onSubmit={onHandlerSubmit}>
        <p>플렛폼 &amp; 기술</p>
        <StyleDiv>
          <SearchSelect
            style={{
              width: '250px',
              marginTop: '20px',
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
        </StyleDiv>
        <SearchSelect
          style={{
            width: '250px',
            marginTop: '20px',
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
        <span>
          <Button
            type="submit"
            style={{ float: 'right', marginTop: '16px' }}
            disabled={skills.length === 0 || platforms.length === 0}
          >
            다음
          </Button>
        </span>
      </StyledForm>
      <Line styled={{ margin: '16px 0px' }} />
    </>
  );
};

PlatformAndSkillSelect.propTypes = {
  getPlatAndSkill: PropTypes.func,
  isSubmit: PropTypes.func,
};

export default PlatformAndSkillSelect;
