import React from 'react';
import BasicTable, { TableBodyCell } from '../../Ui/BasicTable';
import Button, { BUTTON_THEME } from '../../Ui/Button';

const thead = [
  {
    id: 'id',
    label: '아이디',
  },
  {
    id: 'delete',
    label: '',
  },
];

const AdminTable = ({ list, onDeleteHandler }) => {
  return (
    <BasicTable
      thead={thead}
      dataSource={list}
      createBody={(data) => (
        <>
          <TableBodyCell>{data.id}</TableBodyCell>
          <TableBodyCell>
            <Button
              theme={BUTTON_THEME.PRIMARY}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDeleteHandler(data.id);
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

export default AdminTable;
