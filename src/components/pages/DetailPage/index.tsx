import React, { useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import DetailContent from './Sections/DetailContent';
import { LocationStateType } from '../MainPage';

export default function DetailPage(props: RouteComponentProps<{}, {}, LocationStateType | null>) {
  const history = useHistory();
  const [load, setLoad] = useState<boolean>(false);

  const handleBackButton = () => {
    history.push('/', props.location.state);
  };
  return (
    <MAIN>
      <DetailContent locationState={props.location.state} load={load} setLoad={setLoad} />
      {load && (
        <footer>
          <BACK_BUTTON onClick={handleBackButton}>뒤로가기</BACK_BUTTON>
        </footer>
      )}
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
  padding: 1rem 1.5rem;
  border-radius: 0.375rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.blue};
  transition: 0.15s;
  :hover {
    background-color: rgb(96, 165, 250);
  }
`;
