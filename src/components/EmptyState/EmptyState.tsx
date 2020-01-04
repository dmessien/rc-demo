import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

type Props = {
  onCreate: VoidFunction;
};

const EmptyState = ({ onCreate }: Props) => (
  <Wrapper>
    <h2>You have no classes!</h2>
    <h3>But don't worry, you can make your own.</h3>
    <CtaButton onClick={onCreate}>
      <i className="fas fa-plus" /> Create a class
    </CtaButton>
  </Wrapper>
);

export default EmptyState;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h2,
  h3 {
    margin-bottom: 15px;
  }
`;

const CtaButton = styled(Button)`
  background-color: #1174ff;
  color: #ffffff;
  margin-top: 15px;
  &:hover {
    background-color: #1154dd;
  }
`;
