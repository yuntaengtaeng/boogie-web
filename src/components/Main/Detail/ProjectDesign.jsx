import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import uiSlce from '../../../slices/ui';
import OutLineButton from '../../Ui/OutLineButton';
import { Document, Page, pdfjs } from 'react-pdf';
import { VscFilePdf } from 'react-icons/vsc';
import useDeviceDetect from '../../../hooks/useDeviceDetect';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media all and (max-width: 479px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
  }
`;

const StyledSpan = styled.span`
  display: inline-flex;
  margin-bottom: 3.125rem;
  align-items: center;
`;

const StyledPdfDiv = styled.div`
  margin: 0 3.125rem;
  box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);

  ${({ isMobile }) =>
    isMobile &&
    `
      .react-pdf__Page__canvas{
        width:80% !important;
        height: 100% !important;
      }
    `}
`;

const DownloadButton = styled(OutLineButton)`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.4rem;
  }
`;

const DownLoadTag = styled.a`
  text-decoration: none;
`;

const ProjectDesign = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isMobile } = useDeviceDetect();
  const [totalPages, setTotalPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [projectDesign, setProjectDesign] = useState('');

  useEffect(() => {
    const getDesignUrl = async () => {
      dispatch(uiSlce.actions.showLoading());
      try {
        const design = await axios.get(
          `api/senier-project/detail/design?id=${id}`
        );
        setProjectDesign(design.data.projectDesign);
      } catch (e) {
        alert(e.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    };

    getDesignUrl();
  }, [dispatch, id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const nextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <>
      {projectDesign === '' || (
        <StyledDiv>
          {!isMobile && (
            <StyledSpan>
              <OutLineButton
                onClick={() => previousPage()}
                disabled={pageNumber === 1}
              >
                &lt;
              </OutLineButton>
              <StyledPdfDiv isMobile={isMobile}>
                <Document
                  file={projectDesign}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
              </StyledPdfDiv>
              <OutLineButton
                onClick={() => nextPage()}
                disabled={pageNumber === totalPages}
              >
                &gt;
              </OutLineButton>
            </StyledSpan>
          )}
          <DownLoadTag href={projectDesign} download>
            <DownloadButton>
              <VscFilePdf size={16} />
              PDF 다운로드
            </DownloadButton>
          </DownLoadTag>
        </StyledDiv>
      )}
    </>
  );
};

export default ProjectDesign;
