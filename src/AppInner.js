import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/Main/Main';
import MainDetail from './pages/Main/Detail';
import MainAdd from './pages/Main/Add';

import Login from './pages/Auth/Login';
import Join from './pages/Auth/Join';

import Community from './pages/Community/Community';
import CommunityAdd from './pages/Community/Add';
import COmmunityDetail from './pages/Community/Detail';

import JobPosting from './pages/JobPosting/JobPosting';
import JobPostingAdd from './pages/JobPosting/Add';
import JobPostingDetail from './pages/JobPosting/Detail';

import ProfileDetail from './pages/Profile/Detail';

import 'react-datepicker/dist/react-datepicker.css';

import Header from './components/Ui/Header';

const AppInner = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main/detail/:id" element={<MainDetail />} />
        <Route path="/main/add" element={<MainAdd />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/detail/:id" element={<COmmunityDetail />} />
        <Route path="/community/add" element={<CommunityAdd />} />
        <Route path="/jobposting" element={<JobPosting />} />
        <Route path="/jobposting/detail/:id" element={<JobPostingDetail />} />
        <Route path="/jobposting/add" element={<JobPostingAdd />} />
        <Route path="/profile/detail/:id" element={<ProfileDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppInner;
