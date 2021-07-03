import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBox from './Sections/SearchBox';
import PostTab from './Sections/PostTab';
import ContentsBox from './Sections/ContentsBox';

export default function Mainpage(): JSX.Element {
  const [tab, setTab] = useState<'a' | 'b'>('a');
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  return (
    <SECTION>
      <HEADER>게시물을 검색해보세요</HEADER>
      <main>
        <SearchBox setSearch={setSearch} />
        <article>
          <PostTab setTab={setTab} />
          <ContentsBox tab={tab} page={page} setPage={setPage} search={search} />
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
