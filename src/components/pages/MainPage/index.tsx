import React, { useState, useEffect } from 'react';
import SearchBox from './Sections/SearchBox';
import PostTab from './Sections/PostTab';
import ContentsBox from './Sections/ContentsBox';

export default function Mainpage(): JSX.Element {
  const [tab, setTab] = useState<'a' | 'b'>('a');
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  return (
    <>
      <header>
        <p>게시물을 검색해보세요</p>
      </header>
      <main>
        <SearchBox setSearch={setSearch} />
        <article>
          <PostTab setTab={setTab} />
          <ContentsBox tab={tab} page={page} search={search} />
        </article>
      </main>
    </>
  );
}
