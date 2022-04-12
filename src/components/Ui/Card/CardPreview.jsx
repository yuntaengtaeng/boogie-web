import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import PropTypes from 'prop-types';
import { GRAY, BLACK } from '../../../constants/color';

const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ImgContainer = styled.div`
  flex: 0.5;
  overflow: hidden;
  box-sizing: border-box;
  padding-top: 0.8rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Styledp = styled.p`
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
`;

const Title = styled(Styledp)`
  font-weight: bold;
  font-size: 1.1rem;
`;

const Bottom = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
  box-sizing: border-box;
`;

const ViewCountArea = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  align-self: end;
  font-size: 0.8rem;
  color: ${GRAY};
`;

const CardPreview = ({
  src,
  alt,
  title,
  sub,
  description,
  viewCount,
  onClick,
}) => {
  return (
    <Card
      style={{
        width: '15rem',
        height: '15rem',
        margin: '0.625rem',
        padding: '0',
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'flex',
      }}
    >
      <Wrap onClick={onClick}>
        <ImgContainer>
          <Img src={src} alt={alt} loading="lazy" />
        </ImgContainer>
        <Bottom>
          <Title>{title}</Title>
          <Styledp>{sub}</Styledp>
          <Styledp>{description}</Styledp>
          <ViewCountArea>
            <span>{viewCount}</span>
          </ViewCountArea>
        </Bottom>
      </Wrap>
    </Card>
  );
};

CardPreview.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  sub: PropTypes.string,
  description: PropTypes.string,
  viewCount: PropTypes.number,
  onClick: PropTypes.func,
};

export default CardPreview;
