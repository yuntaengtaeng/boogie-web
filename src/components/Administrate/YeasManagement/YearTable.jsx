import React from 'react';
import BasicTable, { TableBodyCell } from '../../Ui/BasicTable';
import Button, { BUTTON_THEME } from '../../Ui/Button';
import { addKeyList } from '../../../Utills/common';

const thead = [
  {
    id: 'year',
    label: '연도',
  },
  {
    id: 'delete',
    label: '',
  },
];

const YearTable = ({ yearCategorys, onDeleteHandler }) => {
  const list = yearCategorys.map((v) => ({
    year: v,
    key: v,
  }));

  return (
    <BasicTable
      thead={thead}
      dataSource={list}
      createBody={(data) => (
        <>
          <TableBodyCell>{data.year}</TableBodyCell>
          <TableBodyCell>
            <Button
              theme={BUTTON_THEME.PRIMARY}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDeleteHandler(data.year);
              }}
            >
              삭제
            </Button>
          </TableBodyCell>
        </>
      )}
    />
  );
};

export default YearTable;
