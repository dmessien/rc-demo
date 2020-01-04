import React from 'react';
import { IClass } from '../../classes';
import styled from 'styled-components';

const ClassCard = ({
  title,
  featuredImage,
  instructor,
  description,
  duration,
}: IClass) => {
  return (
    <Card>
      <Image src={featuredImage} alt={title} />
      <h4>{title}</h4>
      <h5>{instructor}</h5>
      <h5>{description}</h5>
      <h5>{duration} min</h5>
    </Card>
  );
};

export default ClassCard;

const Card = styled.div`
  height: 300px;
  width: 175px;
  border-radius: 5px;
  border: solid 1px black;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 50%;
`;
