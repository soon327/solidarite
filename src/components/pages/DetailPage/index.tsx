import React, { useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import DetailContent from './Sections/DetailContent';
import { LocationStateType } from '../MainPage';

export default function DetailPage(props: RouteComponentProps<{}, {}, LocationStateType | null>) {
  const history = useHistory();

  const handleBackButton = () => {
    history.push('/', props.location.state);
  };
  return (
    <MAIN>
      <DetailContent locationState={props.location.state} />
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
