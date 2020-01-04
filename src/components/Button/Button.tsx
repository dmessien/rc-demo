import styled from 'styled-components';

const Button = styled.button`
  background-color: #f2f2f2;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.25s linear;

  &:hover {
    background-color: #eeeeee;
  }

  i {
    margin-right: 15px;
  }
`;

export default Button;
