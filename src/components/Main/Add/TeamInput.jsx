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
  margin: 50px 0px;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  box-sizing: border-box;
  margin: 0;
  margin-top: 16px;
  width: 250px;
  height: 200px;
  padding: 4px 12px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  border: 1px solid ${GRAY};
  border-radius: 2px;
  outline: none;
  height: 32px;

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
  border: 1px solid ${BLACK};
  width: fit-content;
  height: 22px;
  padding: 4px 16px;
  margin-top: 16px;
  font-size: 14px;
  border-radius: 2px;
  color: ${BLACK};
  cursor: pointer;
`;

const TeamInput = ({ getMember, isSubmit, getMemberImage }) => {
  const [name, setName] = useState('');
  const [uniID, setUniId] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [file, setFile] = useState();
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

  const createMember = () => {
    if (name && uniID && introduction && file) {
      const arr = {
        name: name,
        uniID: uniID,
        introduction: introduction,
      };
      setMember([...member, arr]);
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
    setMember(member.filter((v) => v.uniId !== e));
  };

  const onHandlerSubmit = (e) => {
    e.preventDefault();
    getMember(member);
    getMemberImage(postFile);
    isSubmit(3);
  };
  return (
    <>
      <StyledForm onSubmit={onHandlerSubmit}>
        <p>팀원 입력</p>
        <StyledContainer>
          <StyledInputField>
            <Input
              style={{ width: '250px', marginTop: '16px' }}
              placeholder="이름"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              style={{
                width: '250px',
                marginTop: '16px',
                webkitAppearance: 'none',
              }}
              type="number"
              placeholder="학번"
              value={uniID}
              onChange={(e) => {
                setUniId(e.target.value);
              }}
            />
            <StyledTextarea
              style={{ width: '250px', height: '200px', marginTop: '16px' }}
              placeholder="자기 소개"
              value={introduction}
              onChange={(e) => {
                setIntroduction(e.target.value);
              }}
            />
            {
              <span
                style={{
                  width: '250px',
                  marginTop: '12px',
                  textAlign: 'right',
                }}
              >
                {file ? file.name : '사진을 추가해 주세요.'}
              </span>
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
            <span style={{ marginTop: '16px' }}>
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
                    onDeleteHandler(v.uniID);
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
            style={{ float: 'right', marginTop: '16px' }}
            disabled={isEmpty}
          >
            다음
          </Button>
        </span>
      </StyledForm>
      <Line styled={{ margin: '16px 0px' }} />
    </>
  );
};

TeamInput.propTypes = {
  getInfo: PropTypes.func,
  isSubmit: PropTypes.func,
  getMemberImage: PropTypes.func,
};

export default TeamInput;
