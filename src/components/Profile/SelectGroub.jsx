import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchSelect from '../Ui/SearchSelect';
import Chip from '../Ui/Chip';

const StyledP = styled.p`
  font-size: 1.5rem;
  margin-right: 5rem;
  margin-bottom: 1rem;
`;

const ChipsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 15rem;
  gap: 1rem;
  margin: 1rem 0;
`;

const SelectGroub = ({
  onTechnologieDeletHandler,
  onPositionDeletHandler,
  selectedTchnl,
  selectedJob,
  onTchnlItemHandler,
  onJobItemHandler,
  isMe,
}) => {
  const [positionList, setPositionList] = useState([]);
  const [technologyList, setTechnologyList] = useState([]);

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
        const [job, technology] = await Promise.all([
          await axios.get('api/category/job'),
          await axios.get('api/category/technology'),
        ]);

        setPositionList([...renameKeys(job.data.jobCategoryList)]);
        setTechnologyList([...renameKeys(technology.data.technologyList)]);
      } catch (e) {
        alert(e.message);
      }
    };
    getList();
  }, []);
  return (
    <>
      <StyledP>직무</StyledP>
      {isMe && (
        <SearchSelect
          style={{
            width: '15rem',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
          placeholder="직무"
          options={positionList}
          onSelectItemHandler={onJobItemHandler}
        />
      )}
      {selectedJob.length !== 0 && (
        <ChipsDiv>
          {selectedJob.map((v) => (
            <Chip
              key={v.value}
              onDeleteHandler={
                isMe
                  ? () => {
                      onPositionDeletHandler(v);
                    }
                  : null
              }
            >
              {v.name}
            </Chip>
          ))}
        </ChipsDiv>
      )}
      <StyledP>기술</StyledP>
      {isMe && (
        <SearchSelect
          style={{
            width: '15rem',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
          placeholder="기술"
          options={technologyList}
          onSelectItemHandler={onTchnlItemHandler}
        />
      )}
      {selectedTchnl.length !== 0 && (
        <ChipsDiv>
          {selectedTchnl.map((v) => (
            <Chip
              key={v.value}
              onDeleteHandler={
                isMe
                  ? () => {
                      onTechnologieDeletHandler(v);
                    }
                  : null
              }
            >
              {v.name}
            </Chip>
          ))}
        </ChipsDiv>
      )}
    </>
  );
};

export default SelectGroub;
