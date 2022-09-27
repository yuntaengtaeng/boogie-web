import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uiSlice from '../../slices/ui';

import axios from 'axios';

import Form from '../../components/Main/Form';

const Amend = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { accessToken } = useSelector((state) => state.user);
  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    const renameKeys = (arr) => {
      const rename = arr.map(({ id, name }) => ({
        value: id,
        name,
      }));
      return rename;
    };

    const getProjectInfo = async () => {
      try {
        const projectInfo = await axios.get(
          `api/senier-project/detail?id=${id}`,
          {
            headers: {
              authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        const clone = projectInfo.data.senierProjectDetailInfo;

        clone.image = clone.teamMember.map((v) => {
          return v.image;
        });

        clone.plattform = renameKeys(clone.plattform);
        clone.technology = renameKeys(clone.technology);

        setProjectData(clone);
      } catch (e) {
        alert(e.response.message);
      }
    };
    getProjectInfo();
  }, [accessToken, id]);

  const patchSenierProject = async (formData) => {
    formData.append(`id`, id);

    dispatch(uiSlice.actions.showLoading());

    try {
      const senierProject = await axios.patch('api/senier-project', formData, {
        headers: {
          authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate(-1);
    } catch (e) {
      alert(e.response.message);
    } finally {
      dispatch(uiSlice.actions.hideLoading());
    }
  };

  return (
    <>
      {projectData.teamMember && (
        <Form
          onDataHandler={patchSenierProject}
          isEdit={true}
          data={projectData}
        ></Form>
      )}
    </>
  );
};

export default Amend;
