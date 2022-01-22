import dynamic from 'next/dynamic';
import React from 'react';

const NoSSR: React.FC = ({ children }) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSSR), { ssr: false });
