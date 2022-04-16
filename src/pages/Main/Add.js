import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import GroupInfoInput from '../../components/Main/Add/GroupInfoInput';
import TeamInput from '../../components/Main/Add/TeamInput';
import ProjectDesignPdf from '../../components/Main/Add/ProjectDesignPdf';
import ProjectVideoLink from '../../components/Main/Add/ProjectVideoLink';
import PlatformAndSkillSelect from '../../components/Main/Add/PlatformAndSkillSelect';
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
  margin: 20px;
`;

const Add = () => {
  const { accessToken } = useSelector((state) => state.user);
  const [member, setMember] = useState({});
  const [memberImage, setMemberImage] = useState([]);
  const [pdfFile, setPdfFile] = useState();
  const [projectUrl, setProjectUrl] = useState([]);
  const [groupInfo, setGroupInfo] = useState({
    groupName: '',
    year: '',
  });
  const [platformsAndSkills, setPlatformsAndSkills] = useState({
    platforms: [],
    skills: [],
  });

  const [isSubmit, setSubmit] = useState(1);
  const formData = new FormData();

  const onPostSenierProject = () => {
    const platformsId = platformsAndSkills.platforms.map((v) => {
      return v.value;
    });

    const skillsId = platformsAndSkills.skills.map((v) => {
      return v.value;
    });

    memberImage.forEach((v, i) => {
      formData.append(`profileImage${i + 1}`, v, member[i].name);
    });

    formData.append(`groupName`, groupInfo.groupName);
    formData.append(`year`, groupInfo.year);
    formData.append(`teamMember`, JSON.stringify(member));
    formData.append(`link`, JSON.stringify(projectUrl));
    formData.append(`plattform`, JSON.stringify(platformsId));
    formData.append(`technology`, JSON.stringify(skillsId));
    formData.append(`projectDesign`, pdfFile, pdfFile.name);

    const postSenierProject = async () => {
      try {
        const senierProject = await axios.post('api/senier-project', formData, {
          headers: {
            authorization: accessToken,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(senierProject);
      } catch (e) {
        alert(e.message);
      }
    };
    postSenierProject();
  };

  return (
    <article>
      <StyledDiv>
        <GroupInfoInput getInfo={setGroupInfo} isSubmit={setSubmit} />
      </StyledDiv>
      <StyledDiv hidden={isSubmit < 2}>
        <TeamInput
          getMember={setMember}
          getMemberImage={setMemberImage}
          isSubmit={setSubmit}
        />
      </StyledDiv>
      <StyledDiv hidden={isSubmit < 3}>
        <ProjectDesignPdf getPdfFile={setPdfFile} isSubmit={setSubmit} />
      </StyledDiv>
      <StyledDiv hidden={isSubmit < 4}>
        <ProjectVideoLink getUrl={setProjectUrl} isSubmit={setSubmit} />
      </StyledDiv>
      <StyledDiv hidden={isSubmit < 5}>
        <PlatformAndSkillSelect
          getPlatAndSkill={setPlatformsAndSkills}
          isSubmit={setSubmit}
        />
      </StyledDiv>
      <StyledDiv hidden={isSubmit < 6}>
        <StyledSpan>
          <Button onClick={onPostSenierProject}>작성 완료</Button>
        </StyledSpan>
      </StyledDiv>
    </article>
  );
};

export default Add;
