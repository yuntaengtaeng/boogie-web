import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import MemberIntroduction from './MemberIntroduction';
import ProjectDesign from './ProjectDesign';
import DemonstrationVideo from './DemonstrationVideo';

const DetailContents = ({ selectedIndex }) => {
  const selectTab = useCallback((index) => {
    switch (index) {
      case 0:
        return <MemberIntroduction></MemberIntroduction>;
      case 1:
        return <ProjectDesign></ProjectDesign>;
      case 2:
        return <DemonstrationVideo></DemonstrationVideo>;
      default:
        return null;
    }
  }, []);

  const contents = selectTab(selectedIndex);

  return <>{contents}</>;
};

DetailContents.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
};

export default DetailContents;
