import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SECONDARY, WHITE } from '../../../constants/color';
import Button from '../../Ui/Button';
import Line from '../../Ui/Line';
import DeleteLable from '../../Ui/DeleteLable';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 3.125rem 0;
`;

const StyledLable = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${SECONDARY};
  background-color: ${SECONDARY};
  width: fit-content;
  height: 1.375rem;
  padding: 0.25rem 1rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  border-radius: 0.125rem;
  color: ${WHITE};
  cursor: pointer;
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  margin: 1.25rem 0;
`;

const ProjectDesignPdf = ({ onPdfFileHandler, stateEmptying }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const onDeleteHandler = () => {
    setPdfFile(null);
  };

  useEffect(() => {
    if (pdfFile === null) {
      stateEmptying('projectDesignPdf');
    }
  }, [pdfFile]);

  const onHandlerSubmit = (e) => {
    e.preventDefault();

    onPdfFileHandler(pdfFile);
  };
  return (
    <>
      <StyledForm onSubmit={onHandlerSubmit}>
        <p>프로젝트 설계</p>
        <StyledSpan>
          <StyledLable htmlFor="choosePDF">PDF 추가</StyledLable>
          <input
            type="file"
            id="choosePDF"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={(e) => {
              setPdfFile(e.target.files[0]);
            }}
          ></input>
          {pdfFile && (
            <span
              style={{
                float: 'right',
                marginLeft: 'auto',
              }}
            >
              <DeleteLable onDeleteHandler={onDeleteHandler}>
                {pdfFile.name}
              </DeleteLable>
            </span>
          )}
        </StyledSpan>
        <span>
          <Button
            type="submit"
            style={{ float: 'right', marginTop: '1rem' }}
            disabled={!pdfFile}
          >
            다음
          </Button>
        </span>
      </StyledForm>
      <Line styled={{ margin: '1rem 0' }} />
    </>
  );
};

ProjectDesignPdf.propTypes = {
  onPdfFileHandler: PropTypes.func,
};

export default ProjectDesignPdf;
