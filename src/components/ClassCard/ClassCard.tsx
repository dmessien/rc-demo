import React from 'react';
import { IClass } from '../../classes';
import styled from 'styled-components';
import { MEDIA_QUERY_SMALL, MEDIA_QUERY_MOBILE } from '../../mediaQueries';
import Button from '../Button';

type Props = {
  data: IClass;
  onSelect: VoidFunction;
};

const ClassCard = ({ data, onSelect }: Props) => {
  const { title, featuredImage, instructor, duration } = data;
  return (
    <Card>
      <Image src={featuredImage} alt={title} />
      <TextBox>
        <TitleAndDuration>
          <Title>{title}</Title>
          <Bubble>
            <p>{duration}</p>
            <p>min</p>
          </Bubble>
        </TitleAndDuration>
        <div>
          <h6 style={{ fontWeight: 300 }}>Instructor:</h6>
          <h6>{instructor}</h6>
        </div>
        <Button onClick={onSelect}>More info</Button>
      </TextBox>
    </Card>
  );
};

export default ClassCard;

const Card = styled.div`
  height: 365px;
  width: 250px;
  border-radius: 5px;
  border: solid 1px #f5f5f5;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;

  @media ${MEDIA_QUERY_SMALL} {
    width: 85%;
  }

  @media ${MEDIA_QUERY_MOBILE} {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 50%;
`;

const TextBox = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  flex: 1;
`;

const TitleAndDuration = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h6`
  flex: 1;
  text-align: left;
`;

const Bubble = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f2f2f2;
  border-radius: 50%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;
