import React from 'react';
import { Data } from '../';

interface PostTabProps {
  tab: 'a' | 'b';
  setTab: (tab: 'a' | 'b') => void;
  setData: (data: Data[]) => void;
  setPage: (page: number) => void;
}
export default function PostTab({ tab, setTab, setData, setPage }: PostTabProps): JSX.Element {
  const changeTab = (key: 'a' | 'b') => {
    if (tab !== key) {
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
