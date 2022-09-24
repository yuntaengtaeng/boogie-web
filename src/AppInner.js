import React, { useEffect, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';

import Header from './components/Ui/Header';
import Footer from './components/Ui/Footer';

import PrivateRoute from './components/Route/PrivateRoute';
import AdminRoute from './components/Route/AdminRoute';

import Loading from './components/Ui/Loading';

import BaseLayout from './components/Ui/Layout/BaseLayout';

import { useSelector, useDispatch } from 'react-redux';
import userSlice from './slices/user';

import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const Main = React.lazy(() => import('./pages/Main/Main'));
const MainDetail = React.lazy(() => import('./pages/Main/Detail'));
const MainAdd = React.lazy(() => import('./pages/Main/Add'));
const MainAmend = React.lazy(() => import('./pages/Main/Amend'));

const Login = React.lazy(() => import('./pages/Auth/Login'));
const Join = React.lazy(() => import('./pages/Auth/Join'));
const ResetPassword = React.lazy(() => import('./pages/Auth/ResetPassword'));

const Community = React.lazy(() => import('./pages/Community/Community'));
const CommunityAdd = React.lazy(() => import('./pages/Community/Add'));
const CommunityDetail = React.lazy(() => import('./pages/Community/Detail'));
const CommunityAmend = React.lazy(() => import('./pages/Community/Amend'));

const JobPosting = React.lazy(() => import('./pages/JobPosting/JobPosting'));
const JobPostingAdd = React.lazy(() => import('./pages/JobPosting/Add'));
const JobPostingDetail = React.lazy(() => import('./pages/JobPosting/Detail'));
const JobPostingAmend = React.lazy(() => import('./pages/JobPosting/Amend'));

const ProfileDetail = React.lazy(() => import('./pages/Profile/Detail'));

const Administrate = React.lazy(() => import('./pages/Administrate'));

const NoAccess = React.lazy(() => import('./pages/NoAccess'));

const NotFound = React.lazy(() => import('./pages/NotFound'));

const AppInner = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  const [isReady, setIsReady] = useState(false);

  //api 요청 후 accessToekn이 유효하지 않다면 재발급 후 다시 요청, refreshToken이 유효하지 않다면 사용자에게 다시 로그인 요청
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const {
          config,
          response: { status },
        } = error;

        if (status === 419) {
          if (error.response.data.code === 'expired') {
            const type = error.response.data.type;

            if (type === 'refresh') {
              dispatch(userSlice.actions.initUser());
              alert('다시 로그인해주세요.');
              return;
            } else if (type === 'access') {
              const originalRequest = config;
              const refreshToken = localStorage.getItem('refreshToken');

              const {
                data: { data },
              } = await axios.post(
                'api/token/refresh-token',
                {},
                {
                  headers: {
                    authorization: `${process.env.REACT_APP_JWT_KEY} ${refreshToken}`,
                  },
                }
              );

              //새로운 토큰 저장
              dispatch(userSlice.actions.setAccessToken(data.accessToken));
              //419 요청에 실패했던 요청 새로운 토큰으로 재요청
              originalRequest.headers.authorization = `${process.env.REACT_APP_JWT_KEY} ${data.accessToken}`;

              return axios(originalRequest);
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }, [dispatch]);

  //localStorage가 존재한다면 유효한지 판단 후 자동 로그인
  useEffect(() => {
    const requestVerifyRefreshToken = async () => {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        setIsReady(true);
        return;
      }

      try {
        const {
          data: { isValid },
        } = await axios.post(
          'api/token/verify/refresh-token',
          {},
          {
            headers: {
              authorization: `${process.env.REACT_APP_JWT_KEY} ${refreshToken}`,
            },
          }
        );

        if (!isValid) {
          throw new Error('Pass');
        }

        const {
          data: { data },
        } = await axios.post(
          'api/token/refresh-token',
          {},
          {
            headers: {
              authorization: `${process.env.REACT_APP_JWT_KEY} ${refreshToken}`,
            },
          }
        );

        //새로운 토큰 저장
        dispatch(userSlice.actions.setUser(data));
        setIsReady(true);
      } catch (error) {
        localStorage.removeItem('refreshToken');
      }
    };

    requestVerifyRefreshToken();
  }, [dispatch]);

  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      <Header />
      <BaseLayout>
        {isReady && (
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/main/detail/:id" element={<MainDetail />} />
              <Route element={<AdminRoute />}>
                <Route path="/main/add" element={<MainAdd />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="/main/amend/:id" element={<MainAmend />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/community" element={<Community />} />
              <Route
                path="/community/detail/:id"
                element={<CommunityDetail />}
              />
              <Route element={<PrivateRoute />}>
                <Route path="/community/add" element={<CommunityAdd />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="/community/amend/:id"
                  element={<CommunityAmend />}
                />
              </Route>
              <Route path="/jobposting" element={<JobPosting />} />
              <Route
                path="/jobposting/detail/:id"
                element={<JobPostingDetail />}
              />
              <Route element={<PrivateRoute />}>
                <Route path="/jobposting/add" element={<JobPostingAdd />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="/jobposting/amend/:id"
                  element={<JobPostingAmend />}
                />
              </Route>
              <Route path="/profile/detail/:id" element={<ProfileDetail />} />
              <Route element={<AdminRoute />}>
                <Route path="/administrate" element={<Administrate />} />
              </Route>
              <Route path="/noaccess" element={<NoAccess />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        )}
      </BaseLayout>
      <Footer />
    </BrowserRouter>
  );
};

export default AppInner;
