import React, { useState, useEffect } from 'react';

export const useInfiniteScroll = (onIntersect: IntersectionObserverCallback, root = null, threshold = 0.1, rootMargin = '0px') => {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      // onIntersect => device의 viewport나 특정 요소(옵션의 root)에 교차되었을때 callback 함수가 실행된다.
      observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold });

      // target 구독 시작
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target, root, rootMargin, threshold, onIntersect]);

  return [setTarget];
};
