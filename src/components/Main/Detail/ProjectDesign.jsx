import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import uiSlce from '../../../slices/ui';
import OutLineButton from '../../Ui/OutLineButton';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSpan = styled.span`
  display: inline-flex;
  margin-bottom: 50px;
  align-items: center;
`;

const StyledPdfDiv = styled.div`
  margin: 0 50px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const ProjectDesign = ({ id }) => {
  const dispatch = useDispatch();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [projectDesign, setProjectDesign] = useState('');

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const getDesignUrl = async () => {
      dispatch(uiSlce.actions.showLoading());
      try {
        const design = await axios.get(`api/senier-project/design?id=${id}`);
        setProjectDesign(design.data.projectDesign);
      } catch (e) {
        alert(e.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    };

    getDesignUrl();
  }, [id]);

  return (
    <>
      {projectDesign === '' || (
        <StyledDiv>
          <StyledSpan>
            <OutLineButton
              onClick={() =>
                pageNumber > 1 ? setPageNumber(pageNumber - 1) : null
              }
            >
              &lt;
            </OutLineButton>
            <StyledPdfDiv>
              <Document
                file={projectDesign}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </StyledPdfDiv>
            <OutLineButton
              onClick={() =>
                pageNumber < numPages ? setPageNumber(pageNumber + 1) : null
              }
            >
              &gt;
            </OutLineButton>
          </StyledSpan>
          <a href={projectDesign} download>
            다운로드
          </a>
        </StyledDiv>
      )}
    </>
  );
};

ProjectDesign.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProjectDesign;
