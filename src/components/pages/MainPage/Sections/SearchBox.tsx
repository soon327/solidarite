import React, { useState, useEffect, useRef } from 'react';
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
let debounce: ReturnType<typeof setTimeout> | null = null;

export default function SearchBox({ setSearch, setData, setPage, locationState }: SearchBoxProps): JSX.Element {
  const history = useHistory();

  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (locationState) {
      if (inputRef.current) {
        inputRef.current.value = locationState.search;
      }
    }
  }, [locationState]);

  // debounce 150ms
  const changeInput = () => {
    if (debounce) {
      clearTimeout(debounce);
    }

    debounce = setTimeout(() => {
      if (locationState) {
        history.replace('', null);
      }
      setPage(0);
      setData([]);
      if (inputRef.current) {
        setSearch(inputRef.current.value);
      }
    }, 150);
  };

  const handleIcon = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocusInput = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('event:::', event.type);
    if (event.type === 'focus') {
      setFocus(true);
    } else if (event.type === 'blur') {
      setFocus(false);
    }
  };

  return (
    <SEARCH_BOX focus={focus}>
      <SEARCH_ICON icon={faSearch} onClick={handleIcon} />
      <SEARCH_INPUT
        type="search"
        placeholder="검색어를 입력하세요"
        onChange={changeInput}
        onFocus={handleFocusInput}
        onBlur={handleFocusInput}
        ref={inputRef}
      />
    </SEARCH_BOX>
  );
}

const SEARCH_BOX = styled.article<{ focus: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.grey_border};
  border-radius: 0.25rem;
  width: 24rem;
  height: 3rem;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
  transition: 0.15s;
  ${({ focus, theme }) => focus && `border-color:${theme.colors.blue}; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24);`}

  :hover {
    border-color: ${({ theme }) => theme.colors.blue};
  }
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
  font-size: 1rem;
`;
