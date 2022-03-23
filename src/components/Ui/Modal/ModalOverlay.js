import React from 'react';
import PropTypes from 'prop-types';
import { WHITE } from '../../../constants/color';

import Card from '../Card/Card';

const ModalOverlay = ({ children }) => {
  return (
    <Card
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: '100',
        background: WHITE,
        overflow: 'hidden',
      }}
    >
      {children}
    </Card>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalOverlay;
