import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { GRAY, LIGHT_GRAY } from '../../../constants/color';
import { VscChevronDown, VscChevronUp, VscInfo } from 'react-icons/vsc';
import Line from '../../Ui/Line';
import PropTypes from 'prop-types';

const Container = styled.div`
  background-color: ${LIGHT_GRAY};
  box-sizing: border-box;
  padding: 1rem;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
`;

const Bottom = styled.p`
  margin-top: 1rem;
  color: ${GRAY};
  font-size: 0.8rem;
`;
const Emphasize = styled.span`
  font-weight: bold;
  color: #666;
`;

const Precautions = ({ companyName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerClickHandler = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <Container onClick={containerClickHandler}>
      <Top>
        <VscInfo size={24}></VscInfo>
        <h5>
          본 채용정보는 boogie on &#38; on의 동의없이 무단전재, 재배포, 재가공할
          수 없으며,
          <br /> 구직활동 이외의 용도로 사용할 수 없습니다.
        </h5>
        {isOpen ? <VscChevronUp size={24} /> : <VscChevronDown size={24} />}
      </Top>
      {isOpen && (
        <Bottom>
          <Line />본 채용 정보는 <Emphasize>{companyName}</Emphasize>에서 제공한
          자료를 바탕으로 boogie on &#38; on에서 표현을 수정하고 이의 배열 및
          구성을 편집하여 완성한 boogie on &#38; on의 저작자산이자
          영업자산입니다. 본 정보 및 데이터베이스의 일부 내지는 전부에 대하여
          boogie on &#38; on의 동의 없이 무단전재 또는 재배포, 재가공 및
          크롤링할 수 없으며, 게재된 채용기업의 정보는 구직자의 구직활동 이외의
          용도로 사용될 수 없습니다. boogie on &#38; on은&nbsp;
          <Emphasize>{companyName}</Emphasize>에서 게재한 자료에 대한 오류나 그
          밖에 boogie on &#38; on이 가공하지 않은 정보의 내용상 문제에 대하여
          어떠한 보장도 하지 않으며, 사용자가 이를 신뢰하여 취한 조치에 대해
          책임을 지지 않습니다.
        </Bottom>
      )}
    </Container>
  );
};

Precautions.propTypes = {
  companyName: PropTypes.string,
};

export default Precautions;
