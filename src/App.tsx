import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import classList, { IClass } from './classes';
import NavBar from './NavBar';
import ClassCard from './components/ClassCard';
import GlobalStyles from './GlobalStyles';
import { ClassModal } from './components/Modal';
import ManageBar from './components/ManageBar/ManageBar';
import ClassForm from './components/ClassForm/ClassForm';
import { MEDIA_QUERY_SMALL, MEDIA_QUERY_MOBILE } from './mediaQueries';
import EmptyState from './components/EmptyState';

const App = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(-1);

  const selectedClass = useMemo(() => {
    if (previewIndex >= 0) {
      return classes[previewIndex];
    }
    return null;
  }, [previewIndex, classes]);

  useEffect(() => {
    setClasses(classList);
  }, []);

  const addClass = useCallback(
    (data: IClass) => {
      setClasses([
        {
          ...data,
          id: classes.length + 1, // Increment ids
        },
        ...classes,
      ]);
    },
    [classes]
  );

  const removeClass = useCallback(
    (index: number) => {
      setPreviewIndex(-1);
      setClasses([...classes.slice(0, index), ...classes.slice(index + 1)]);
    },
    [classes]
  );

  return (
    <Wrapper>
      <GlobalStyles />
      {selectedClass && (
        <ClassModal
          data={selectedClass}
          onDismiss={() => setPreviewIndex(-1)}
          onDelete={() => removeClass(previewIndex)}
        />
      )}
      <Row>
        <Main>
          <NavBar />
          <ManageBar
            onOpenCreate={() => setShowCreate(true)}
            total={classes.length}
          />
          {classes.length === 0 && (
            <EmptyState onCreate={() => setShowCreate(true)} />
          )}
          <Grid>
            {classes.map((klass, index) => (
              <GridItem key={klass.id}>
                <ClassCard
                  onSelect={() => setPreviewIndex(index)}
                  data={klass}
                />
              </GridItem>
            ))}
          </Grid>
        </Main>
        {showCreate && (
          <ClassForm
            onCreate={addClass}
            onDismiss={() => setShowCreate(false)}
          />
        )}
      </Row>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #f5f5f5f5;
`;

const Grid = styled.div`
  display: grid;
  min-width: 275px;
  max-width: 2100px;
  width: 100%;
  margin: 0 auto;
  flex-flow: row wrap;
  align-content: space-around;
  justify-content: space-between;
  padding: 15px 25px;
  grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  grid-row-gap: 25px;
`;

const GridItem = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 250px;

  @media ${MEDIA_QUERY_SMALL} {
    width: 90%;
  }

  @media ${MEDIA_QUERY_MOBILE} {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const Main = styled.div`
  flex: 1;
  height: 100%;
  padding-top: 45px;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: width 0.25s linear;
  display: flex;
  flex-flow: column;
`;
