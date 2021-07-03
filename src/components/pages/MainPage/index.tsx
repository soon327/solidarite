import React, { useState } from 'react';
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

export default function Mainpage(): JSX.Element {
  const [tab, setTab] = useState<'a' | 'b'>('a');
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Data[]>([]);

  return (
    <SECTION>
      <HEADER>게시물을 검색해보세요</HEADER>
      <main>
        <SearchBox setSearch={setSearch} setData={setData} />
        <article>
          <PostTab tab={tab} setTab={setTab} setData={setData} setPage={setPage} />
          <ContentsBox tab={tab} page={page} setPage={setPage} search={search} data={data} setData={setData} />
        </article>
      </main>
    </SECTION>
  );
}

const SECTION = styled.section`
  margin: 0px 10vw;
  padding: 35px;
`;

const HEADER = styled.header`
  text-align: center;
`;
