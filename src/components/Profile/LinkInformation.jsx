import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import ExplanationBox from '../Ui/ExplanationBox';
import Input from '../Ui/Input';
import Button from '../Ui/Button';
import DeleteLable from '../Ui/DeleteLable';
import Line from '../Ui/Line';

const StyledTitle = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledSpan = styled.span`
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 1rem 0;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    margin-top: 1rem;
  }
`;

const StyledInput = styled(Input)`
  @media all and (max-width: 479px) {
    width: 75%;
  }
`;

const StyledButton = styled(Button)`
  @media all and (max-width: 479px) {
    width: 25%;
  }
`;

const LinkInformation = ({ link, onLinkInformationHandler, isMe }) => {
  const [urlLinkArr, setUrlLinkArr] = useState(link || []);
  const [url, setUrl] = useState('');
  const EXPLANATION = [
    '깃헙, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 작성해주세요.',
  ];

  const onclick = () => {
    if (!url) {
      return;
    }

    const clone = [...urlLinkArr];

    let link = `${url}`;

    const URL_REG_EXP = /(http(s)?:\/\/)/gi;

    if (!URL_REG_EXP.test(url)) {
      link = 'https://'.concat(link);
    }

    setUrlLinkArr([...clone, link]);
    setUrl('');
  };

  const onDeleteHandler = (e) => {
    const filter = urlLinkArr.filter((v) => v !== e);

    setUrlLinkArr(filter);
  };

  useEffect(() => {
    onLinkInformationHandler(urlLinkArr);
  }, [urlLinkArr]);
  return (
    <StyledDiv>
      <StyledTitle>링크</StyledTitle>
      {isMe && (
        <>
          <ExplanationBox arr={EXPLANATION} />
          <StyledSpan>
            <StyledInput
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            ></StyledInput>
            <StyledButton type="button" onClick={onclick} disabled={url === ''}>
              추가
            </StyledButton>
          </StyledSpan>
        </>
      )}
      {urlLinkArr.length !== 0 && (
        <StyledDiv>
          {urlLinkArr.map((v) => (
            <span key={v}>
              <DeleteLable
                onDeleteHandler={
                  isMe
                    ? () => {
                        onDeleteHandler(v);
                      }
                    : null
                }
              >
                {
                  <a href={v} target="_blank" rel="noreferrer">
                    {v}
                  </a>
                }
              </DeleteLable>
            </span>
          ))}
        </StyledDiv>
      )}
      <Line styled={{ margin: '1rem 0' }} />
    </StyledDiv>
  );
};

export default LinkInformation;
