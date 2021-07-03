import React, { useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    getData();
  }, [tab, page, search]);

  // 서버에 data요청
  const getData = async () => {
    const URL = search === '' ? `/${tab}-posts?page=${page}` : `/${tab}-posts?page=${page}&search=${search}`;
    console.log('URL::::::', URL);
    const result = await server.get(URL);
    setData([...data, ...result.data]);
  };

  // infinite scroll callback
  const onIntersect: IntersectionObserverCallback = useCallback(
    ([{ isIntersecting, target }], observer) => {
      console.log('infinite----');
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
    });
  };

  return (
    <ul>
      {data.map((post, idx: number) => {
        return (
          <POST_LIST key={idx} ref={idx === data.length - 1 ? setTarget : null} onClick={() => handleDetail(post)}>
            {/* <Link to={`/${post.type}?id=${post.id}`}> */}
            <h3>
              <ID>{post.id}. </ID>
              {post.title}
            </h3>
            <CONTENT>{post.content}</CONTENT>
            {/* </Link> */}
          </POST_LIST>
        );
      })}
    </ul>
  );
}

const POST_LIST = styled.li`
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey_hover};
  }
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
