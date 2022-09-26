import React from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const StyledPdfDiv = styled.div`
  margin: 0 3.125rem;
  box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);

  @media all and (max-width: 479px) {
    margin: 0 0.6rem;
  }

  ${({ isMobile }) =>
    isMobile &&
    `
      .react-pdf__Page__canvas{
        width:100% !important;
        height: 100% !important;
        overflow: hidden;
      }
    `}
`;

const PdfViewer = ({
  isMobile,
  projectDesign,
  onDocumentLoadSuccess,
  pageNumber,
}) => {
  return (
    <StyledPdfDiv isMobile={isMobile}>
      <Document file={projectDesign} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </StyledPdfDiv>
  );
};

export default PdfViewer;
