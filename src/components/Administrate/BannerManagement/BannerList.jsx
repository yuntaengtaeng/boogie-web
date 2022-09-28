import React from 'react';
import styled from 'styled-components';
import DeleteLable from '../../Ui/DeleteLable';
import Tooltip from '../../Ui/Tooltip';

const StyledImg = styled.img`
  height: fit-content;
  width: fit-content;
`;

const StyledDeleteLable = styled(DeleteLable)`
  &:hover > .tooltip {
    display: block;
  }
`;

const BannerList = ({ list, onDeleteHandler }) => {
  const fileList = (
    <>
      {list.length}/5
      {list.map((v, i) => {
        return (
          <Tooltip
            tooltipStyle={{ marginLeft: '50rem', marginTop: '25rem' }}
            style={{ marginTop: '1rem' }}
            key={v.fileName}
            message={<StyledImg src={v.image}></StyledImg>}
          >
            <StyledDeleteLable
              onDeleteHandler={() => {
                onDeleteHandler(v);
              }}
            >
              {v.fileName}
            </StyledDeleteLable>
          </Tooltip>
        );
      })}
    </>
  );
  return <div>{fileList}</div>;
};

export default BannerList;
