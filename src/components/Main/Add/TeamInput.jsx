import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GRAY, BLACK } from '../../../constants/color';
import Input from '../../Ui/Input';
import Button from '../../Ui/Button';
import Line from '../../Ui/Line';
import DeleteLable from '../../Ui/DeleteLable';

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
`;

const StyledInputField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: fit-content;
`;

const StyledMemberDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 3.125rem 0;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  box-sizing: border-box;
  margin: 0;
  margin-top: 1rem;
  width: 15.625rem;
  height: 12.5rem;
  padding: 0.25rem 0.75rem;
  color: rgba(0, 0, 0, 0.85);
  font-size: 0.875rem;
  border: 0.063rem solid ${GRAY};
  border-radius: 0.125rem;
  outline: none;
  height: 2rem;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${GRAY};
  }

  :-ms-input-placeholder {
    color: ${GRAY};
  }
`;

const StyledLable = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.063rem solid ${BLACK};
  width: fit-content;
  height: 1.375rem;
  padding: 0.25rem 1rem;
  margin-top: 1rem;
  font-size: 0.875arem;
  border-radius: 0.125rem;
  color: ${BLACK};
  cursor: pointer;
`;

const StyledSpan = styled.span`
  width: 15.625rem;
  margin-top: 0.75rem;
  text-align: right;
`;

const TeamInput = ({ onMemberInfoHandler, stateEmptying }) => {
  const [name, setName] = useState('');
  const [uniID, setUniId] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [file, setFile] = useState(null);
  const [postFile, setPostFile] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [member, setMember] = useState([]);

  useEffect(() => {
    if (member.length !== 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [member]);

  useEffect(() => {
    if (member.length === 0 || postFile.length === 0) {
      stateEmptying('member');
    }
  }, [member, postFile]);

  const satisfied = name && uniID && introduction && file;

  const createMember = () => {
    if (satisfied) {
      setMember([
        ...member,
        {
          name,
          uniID,
          introduction,
        },
      ]);
      setPostFile([...postFile, file]);
      setName('');
      setUniId('');
      setIntroduction('');
      setFile();
    } else {
      alert('내용을 전부 입력해 주세요.');
    }
  };

  const onDeleteHandler = (e) => {
    const filter = member.filter((v) => v !== e);

    setMember(filter);
  };

  const onHandlerSubmit = (e) => {
    e.preventDefault();

    onMemberInfoHandler({
      member: member,
      postFile: postFile,
    });
  };
  return (
    <>
      <StyledForm onSubmit={onHandlerSubmit}>
        <p>팀원 입력</p>
        <StyledContainer>
          <StyledInputField>
            <Input
              style={{ width: '15.625rem', marginTop: '1rem' }}
              placeholder="이름"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              style={{
                width: '15.625rem',
                marginTop: '1rem',
              }}
              type="number"
              placeholder="학번"
              value={uniID}
              onChange={(e) => {
                setUniId(e.target.value);
              }}
            />
            <StyledTextarea
              style={{
                width: '15.625rem',
                height: '12.5rem',
                marginTop: '1rem',
              }}
              placeholder="자기 소개"
              value={introduction}
              onChange={(e) => {
                setIntroduction(e.target.value);
              }}
            />
            {
              <StyledSpan>
                {file ? file.name : '사진을 추가해 주세요.'}
              </StyledSpan>
            }
            <StyledLable htmlFor="chooseFile">사진 추가</StyledLable>
            <input
              type="file"
              id="chooseFile"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <span style={{ marginTop: '1rem' }}>
              <Button type="button" onClick={createMember}>
                추가
              </Button>
            </span>
          </StyledInputField>
          {member.length !== 0 && (
            <StyledMemberDiv>
              {member.map((v) => (
                <DeleteLable
                  key={v.uniID}
                  onDeleteHandler={() => {
                    onDeleteHandler(v);
                  }}
                >
                  {v.uniID} {v.name}
                </DeleteLable>
              ))}
            </StyledMemberDiv>
          )}
        </StyledContainer>
        <span>
          <Button
            type="submit"
            style={{ float: 'right', marginTop: '1rme' }}
            disabled={isEmpty}
          >
            다음
          </Button>
        </span>
      </StyledForm>
      <Line styled={{ margin: '1rme 0' }} />
    </>
  );
};

TeamInput.propTypes = {
  onMemberInfoHandler: PropTypes.func,
};

export default TeamInput;
