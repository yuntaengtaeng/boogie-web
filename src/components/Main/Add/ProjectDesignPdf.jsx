import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SECONDARY, WHITE } from '../../../constants/color';
import Button from '../../Ui/Button';
import Line from '../../Ui/Line';
import DeleteLable from '../../Ui/DeleteLable';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
`;

const StyledLable = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${SECONDARY};
  background-color: ${SECONDARY};
  width: fit-content;
  height: 22px;
  padding: 4px 16px;
  margin-top: 16px;
  font-size: 14px;
  border-radius: 2px;
  color: ${WHITE};
  cursor: pointer;
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const ProjectDesignPdf = ({ getPdfFile, isSubmit }) => {
  const [pdfFile, setPdfFile] = useState();
  const onDeleteHandler = () => {
    setPdfFile();
  };

  const onHandlerSubmit = (e) => {
    e.preventDefault();

    getPdfFile(pdfFile);
    isSubmit(4);
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
            style={{ float: 'right', marginTop: '16px' }}
            disabled={!pdfFile}
          >
            다음
          </Button>
        </span>
      </StyledForm>
      <Line styled={{ margin: '16px 0px' }} />
    </>
  );
};

ProjectDesignPdf.propTypes = {
  getPdfFile: PropTypes.func,
  isSubmit: PropTypes.func,
};

export default ProjectDesignPdf;
