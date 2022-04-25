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
  margin: 3.125rem 0;
`;

const StyledSpan = styled.span`
  display: inline-flex;

  > span {
    margin-right: 0.5rem;
  }
`;

const StyleDiv = styled.div`
  position: relative;
`;

const PlattformsAndTechnologysSelect = ({
  onPlattformsAndTechnologysHandler,
  stateEmptying,
}) => {
  const [plattforms, setPlattforms] = useState([]);
  const [technologys, setTechnologys] = useState([]);
  const [plattformList, setPlattformList] = useState([]);
  const [technologyList, setTechnologyList] = useState([]);

  useEffect(() => {
    if (plattforms.length === 0 || technologys.length === 0) {
      stateEmptying('plattformsAndTechnologys');
    }
  }, [plattforms, technologys]);

  useEffect(() => {
    const renameKeys = (arr) => {
      const rename = arr.map(({ id, name }) => ({
        value: id,
        name,
      }));
      return rename;
    };

    const getList = async () => {
      try {
        const [plattform, technology] = await Promise.all([
          await axios.get('api/category/plattform'),
          await axios.get('api/category/technology'),
        ]);

        setPlattformList([...renameKeys(plattform.data.plattformList)]);
        setTechnologyList([...renameKeys(technology.data.technologyList)]);
      } catch (e) {
        alert(e.message);
      }
    };
    getList();
  }, []);

  const onPlattformsItemHandler = (e) => {
    const find = plattforms.find((element) => element.value === e.value);
    if (!find) {
      const item = [...plattforms, e];
      setPlattforms(item);
    } else {
      alert('중복입니다.');
    }
  };

  const onTechnologysItemHandler = (e) => {
    const find = technologys.find((element) => element.value === e.value);
    if (!find) {
      const item = [...technologys, e];
      setTechnologys(item);
    } else {
      alert('중복입니다.');
    }
  };

  const onPlattformsDeleteHandler = (e) => {
    const filter = plattforms.filter((v) => v !== e);
    setPlattforms(filter);
  };

  const onTechnologyDeleteHandler = (e) => {
    const filter = technologys.filter((v) => v !== e);
    setTechnologys(filter);
  };

  const onHandlerSubmit = (e) => {
    e.preventDefault();

    onPlattformsAndTechnologysHandler({
      plattform: plattforms,
      technology: technologys,
    });
  };

  return (
    <>
      <StyledForm onSubmit={onHandlerSubmit}>
        <p>플렛폼 &amp; 기술</p>
        <StyleDiv>
          <SearchSelect
            style={{
              width: '15.625rem',
              marginTop: '1.25rem',
              marginBottom: '6.25rem',
            }}
            placeholder="플랫폼"
            options={plattformList}
            onSelectItemHandler={onPlattformsItemHandler}
          ></SearchSelect>
          {plattforms.length !== 0 && (
            <StyledSpan>
              {plattforms.map((v) => (
                <span key={v.name}>
                  <Chip onDeleteHandler={() => onPlattformsDeleteHandler(v)}>
                    {v.name}
                  </Chip>
                </span>
              ))}
            </StyledSpan>
          )}
        </StyleDiv>
        <SearchSelect
          style={{
            width: '15.625rem',
            marginTop: '1.25rem',
            marginBottom: '6.25rem',
          }}
          placeholder="기술"
          options={technologyList}
          onSelectItemHandler={onTechnologysItemHandler}
        ></SearchSelect>
        {technologys.length !== 0 && (
          <StyledSpan>
            {technologys.map((v) => (
              <span key={v.name}>
                <Chip onDeleteHandler={() => onTechnologyDeleteHandler(v)}>
                  {v.name}
                </Chip>
              </span>
            ))}
          </StyledSpan>
        )}
        <span>
          <Button
            type="submit"
            style={{ float: 'right', marginTop: '1rem' }}
            disabled={technologys.length === 0 || plattforms.length === 0}
          >
            다음
          </Button>
        </span>
      </StyledForm>
      <Line styled={{ margin: '1rem 0' }} />
    </>
  );
};

PlattformsAndTechnologysSelect.propTypes = {
  onPlattformsAndTechnologysHandler: PropTypes.func,
};

export default PlattformsAndTechnologysSelect;
