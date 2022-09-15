import React from 'react';
import { useNavigate } from 'react-router-dom';

import CardPreview from '../../Ui/Card/CardPreview';

import GridCardPreview from '../../Ui/Layout/GridCardPreview';

const JobPostingGroup = ({ list = [] }) => {
  const navigate = useNavigate();

  return (
    <div>
      <GridCardPreview>
        {list.map((item) => (
          <CardPreview
            onClick={() => {
              navigate(`/jobposting/detail/${item.id}`);
            }}
            key={item.id}
            src={item.image}
            title={item.companyName}
            description={`${item.region} · ${item.position}`}
            viewCount={item.viewCount}
          />
        ))}
      </GridCardPreview>
    </div>
  );
};

export default JobPostingGroup;
