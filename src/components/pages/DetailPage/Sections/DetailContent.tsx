import React, { useState, useEffect } from 'react';
import { Data, LocationStateType } from '../../MainPage';
import server from '../../../../api';

interface DetailContentProps {
  locationState: LocationStateType | null;
}

export default function DetailContent({ locationState }: DetailContentProps) {
  const [detailData, setDetailData] = useState<Data | null>(null);

  useEffect(() => {
    getDetailData();
  }, []);

  const getDetailData = async () => {
    try {
      const result = await server.get(`/${locationState?.tab}-posts/${locationState?.id}`);
      setDetailData(result.data);
    } catch (error) {
      console.log('getDetailData error', error);
    }
  };

  return (
    <>
      {detailData && (
        <article>
          <header>
            <h2>{detailData.title}</h2>
          </header>
          <div>{detailData.content}</div>
        </article>
      )}
    </>
  );
}
