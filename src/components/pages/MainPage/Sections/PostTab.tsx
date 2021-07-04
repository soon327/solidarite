import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Data, LocationStateType } from '../';

interface PostTabProps {
  tab: 'a' | 'b';
  setTab: (tab: 'a' | 'b') => void;
  setData: (data: Data[]) => void;
  setPage: (page: number) => void;
  locationState: LocationStateType | null;
}
export default function PostTab({ tab, setTab, setData, setPage, locationState }: PostTabProps): JSX.Element {
  const history = useHistory();

  const changeTab = (key: 'a' | 'b') => {
    if (tab !== key) {
      if (locationState) {
        history.replace('', null);
      }
      setPage(0);
      setData([]);
      setTab(key);
    }
  };
  return (
    <SECTION>
      <TAB_BUTTON onClick={() => changeTab('a')} isClicked={tab === 'a'}>
        A Posts
      </TAB_BUTTON>
      <TAB_BUTTON onClick={() => changeTab('b')} isClicked={tab === 'b'}>
        B Posts
      </TAB_BUTTON>
    </SECTION>
  );
}

const SECTION = styled.section`
  margin: 2.5rem 0 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey_border};
`;
const TAB_BUTTON = styled.button<{ isClicked: boolean }>`
  all: unset;
  padding: 0.75rem;
  cursor: pointer;
  border-radius: 0.25rem;
  font-weight: 500;
  :hover {
    background-color: ${({ theme }) => theme.colors.grey_hover};
  }
  ${({ isClicked, theme }) => isClicked && `color: ${theme.colors.blue}`}
`;
