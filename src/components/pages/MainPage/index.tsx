import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import SearchBox from './Sections/SearchBox';
import PostTab from './Sections/PostTab';
import ContentsBox from './Sections/ContentsBox';

export interface Data {
  'id': string;
  'title': string;
  'content': string;
  'type': 'a' | 'b';
  'createdAt': string;
}

export interface LocationStateType {
  tab: 'a' | 'b';
  page: number;
  search: string;
  data: Data[];
  scroll: number;
  id: string;
}
export default function Mainpage({ location }: RouteComponentProps<{}, {}, LocationStateType | null>): JSX.Element {
  const [tab, setTab] = useState<'a' | 'b'>('a');
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    if (location.state) {
      setTab(location.state.tab);
      setPage(location.state.page);
      setSearch(location.state.search);
      setData(location.state.data);
    }
  }, []);

  return (
    <SECTION>
      <HEADER>게시물을 검색해보세요</HEADER>
      <main>
        <SearchBox setSearch={setSearch} setData={setData} setPage={setPage} locationState={location.state} />
        <article>
          <PostTab tab={tab} setTab={setTab} setData={setData} setPage={setPage} locationState={location.state} />
          <ContentsBox
            tab={tab}
            page={page}
            setPage={setPage}
            search={search}
            data={data}
            setData={setData}
            locationState={location.state}
          />
        </article>
      </main>
    </SECTION>
  );
}

const SECTION = styled.section`
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
  max-width: 100%;
  padding: 2.5rem;
`;

const HEADER = styled.header`
  font-size: ${({ theme }) => theme.fontSizes.title};
  text-align: center;
  margin: 2.5rem 0;
`;
