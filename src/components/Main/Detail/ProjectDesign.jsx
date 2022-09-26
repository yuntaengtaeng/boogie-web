import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import uiSlce from '../../../slices/ui';
import Button from '../../Ui/Button';
import OutLineButton from '../../Ui/OutLineButton';
import { VscFilePdf } from 'react-icons/vsc';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import MobilePdfViewer from './MobilePdfViewer';
import PdfViewer from './PdfViewer';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media all and (max-width: 479px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
`;

const StyledArticle = styled.article`
  display: inline-flex;
  margin-bottom: 3.125rem;
  align-items: center;
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
  const [isShowingMobilePdf, setIsShowingMobilePdf] = useState(false);

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
      {!!projectDesign && (
        <>
          {isMobile ? (
            <>
              <Button
                onClick={() => {
                  setIsShowingMobilePdf(true);
                }}
              >
                PDF보기
              </Button>
              {isShowingMobilePdf && (
                <MobilePdfViewer
                  onClose={() => {
                    setIsShowingMobilePdf(false);
                  }}
                  previousPage={previousPage}
                  nextPage={nextPage}
                >
                  <PdfViewer
                    isMobile={isMobile}
                    projectDesign={projectDesign}
                    onDocumentLoadSuccess={onDocumentLoadSuccess}
                    pageNumber={pageNumber}
                  ></PdfViewer>
                </MobilePdfViewer>
              )}
            </>
          ) : (
            <StyledDiv>
              <StyledArticle>
                <OutLineButton
                  onClick={() => previousPage()}
                  disabled={pageNumber === 1}
                >
                  &lt;
                </OutLineButton>
                <PdfViewer
                  isMobile={isMobile}
                  projectDesign={projectDesign}
                  onDocumentLoadSuccess={onDocumentLoadSuccess}
                  pageNumber={pageNumber}
                ></PdfViewer>
                <OutLineButton
                  onClick={() => nextPage()}
                  disabled={pageNumber === totalPages}
                >
                  &gt;
                </OutLineButton>
              </StyledArticle>
              <DownLoadTag href={projectDesign} download>
                <DownloadButton>
                  <VscFilePdf size={16} />
                  PDF 다운로드
                </DownloadButton>
              </DownLoadTag>
            </StyledDiv>
          )}
        </>
      )}
    </>
  );
};

export default ProjectDesign;
