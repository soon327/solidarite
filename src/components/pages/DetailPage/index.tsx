import React, { useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ContentBox from './Sections/ContentBox';

export default function DetailPage(props: RouteComponentProps) {
  const history = useHistory();

  useEffect(() => console.log('props::::', props));

  const handleBackButton = () => {
    history.push('/', props.location.state);
  };
  return (
    <MAIN>
      <ContentBox />
      <footer>
        <button onClick={handleBackButton}>뒤로가기</button>
      </footer>
    </MAIN>
  );
}

const MAIN = styled.main`
  border: 1px solid;
  height: 70vh;
  margin: 8vw;
  padding: 35px;
`;
