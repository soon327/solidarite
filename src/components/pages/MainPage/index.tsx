import React, { useState, useEffect } from 'react';
import SearchBox from './Sections/SearchBox';
import PostTab from './Sections/PostTab';
import ContentsBox from './Sections/ContentsBox';

interface data {
  'id': string;
  'title': string;
  'content': string;
  'type': 'a' | 'b';
  'createdAt': string;
}

export default function Mainpage(): JSX.Element {
  const [tab, setTab] = useState<'a' | 'b'>('a');
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string | null>(null);
  const [data, setData] = useState<data[] | null>(null);

  return (
    <>
      <header>
        <p>게시물을 검색해보세요</p>
      </header>
      <main>
        <SearchBox />
        <article>
          <PostTab />
          <ContentsBox />
        </article>
      </main>
    </>
  );
}
