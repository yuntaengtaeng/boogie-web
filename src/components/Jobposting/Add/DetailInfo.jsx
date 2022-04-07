import React from 'react';
import styled from 'styled-components';
import Dropdown from '../../Ui/Dropdown';
import OutLineButton from '../../Ui/OutLineButton';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { GRAY } from '../../../constants/color';

const StyledDatePicker = styled(DatePicker)`
  height: 33px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 1rem;
  border: 1px solid ${GRAY};
`;

const Sub = styled.div`
  width: 30%;

  @media all and (max-width: 479px) {
    width: 100%;
  }
`;

const StyledButton = styled(OutLineButton)`
  margin-bottom: 1rem;
`;

const DetailInfo = ({ address, position, date }) => {
  return (
    <Sub>
      <div>
        <StyledButton type="button" onClick={address?.onClick}>
          주소 검색
        </StyledButton>
        <span>{address?.address}</span>
      </div>
      <Dropdown
        value={position?.positionId || ''}
        placeholder="채용 포지션"
        onChange={position?.onChange}
        options={position?.options || []}
      />
      <StyledDatePicker
        minDate={addDays(new Date(), 1)}
        placeholderText="마감 일자"
        dateFormat="yyyy/MM/dd"
        locale={ko}
        onChange={date?.onChange}
        selected={date?.deadline}
      ></StyledDatePicker>
    </Sub>
  );
};

export default DetailInfo;
