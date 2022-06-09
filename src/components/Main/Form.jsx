import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

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
`;

const StyledSpan = styled.span`
  display: flex;
  justify-content: center;
  margin: 1.25rem;
`;

const Form = ({ onDataHandler, isEdit, data }) => {
  const isData = !!data;
  const [member, setMember] = useState(isData ? data.teamMember : {});
  const [memberImage, setMemberImage] = useState([]);
  const [pdfFile, setPdfFile] = useState(isData ? data.projectDesign : null);
  const [projectUrl, setProjectUrl] = useState(isData ? data.link : []);
  const [groupInfo, setGroupInfo] = useState({
    groupName: isData ? data.groupName : '',
    year: isData ? data.year : '',
    classId: isData ? data.classInfo.id : null,
  });
  const [plattformsAndTechnologys, setPlattformsAndTechnologys] = useState({
    plattform: isData ? data.plattform : [],
    technology: isData ? data.technology : [],
  });
  const [step, setStep] = useState(isEdit ? 6 : 1);

  const stateEmptying = useCallback((section) => {
    switch (section) {
      case 'groupInfo':
        setGroupInfo({
          groupName: '',
          year: '',
          classId: null,
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

  const onGroupInfoHandler = (e) => {
    setGroupInfo(e);
    setStep(isEdit ? 6 : 2);
  };

  const onMemberInfoHandler = (e) => {
    setMember(e.member);
    setMemberImage(e.postFile);
    setStep(isEdit ? 6 : 3);
  };

  const onPdfFileHandler = (e) => {
    setPdfFile(e);
    setStep(isEdit ? 6 : 4);
  };

  const onProjectUrlHandler = (e) => {
    setProjectUrl(e);
    setStep(isEdit ? 6 : 5);
  };

  const onPlattformsAndTechnologysHandler = (e) => {
    setPlattformsAndTechnologys(e);
    setStep(6);
  };

  const isSatisfied =
    Object.keys(member).length === 0 ||
    groupInfo.groupName === '' ||
    plattformsAndTechnologys.plattform.length === 0 ||
    pdfFile === null ||
    projectUrl.length === 0;

  const onsubmit = () => {
    const plattformsId = plattformsAndTechnologys.plattform.map((v) => {
      return v.value;
    });

    const technologysId = plattformsAndTechnologys.technology.map((v) => {
      return v.value;
    });

    const formData = new FormData();

    const noImageTeamMember = member.filter((data) => !data.image)

    memberImage.forEach((v, i) => {
        formData.append(`profileImage${i + 1}`, v, noImageTeamMember[i].name);
    });

    formData.append(`groupName`, groupInfo.groupName);
    formData.append(`classId`, groupInfo.classId);
    formData.append(`year`, groupInfo.year);
    formData.append(`teamMember`, JSON.stringify(member));
    formData.append(`link`, JSON.stringify(projectUrl));
    formData.append(`plattform`, JSON.stringify(plattformsId));
    formData.append(`technology`, JSON.stringify(technologysId));
    formData.append(`projectDesign`, pdfFile);

    onDataHandler(formData);
  };

  return (
    <article>
      <StyledDiv>
        <GroupInfoInput
          onGroupInfoHandler={onGroupInfoHandler}
          stateEmptying={stateEmptying}
          data={data}
          isData={isData}
        />
      </StyledDiv>
      {step > 1 && (
        <StyledDiv>
          <TeamInput
            onMemberInfoHandler={onMemberInfoHandler}
            stateEmptying={stateEmptying}
            data={data}
            isEdit={isEdit}
            isData={isData}
          />
        </StyledDiv>
      )}
      {step > 2 && (
        <StyledDiv>
          <ProjectDesignPdf
            onPdfFileHandler={onPdfFileHandler}
            stateEmptying={stateEmptying}
            data={data}
            isData={isData}
          />
        </StyledDiv>
      )}

      {step > 3 && (
        <StyledDiv>
          <ProjectVideoLink
            onProjectUrlHandler={onProjectUrlHandler}
            stateEmptying={stateEmptying}
            data={data}
            isData={isData}
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
            data={data}
            isData={isData}
          />
        </StyledDiv>
      )}

      {step > 5 && (
        <StyledDiv>
          <StyledSpan>
            <Button onClick={onsubmit} disabled={isSatisfied}>
              작성 완료
            </Button>
          </StyledSpan>
        </StyledDiv>
      )}
    </article>
  );
};

export default Form;
