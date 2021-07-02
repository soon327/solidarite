import React, { useState, useEffect } from 'react';
import server from '../../../../api';
import styled from 'styled-components';

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
  search: string | null;
}
export default function ContentsBox({ tab, page, search }: ContentsBoxProps): JSX.Element {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    getData();
  }, [tab, page, search]);

  const getData = async () => {
    const URL = search === '' ? `/${tab}-posts?page=${page}` : `/${tab}-posts?page=${page}&search=${search}`;
    const result = await server.get(URL);
    setData([...data, ...result.data]);
  };

  return (
    <ul>
      {data.map((post, idx) => {
        return (
          <li key={idx}>
            <h3>
              <span>{post.id}. </span>
              {post.title}
            </h3>
            <CONTENT>{post.content}</CONTENT>
          </li>
        );
      })}
    </ul>
  );
}

const CONTENT = styled.p`
  display: -webkit-box;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
