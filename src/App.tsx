import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import classList, { IClass } from './classes';
import NavBar from './NavBar';
import ClassCard from './components/ClassCard';

const App = () => {
  const [classes, setClasses] = useState<IClass[]>([]);

  useEffect(() => {
    setClasses(classList);
  }, []);

  return (
    <Wrapper>
      <NavBar />
      <h1>Welcome to RookieCookie!</h1>
      {classes.map(klass => (
        <ClassCard {...klass} />
      ))}
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  margin-top: 45px;
  text-align: center;
`;
