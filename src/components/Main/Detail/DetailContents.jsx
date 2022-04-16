import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import MemberIntroduction from './MemberIntroduction';
import ProjectDesign from './ProjectDesign';
import DemonstrationVideo from './DemonstrationVideo';

const DetailContents = ({ id, selectedIndex }) => {
  const selectTab = useCallback(
    (index) => {
      switch (index) {
        case 0:
          return <MemberIntroduction id={id}></MemberIntroduction>;
        case 1:
          return <ProjectDesign id={id}></ProjectDesign>;
        case 2:
          return <DemonstrationVideo id={id}></DemonstrationVideo>;
        default:
          break;
      }
    },
    [id]
  );

  const contents = selectTab(selectedIndex);

  return <>{contents}</>;
};

DetailContents.propTypes = {
  id: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

export default DetailContents;
