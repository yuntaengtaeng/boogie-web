import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BLACK } from '../../../constants/color';
import { useParams, useNavigate } from 'react-router-dom';
import MainCardPreview from '../Main/MainCardPreview';
import axios from 'axios';

const Wrap = styled.div`
  width: 80vw;
  margin: 1rem auto;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 2.5rem 0rem;
  text-align: center;
`;

const StyledCardDiv = styled.div`
  display: grid;
  justify-items: center;
  gap: 1rem;
  grid-template-columns: repeat(auto-Fill, minmax(18.75rem, 1fr));
  margin-bottom: 8rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${BLACK};
`;

const Recommend = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recommendData, setRecommendData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { senierProjectRecommendList },
        } = await axios.get(`api/senier-project/recommend?id=${id}`);

        setRecommendData(senierProjectRecommendList);
      } catch (error) {
        console.log(error.message);
      }
    };

    getData();
  }, [id]);

  const moveDetail = useCallback(
    (detailId) => {
      navigate(`/main/detail/${detailId}`);
    },
    [navigate]
  );

  return (
    <Wrap>
      {!!recommendData.length && (
        <>
          <Title>이런 작품은 어때요?</Title>
          <StyledCardDiv>
            {recommendData.map((data) => (
              <div onClick={moveDetail.bind(this, data.id)} key={data.id}>
                <MainCardPreview
                  title={`${data.year} / ${data.groupName}`}
                  description={data.teamMember}
                  platform={data.plattform}
                  lookup={data.viewCount}
                  technologyStacks={data.technology}
                />
              </div>
            ))}
          </StyledCardDiv>
        </>
      )}
    </Wrap>
  );
};

export default Recommend;
