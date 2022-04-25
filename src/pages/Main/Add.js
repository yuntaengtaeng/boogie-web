import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import GroupInfoInput from '../../components/Main/Add/GroupInfoInput';
import TeamInput from '../../components/Main/Add/TeamInput';
import ProjectDesignPdf from '../../components/Main/Add/ProjectDesignPdf';
import ProjectVideoLink from '../../components/Main/Add/ProjectVideoLink';
import PlattformsAndTechnologysSelect from '../../components/Main/Add/PlattformsAndTechnologysSelect';
import Button from '../../components/Ui/Button';

const StyledDiv = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  ${(props) => props.hidden && `display:none`};
`;

const StyledSpan = styled.span`
  display: flex;
  justify-content: center;
  margin: 1.25rem;
`;

const Add = () => {
  const { accessToken } = useSelector((state) => state.user);
  const [member, setMember] = useState({});
  const [memberImage, setMemberImage] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [projectUrl, setProjectUrl] = useState([]);
  const [groupInfo, setGroupInfo] = useState({
    groupName: '',
    year: '',
    classID: null,
  });
  const [plattformsAndTechnologys, setPlattformsAndTechnologys] = useState({
    plattform: [],
    technology: [],
  });
  const [step, setStep] = useState(1);

  const stateEmptying = useCallback((section) => {
    switch (section) {
      case 'groupInfo':
        setGroupInfo({
          groupName: '',
          year: '',
          classID: null,
        });
        break;
      case 'member':
        setMember({});
        setMemberImage([]);
        break;
      case 'projectDesignPdf':
        setPdfFile(null);
        break;
      case 'projectVideoLink':
        setProjectUrl([]);
        break;
      case 'plattformsAndTechnologys':
        setPlattformsAndTechnologys({
          plattform: [],
          technology: [],
        });
        break;
      default:
        return;
    }
  }, []);

  const onGroupInfoHandler = (data) => {
    setGroupInfo(data);
    setStep(2);
  };

  const onMemberInfoHandler = (data) => {
    setMember(data.member);
    setMemberImage(data.postFile);
    setStep(3);
  };

  const onPdfFileHandler = (data) => {
    setPdfFile(data);
    setStep(4);
  };

  const onProjectUrlHandler = (data) => {
    setProjectUrl(data);
    setStep(5);
  };
  const onPlattformsAndTechnologysHandler = (data) => {
    setPlattformsAndTechnologys(data);
    setStep(6);
  };

  const onPostSenierProject = () => {
    const plattformsId = plattformsAndTechnologys.plattform.map((v) => {
      return v.value;
    });

    const technologysId = plattformsAndTechnologys.technology.map((v) => {
      return v.value;
    });

    const formData = new FormData();

    memberImage.forEach((v, i) => {
      formData.append(`profileImage${i + 1}`, v, member[i].name);
    });

    formData.append(`groupName`, groupInfo.groupName);
    formData.append(`classID`, groupInfo.classID);
    formData.append(`year`, groupInfo.year);
    formData.append(`teamMember`, JSON.stringify(member));
    formData.append(`link`, JSON.stringify(projectUrl));
    formData.append(`plattform`, JSON.stringify(plattformsId));
    formData.append(`technology`, JSON.stringify(technologysId));
    formData.append(`projectDesign`, pdfFile, pdfFile.name);

    console.log(formData);
    for (var pair of formData.entries()) {
      console.log('key : ' + pair[0] + ' , value : ' + pair[1]);
    }

    const postSenierProject = async () => {
      try {
        const senierProject = await axios.post('api/senier-project', formData, {
          headers: {
            authorization: accessToken,
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (e) {
        alert(e.message);
      } finally {
        window.history.back();
      }
    };
    postSenierProject();
  };

  const satisfied =
    Object.keys(member).length === 0 ||
    groupInfo.groupName === '' ||
    plattformsAndTechnologys.plattform.length === 0 ||
    pdfFile === null ||
    projectUrl.length === 0;

  return (
    <article>
      <StyledDiv>
        <GroupInfoInput
          onGroupInfoHandler={onGroupInfoHandler}
          stateEmptying={stateEmptying}
        />
      </StyledDiv>
      {step > 1 && (
        <StyledDiv>
          <TeamInput
            onMemberInfoHandler={onMemberInfoHandler}
            stateEmptying={stateEmptying}
          />
        </StyledDiv>
      )}
      {step > 2 && (
        <StyledDiv>
          <ProjectDesignPdf
            onPdfFileHandler={onPdfFileHandler}
            stateEmptying={stateEmptying}
          />
        </StyledDiv>
      )}

      {step > 3 && (
        <StyledDiv>
          <ProjectVideoLink
            onProjectUrlHandler={onProjectUrlHandler}
            stateEmptying={stateEmptying}
          />
        </StyledDiv>
      )}

      {step > 4 && (
        <StyledDiv>
          <PlattformsAndTechnologysSelect
            onPlattformsAndTechnologysHandler={
              onPlattformsAndTechnologysHandler
            }
            stateEmptying={stateEmptying}
          />
        </StyledDiv>
      )}

      {step > 5 && (
        <StyledDiv>
          <StyledSpan>
            <Button onClick={onPostSenierProject} disabled={satisfied}>
              작성 완료
            </Button>
          </StyledSpan>
        </StyledDiv>
      )}
    </article>
  );
};

export default Add;
