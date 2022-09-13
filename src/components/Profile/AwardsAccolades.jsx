import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { GRAY } from '../../constants/color';
import DatePicker from 'react-datepicker';
import Input from '../Ui/Input';
import Button from '../Ui/Button';
import DeleteLable from '../Ui/DeleteLable';
import Line from '../Ui/Line';
import ExplanationBox from '../Ui/ExplanationBox';
import { ko } from 'date-fns/esm/locale';

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 2rem;
  margin: 1rem 0;
  height: fit-content;

  @media all and (max-width: 479px) {
    flex-direction: column;
  }
`;

const StyledTitle = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const StyleDatePicker = styled(DatePicker)`
  width: 14.75rem;
  height: 1.875rem;
  padding: 0;
  padding-left: 0.75rem;
  border: 1px solid ${GRAY};
  @media all and (max-width: 479px) {
    width: 17.9rem;
  }
`;

const AwardsDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-top: 0.5rem;
  gap: 2rem;

  @media all and (max-width: 479px) {
    margin-top: 0.5rem;
    margin-left: 0;
    gap: 1rem;
  }
`;

const AwardsInput = styled(Input)`
  width: 18.75rem;
  @media all and (max-width: 479px) {
    width: 18.75rem;
  }
`;

const AddButton = styled(Button)`
  @media all and (max-width: 479px) {
    width: 18.75rem;
    margin-top: 1rem;
  }
`;

const AwardsAccolades = ({ awards, onAwardsHandler, isMe }) => {
  const [awardsName, setAwardsName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const year = startDate.getFullYear();
  const month = ('00' + (startDate.getMonth() + 1)).slice(-2);
  const [awardsDate, setAwardsDate] = useState(awards || []);
  const EXPLANATION = [
    '수상 이력, 직무 관련 자격증, 수료한 교육이나 참석한 외부활동 등이 있다면 간략히 작성해주세요.',
    '지원하는 회사에서 요구하는 경우가 아니라면 운전면허증과 같은 자격증은 생략하는 것이 좋습니다!',
  ];

  const onclick = () => {
    const awardedAt = year + '.' + month;
    const item = [
      ...awardsDate,
      {
        name: awardsName,
        awardedAt,
      },
    ];

    setAwardsDate(item);
    setAwardsName('');
    setStartDate(new Date());
  };

  const onDeleteHandler = (e) => {
    const filter = awardsDate.filter((v) => v !== e);

    setAwardsDate(filter);
  };

  useEffect(() => {
    onAwardsHandler(awardsDate);
  }, [awardsDate]);
  return (
    <StyledDiv>
      <StyledTitle>수상 및 기타</StyledTitle>
      {isMe && <ExplanationBox arr={EXPLANATION} />}
      <StyledSpan>
        {isMe && (
          <>
            <AwardsInput
              type="text"
              placeholder="수상내역"
              value={awardsName}
              onChange={(e) => {
                setAwardsName(e.target.value);
              }}
            ></AwardsInput>
            <span>
              <StyleDatePicker
                placeholder="YYYY.MM"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy.MM"
                locale={ko}
                showMonthYearPicker
              ></StyleDatePicker>
            </span>
            <AddButton
              type="button"
              onClick={onclick}
              disabled={awardsName === ''}
            >
              추가
            </AddButton>
          </>
        )}

        <AwardsDiv>
          {awardsDate.length !== 0 &&
            awardsDate.map((v) => (
              <DeleteLable
                key={v.name}
                onDeleteHandler={
                  isMe
                    ? () => {
                        onDeleteHandler(v);
                      }
                    : null
                }
              >
                {v.name} {v.awardedAt}
              </DeleteLable>
            ))}
        </AwardsDiv>
      </StyledSpan>

      <Line styled={{ margin: '1rem 0' }} />
    </StyledDiv>
  );
};

export default AwardsAccolades;
