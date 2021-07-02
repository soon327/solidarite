import React from 'react';

interface SearchBoxProps {
  setSearch: (search: string) => void;
}
export default function SearchBox({ setSearch }: SearchBoxProps): JSX.Element {
  return <article>검색창</article>;
}
