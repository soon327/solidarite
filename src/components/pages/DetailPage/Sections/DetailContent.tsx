import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Data, LocationStateType } from '../../MainPage';
import server from '../../../../api';

interface DetailContentProps {
  locationState: LocationStateType | null;
  load: boolean;
  setLoad: (load: boolean) => void;
}

export default function DetailContent({ locationState, load, setLoad }: DetailContentProps) {
  const [detailData, setDetailData] = useState<Data | null>(null);

  useEffect(() => {
    getDetailData();
  }, []);

  const getDetailData = async () => {
    try {
      const result = await server.get(`/${locationState?.tab}-posts/${locationState?.id}`);
      setDetailData(result.data);
      setLoad(true);
    } catch (error) {
      console.log('getDetailData error', error);
    }
  };

  return (
    <>
      {detailData && load && (
        <DETAIL_BOX>
          <header>
            <DETAIL_TITLE>{detailData.title}</DETAIL_TITLE>
          </header>
          <p>{detailData.content}</p>
        </DETAIL_BOX>
      )}
    </>
  );
}

const DETAIL_BOX = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.grey_border};
  padding: 2.5rem;
  margin-bottom: 1rem;
`;

const DETAIL_TITLE = styled.h2`
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: ${({ theme }) => theme.fontSizes.title};
  line-height: 2.5rem;
`;
