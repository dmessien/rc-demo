import React from 'react';
import Modal from './Modal';
import { IClass } from '../../classes';
import styled from 'styled-components';
import { classTypeEnum } from '../../classes';
import Button from '../Button';

type Props = {
  data: IClass;
  onDismiss: VoidFunction;
  onDelete: VoidFunction;
};

const ClassModal = ({ data, onDismiss, onDelete }: Props) => {
  const {
    title,
    featuredImage,
    instructor,
    duration,
    description,
    classType,
  } = data;
  return (
    <Modal title="Class info" onDismiss={onDismiss}>
      <TitleOverlay image={featuredImage}>
        <h1>{title}</h1>
      </TitleOverlay>
      <TextBox>
        <TextPair>
          <h3>Instructor: </h3>
          <h3>{instructor}</h3>
        </TextPair>
        <TextPair>
          <h3>Duration: </h3>
          <h3>{duration} min</h3>
        </TextPair>
        <ClassTypeText>{classTypeEnum[classType]}</ClassTypeText>
        <h6>{description}</h6>
        <DeleteButton onClick={onDelete}>
          <i className="fas fa-minus" />
          Remove this class
        </DeleteButton>
      </TextBox>
    </Modal>
  );
};

export default ClassModal;

const TitleOverlay = styled.div<{ image: string }>`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.25)),
    url(${props => props.image});
  background-size: cover;
  width: 100%;
  height: 200px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 0 5%;
  h1 {
    color: #ffffff;
    font-weight: 700;
    text-align: center;
  }
`;

const TextBox = styled.div`
  padding: 25px;
  text-align: left;
  h6 {
    margin-top: 25px;
    font-weight: 400;
  }
`;

const TextPair = styled.div`
  display: flex;
  flex-flow: row;
  margin-bottom: 15px;
  h3 {
    font-weight: 400;
  }
  h3:first-child {
    margin-right: 10px;
    font-weight: 600;
    min-width: 135px;
  }
`;

const ClassTypeText = styled.h6`
  color: #777777;
  font-weight: 400;
  text-transform: uppercase;
`;

const DeleteButton = styled(Button)`
  background-color: #ff0044;
  border-color: #ff0044;
  color: #ffffff;
  margin-top: 25px;
  width: 100%;
  &:hover {
    background-color: #dd1111;
    border-color: #dd1111;
  }
  i {
    margin-right: 10px;
  }
`;
