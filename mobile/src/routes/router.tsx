import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import MainStack from './main-stack';

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default Router;
