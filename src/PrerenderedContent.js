import React from 'react';

export const PrerenderedContent = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);
