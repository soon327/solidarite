import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Data, LocationStateType } from '../';

interface SearchBoxProps {
  setSearch: (search: string) => void;
  setData: (data: Data[]) => void;
  setPage: (page: number) => void;
  locationState: LocationStateType | null;
}
export default function SearchBox({ setSearch, setData, setPage, locationState }: SearchBoxProps): JSX.Element {
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (locationState) {
      if (inputRef.current) {
        inputRef.current.value = locationState.search;
      }
    }
  }, []);

  const changeInput = () => {
    if (inputRef.current) {
      if (locationState) {
        history.replace('', null);
      }
      setPage(0);
      setData([]);
      setSearch(inputRef.current.value);
    }
  };
  return (
    <SEARCH_BOX>
      <SEARCH_ICON icon={faSearch} />
      <SEARCH_INPUT type="search" placeholder="검색어를 입력하세요" onChange={changeInput} ref={inputRef} />
    </SEARCH_BOX>
  );
}

const SEARCH_BOX = styled.article`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid;
  border-radius: 0.25rem;
  width: 24rem;
  height: 3rem;
  padding: 0.5rem;
  margin-left: auto;
  margin-right: auto;
`;

const SEARCH_ICON = styled(FontAwesomeIcon)`
  flex: 1;
  font-size: 1rem;
  color: grey;
`;

const SEARCH_INPUT = styled.input`
  flex: 20;
  border: unset;
  outline: unset;
`;
