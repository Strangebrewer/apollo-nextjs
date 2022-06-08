import React from 'react';
import { RecoilRoot } from 'recoil';

const StateProvider = ({ children, initializeState }) => (
  <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
);

export { StateProvider };
