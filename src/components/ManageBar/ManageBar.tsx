import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

type Props = {
  total: number;
  onOpenCreate: VoidFunction;
};

const ManageBar = ({ total, onOpenCreate }: Props) => (
  <Bar>
    <h1>My Classes ({total})</h1>
    <ButtonRow>
      <Button onClick={onOpenCreate}>
        <i className="fas fa-plus" />
        Create
      </Button>
    </ButtonRow>
  </Bar>
);

export default ManageBar;

const Bar = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding: 0 25px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  i {
    margin-right: 10px;
  }
`;
