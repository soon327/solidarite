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
        <BACK_BUTTON onClick={handleBackButton}>뒤로가기</BACK_BUTTON>
      </footer>
    </MAIN>
  );
}

const MAIN = styled.main`
  height: 70vh;
  margin: 5rem auto;
  padding: 2.5rem 4.5rem;
  width: 1000px;
  max-width: 100%;
`;

const BACK_BUTTON = styled.button`
  all: unset;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.blue};
  :hover {
    background-color: rgb(96, 165, 250);
  }
`;
