import React, { useState, useEffect, useCallback } from 'react';
import server from '../../../../api';
import styled from 'styled-components';
import { useInfiniteScroll } from '../../../../utils/useInfiniteScroll';

interface Data {
  'id': string;
  'title': string;
  'content': string;
  'type': 'a' | 'b';
  'createdAt': string;
}

interface ContentsBoxProps {
  tab: 'a' | 'b';
  page: number;
  setPage: (page: any) => void;
  search: string | null;
}
export default function ContentsBox({ tab, page, setPage, search }: ContentsBoxProps): JSX.Element {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    getData();
  }, [tab, page, search]);

  // 서버에 data요청
  const getData = async () => {
    const URL = search === '' ? `/${tab}-posts?page=${page}` : `/${tab}-posts?page=${page}&search=${search}`;
    const result = await server.get(URL);
    setData([...data, ...result.data]);
  };

  // infinite scroll callback
  const onIntersect: IntersectionObserverCallback = useCallback(
    ([{ isIntersecting, target }], observer) => {
      if (isIntersecting) {
        setPage((page: number) => page + 1);
        observer.unobserve(target);
      }
    },
    [setPage]
  );

  const [setTarget] = useInfiniteScroll(onIntersect);

  return (
    <ul>
      {data.map((post, idx: number) => {
        return (
          <POST_LIST key={idx} ref={idx === data.length - 1 ? setTarget : null}>
            <h3>
              <ID>{post.id}. </ID>
              {post.title}
            </h3>
            <CONTENT>{post.content}</CONTENT>
          </POST_LIST>
        );
      })}
    </ul>
  );
}

const POST_LIST = styled.li`
  margin-bottom: 20px;
`;
const ID = styled.span`
  color: ${({ theme }) => theme.colors.blue};
`;
const CONTENT = styled.p`
  display: -webkit-box;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
