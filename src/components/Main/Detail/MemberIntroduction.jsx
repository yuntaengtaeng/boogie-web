import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BLACK } from '../../../constants/color';
import { useDispatch } from 'react-redux';
import uiSlce from '../../../slices/ui';
import CardProfile from '../../Ui/Card/CardProfile';

const StyledSpan = styled.span`
  display: inline-block;
  ${({ index }) => {
    return index % 2 !== 0
      ? `display:flex;
        justify-content: flex-end;`
      : `display:flex;
        justify-content: flex-start;`;
  }};
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${BLACK};
  width: fit-content;
`;

const MemberIntroduction = ({ id }) => {
  const dispatch = useDispatch();
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    const getMemberList = async () => {
      dispatch(uiSlce.actions.showLoading());
      try {
        const member = await axios.get(`api/senier-project/member?id=${id}`);
        setMemberList(member.data.senierProjectMemberList);
      } catch (e) {
        alert(e.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    };

    getMemberList();
  }, []);

  return (
    <StyledDiv>
      {memberList.map((v, i) => (
        <StyledSpan key={i} style={{ margin: '50px' }} index={i}>
          <StyledLink to={`/profile/detail/:${i}`}>
            <CardProfile
              profileImg={v.image}
              name={v.name}
              description={v.introduction}
              turn={i}
            ></CardProfile>
          </StyledLink>
        </StyledSpan>
      ))}
    </StyledDiv>
  );
};

MemberIntroduction.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MemberIntroduction;
