import React from 'react';

import styled from 'styled-components';
import { GRAY, BLACK, LIGHT_GRAY, PRIMARY } from '../../constants/color';

const TableComponent = styled.table`
  width: 100%;
  text-align: left;
  border-radius: 2px 2px 0 0;
  border-collapse: separate;
  border-spacing: 0;

  th,
  td {
    padding: 1rem 1rem;
    overflow-wrap: break-word;
  }

  > thead > tr > th:not(:last-child)::before {
    position: absolute;
    top: 50%;
    right: 0;
    width: 1px;
    height: 1.6em;
    background-color: rgba(0, 0, 0, 0.06);
    transform: translateY(-50%);
    content: '';
  }
`;

const TabelHeadCell = styled.th`
  position: relative;
  color: ${BLACK};
  font-weight: 500;
  text-align: left;
  background: ${LIGHT_GRAY};
  border-bottom: 1px solid ${GRAY};
`;

const TableBodyRow = styled.tr`
  ${({ selected }) =>
    selected &&
    `
        background-color : ${PRIMARY};
        opacity: 0.8;
    `}
`;

export const TableBodyCell = styled.td`
  border-bottom: 1px solid ${GRAY};
`;

const BasicTable = ({
  thead,
  dataSource,
  createBody,
  onRowClickHandler,
  selectedRowId,
}) => {
  return (
    <TableComponent>
      <thead>
        <tr>
          {thead.map((head) => (
            <TabelHeadCell key={head.id}>{head.label}</TabelHeadCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data) => {
          return (
            <TableBodyRow
              selected={selectedRowId === data.key}
              onClick={() => {
                onRowClickHandler(data);
              }}
              key={data.key}
            >
              {createBody(data)}
            </TableBodyRow>
          );
        })}
      </tbody>
    </TableComponent>
  );
};

export default BasicTable;
