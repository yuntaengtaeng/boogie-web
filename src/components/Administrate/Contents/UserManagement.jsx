import React from 'react';

import Context from '../UserManagement/Context';
import Inner from '../UserManagement/Inner';

const UserManagement = () => {
  return (
    <Context>
      <Inner />
    </Context>
  );
};

export default UserManagement;
