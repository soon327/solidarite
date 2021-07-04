import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import server from '../../../../api';
import { useInfiniteScroll } from '../../../../utils/useInfiniteScroll';
import { Data, LocationStateType } from '../';

interface ContentsBoxProps {
  tab: 'a' | 'b';
  page: number;
  setPage: (page: any) => void;
  search: string | null;
  data: Data[];
  setData: (data: Data[]) => void;
  locationState: LocationStateType | null;
}

export default function ContentsBox({ tab, page, setPage, search, data, setData, locationState }: ContentsBoxProps): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    if (locationState) {
      window.scrollTo(0, locationState.scroll);
      return;
    }
    // location.state가 초기화 됐을때만 서버에 data 요청
    getData();
  }, [tab, page, search]);

  // 서버에 data요청
  const getData = async () => {
    const URL = search === '' ? `/${tab}-posts?page=${page}` : `/${tab}-posts?page=${page}&search=${search}`;
    console.log('URL::::::', URL);
    try {
      const result = await server.get(URL);
      setData([...data, ...result.data]);
    } catch (error) {
      console.log('getData error', error);
    }
  };

  // infinite scroll callback
  const onIntersect: IntersectionObserverCallback = useCallback(
    ([{ isIntersecting, target }], observer) => {
      if (isIntersecting) {
        // location.state값이 있으면 값을 초기화해서 getData가 실행되도록 한다.
        if (locationState) {
          history.replace('', null);
        }
        setPage((page: number) => page + 1);
        observer.unobserve(target);
      }
    },
    [setPage]
  );

  const [setTarget] = useInfiniteScroll(onIntersect);

  const handleDetail = (post: Data) => {
    history.push(`/${post.type}?id=${post.id}`, {
      tab,
      page,
      search,
      data,
      scroll: window.scrollY,
      id: post.id,
    });
  };

  return (
    <UL>
      {data.map((post, idx: number) => {
        return (
          <POST_LIST key={idx} ref={idx === data.length - 1 ? setTarget : null} onClick={() => handleDetail(post)}>
            <POST_TITLE>
              <ID>{post.id}. </ID>
              {post.title}
            </POST_TITLE>
            <CONTENT>{post.content}</CONTENT>
          </POST_LIST>
        );
      })}
    </UL>
  );
}

const UL = styled.ul`
  border: 1px solid ${({ theme }) => theme.colors.grey_border};
  border-radius: 0.375rem;
  padding: 1.25rem;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

const POST_LIST = styled.li`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey_hover};
  }
  padding: 1.25rem;
`;

const POST_TITLE = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.75rem;
`;

const ID = styled.span`
  color: ${({ theme }) => theme.colors.blue};
`;

const CONTENT = styled.p`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
