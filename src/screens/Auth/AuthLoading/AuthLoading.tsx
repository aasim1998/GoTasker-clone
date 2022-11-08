import React, {useEffect} from 'react';
import {Auth, Main} from 'screens/Navigation';
import useAuth from 'context/Authentication';
import {Spinner} from 'atoms/Spinner';
import {Box} from 'atoms/Box';

export const AuthLoading = () => {
  const {
    actions: {getUserFromStorage},
    state: {authenticating, isLoggedIn, isAppLoading},
  } = useAuth();

  useEffect(() => {
    if (!authenticating && !isLoggedIn) {
      getUserFromStorage();
    }
  }, [getUserFromStorage, authenticating, isLoggedIn]);

  if (isAppLoading) {
    return (
      <Box flex={1} justifyContent="center">
        <Spinner color="primary" size="large" />
      </Box>
    );
  }
  return isLoggedIn ? <Main /> : <Auth />;
};
