import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import styled from 'styled-components';
import { GRAY, BLACK, WHITE } from '../../constants/color';

import MainCardPreview from '../../components/Main/Main/MainCardPreview';
import Button from '../../components/Ui/Button';
import OutLineButton from '../../components/Ui/OutLineButton';
import FilterForm from '../../components/Main/Main/FilterForm';
import Modal from '../../components/Ui/Modal/Modal';
import Header from '../../components/Ui/Modal/Header';
import uiSlce from '../../slices/ui';

const StyledSection = styled.section`
  padding: 100px 150px;
  height: fit-content;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
`;

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
`;

const StyledCardDiv = styled.div`
  display: grid;
  justify-items: center;
  gap: 1rem;
  grid-template-columns: repeat(auto-Fill, minmax(300px, 1fr));
`;

const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledSpan = styled.span`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FilterOptionDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledDiv = styled.div`
  flex: 1;
`;

const StyledStrong = styled.strong`
  font-size: 40px;
  font-weight: bold;
  line-height: 60px;
`;

const StyledP = styled.p`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const StyleDatePicker = styled(DatePicker)`
  width: 236px;
  height: 30px;
  margin: 20px 0;
  padding: 0;
  padding-left: 12px;
  border: 1px solid ${GRAY};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${BLACK};
`;

const Main = () => {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.user);
  const [startDate, setStartDate] = useState(new Date());
  const [platList, setPlatList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [isFillterClicked, setIsFillterClicked] = useState(true);
  const [isFillterOption, setIsFillterOption] = useState(true);
  const [fillterOption, setFillterOption] = useState({
    userName: '',
    platforms: [],
    skills: [],
  });
  const [cardInfo, setCardInfo] = useState([]);

  const getList = async () => {
    try {
      const getPlatforms = await axios.get('api/category/plattform');
      const getSkills = await axios.get('api/category/technology');
      setPlatList([...renameKeys(getPlatforms.data.plattformList)]);
      setSkillList([...renameKeys(getSkills.data.technologyList)]);
    } catch (e) {
      alert(e.message);
    }
  };

  const getMainCardInfo = async () => {
    const plattformQureys = fillterOption.platforms.map(
      ({ value }) => `plattform=${value}`
    );
    const technologyQureys = fillterOption.skills.map(
      ({ value }) => `technology=${value}`
    );

    const queries = [...plattformQureys, ...technologyQureys].join('&');

    let URL = `api/senier-project/card?year=${startDate.getFullYear()}`;

    if (!!fillterOption.userName) {
      URL += `&name=${fillterOption.userName}`;
    }

    if (!!queries) {
      URL += `&${queries}`;
    }

    dispatch(uiSlce.actions.showLoading());

    try {
      const mainCardInfo = await axios.get(URL);
      setCardInfo(mainCardInfo.data.senierProjectCardList);
    } catch (e) {
      alert(e.message);
    } finally {
      dispatch(uiSlce.actions.hideLoading());
    }
  };

  const renameKeys = (arr) => {
    const result = arr.map((v) => {
      const newKey = {};
      newKey['value'] = v.id;
      newKey['name'] = v.name;
      return newKey;
    });
    return result;
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (
      !!fillterOption.userName ||
      fillterOption.platforms.length !== 0 ||
      fillterOption.skills.length !== 0
    ) {
      setIsFillterOption(true);
    } else {
      setIsFillterOption(false);
    }
    getMainCardInfo();
  }, [fillterOption, startDate]);

  return (
    <StyledSection>
      <StyledHeader>
        <StyledDiv>
          <StyledStrong>
            졸업 작품과
            <br />
            채용 공고를
            <br />
            찾는 가장 쉬운 방법
          </StyledStrong>
          <StyledP>boogie on &amp; on에서 작품을 구경해보세요.</StyledP>
        </StyledDiv>
        <img
          alt="메인이미지"
          src={process.env.PUBLIC_URL + '/asset/main/main.png'}
        />
      </StyledHeader>
      <StyledArticle>
        <StyleDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showYearPicker
          dateFormat="yyyy"
        />
        <FilterDiv>
          <StyledSpan>
            <OutLineButton
              onClick={() => {
                setIsFillterClicked(!isFillterClicked);
              }}
            >
              조건에 맞는 작품 찾기
            </OutLineButton>
            {isAdmin !== true || (
              <Button style={{ float: 'right' }}>
                <Link
                  style={{ textDecoration: 'none', color: `${WHITE}` }}
                  to="/main/add"
                >
                  글쓰기
                </Link>
              </Button>
            )}
          </StyledSpan>
          {!isFillterOption || (
            <FilterOptionDiv>
              {!fillterOption.userName || (
                <OutLineButton>{fillterOption.userName}</OutLineButton>
              )}
              {fillterOption.platforms.length === 0 ||
                fillterOption.platforms.map((v) => (
                  <OutLineButton key={v.value}>{v.name} </OutLineButton>
                ))}
              {fillterOption.skills.length === 0 ||
                fillterOption.skills.map((v) => (
                  <OutLineButton key={v.value}>{v.name} </OutLineButton>
                ))}
            </FilterOptionDiv>
          )}
        </FilterDiv>
      </StyledArticle>
      <StyledCardDiv>
        {cardInfo.map((v) => (
          <StyledLink
            to={`/main/detail/${v.id}`}
            style={{ marginBottom: '20px' }}
            key={v.id}
          >
            <MainCardPreview
              title={v.groupName}
              description={v.teamMember}
              platform={v.plattform}
              lookup={v.viewCount}
              technologyStacks={v.technology}
            ></MainCardPreview>
          </StyledLink>
        ))}
      </StyledCardDiv>
      {isFillterClicked || (
        <Modal>
          <Header
            onClose={() => {
              setIsFillterClicked(!isFillterClicked);
            }}
          ></Header>
          <FilterForm
            platList={platList}
            skillList={skillList}
            setFillterOption={setFillterOption}
            item={fillterOption}
            setIsFillterClicked={setIsFillterClicked}
          ></FilterForm>
        </Modal>
      )}
    </StyledSection>
  );
};

export default Main;
