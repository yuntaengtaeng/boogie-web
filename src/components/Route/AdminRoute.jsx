import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const AdminRoute = () => {
  const { email, isAdmin } = useSelector((state) => state.user);
  const location = useLocation();
  const isLoggiend = !!email;

  return isLoggiend && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/noaccess" state={{ from: location }} />
  );
};

export default AdminRoute;
