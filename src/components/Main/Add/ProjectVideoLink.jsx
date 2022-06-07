import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../../Ui/Button';
import Line from '../../Ui/Line';
import Input from '../../Ui/Input';
import DeleteLable from '../../Ui/DeleteLable';
import OutLineButton from '../../Ui/OutLineButton';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 3.125rem 0;
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  margin: 1.25rem 0;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectVideoLink = ({
  onProjectUrlHandler,
  stateEmptying,
  data,
  isData,
}) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [urlArr, setUrlArr] = useState(isData ? data.link : []);

  useEffect(() => {
    if (urlArr.length === 0) {
      stateEmptying('projectVideoLink');
    }
  }, [urlArr]);

  const onHandlerSubmit = (e) => {
    e.preventDefault();

    onProjectUrlHandler(urlArr);
  };

  const addUrl = () => {
    if (linkUrl !== '') {
      setUrlArr([...urlArr, linkUrl]);
      setLinkUrl('');
    } else {
      alert('Url을 입력해주세요');
    }
  };

  const onDeleteHandler = (e) => {
    setUrlArr(urlArr.filter((v) => v !== e));
  };
  return (
    <>
      <StyledForm onSubmit={onHandlerSubmit}>
        <p>프로젝트 시연 및 발표&#40;유튜브 링크&#41;</p>
        <StyledSpan>
          <Input
            type="url"
            style={{ width: '15.625rem', marginRight: '1rem' }}
            placeholder="URL"
            value={linkUrl}
            onChange={(e) => {
              setLinkUrl(e.target.value);
            }}
          />
          <OutLineButton type="button" onClick={addUrl}>
            링크 추가
          </OutLineButton>
        </StyledSpan>
        {urlArr.length !== 0 && (
          <StyledDiv>
            {urlArr.map((v) => (
              <span style={{ margin: '0.5rem 0' }} key={v}>
                <DeleteLable
                  onDeleteHandler={() => {
                    onDeleteHandler(v);
                  }}
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
        <span>
          <Button
            type="submit"
            style={{ float: 'right', marginTop: '1rem' }}
            disabled={urlArr.length === 0}
          >
            {data ? '수정' : '다음'}
          </Button>
        </span>
      </StyledForm>
      <Line styled={{ margin: '1rem 0' }} />
    </>
  );
};

ProjectVideoLink.propTypes = {
  onProjectUrlHandler: PropTypes.func,
};

export default ProjectVideoLink;
