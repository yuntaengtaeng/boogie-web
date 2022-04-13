import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import CardPreview from '../../Ui/Card/CardPreview';

const Group = styled.div`
  gap: 1rem;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-Fill, minmax(300px, 1fr));
`;

const JobPostingGroup = ({ list = [], style }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Group style={style}>
        {list.map((item) => (
          <CardPreview
            onClick={() => {
              navigate(`/jobposting/detail/${item.id}`);
            }}
            key={item.id}
            src={item.image}
            title={item.companyName}
            description={`${item.region} ${item.position}`}
            viewCount={item.viewCount}
          />
        ))}
      </Group>
    </div>
  );
};

export default JobPostingGroup;
