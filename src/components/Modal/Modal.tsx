import React, { ReactNode } from 'react';
import styled from 'styled-components';
import zIndex from '../../zIndex';

type Props = {
  children: ReactNode;
  title: string;
  onDismiss: VoidFunction;
};

function Modal({ children, title, onDismiss }: Props) {
  return (
    <Wrapper>
      <Body>
        <TopBar>
          <h5>{title}</h5>
          <Button onClick={onDismiss}>
            <i className="fas fa-times" />
          </Button>
        </TopBar>
        {children}
      </Body>
    </Wrapper>
  );
}

export default Modal;

const Wrapper = styled.div`
  z-index: ${zIndex.modal};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
  color: #222222;
`;

const Body = styled.div`
  width: 400px;
  display: flex;
  flex-flow: column;
  background-color: #ffffff;
  border-radius: 5px;
`;

const TopBar = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 15px;
`;

const Button = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
`;
