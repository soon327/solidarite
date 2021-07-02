import React from 'react';

interface PostTabProps {
  setTab: (tab: 'a' | 'b') => void;
}
export default function PostTab({ setTab }: PostTabProps): JSX.Element {
  return <section>A Posts B Posts</section>;
}
