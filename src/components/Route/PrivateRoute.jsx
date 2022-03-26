import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const { email } = useSelector((state) => state.user);
  const location = useLocation();
  const isLoggiend = !!email;

  return isLoggiend ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
