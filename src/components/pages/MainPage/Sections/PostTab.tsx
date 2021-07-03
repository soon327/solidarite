import React from 'react';
import { useHistory } from 'react-router';
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
    <section>
      <button onClick={() => changeTab('a')}>A Posts</button>
      <button onClick={() => changeTab('b')}>B Posts</button>
    </section>
  );
}
