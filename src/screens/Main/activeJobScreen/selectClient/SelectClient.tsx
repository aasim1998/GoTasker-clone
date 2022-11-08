import React from 'react';
import {Box} from 'atoms/Box';

import {Navbar} from 'molecules/Navbar';

export const SelectClient = () => {
  return (
    <Box bg="whiteText" flex={1}>
      <Navbar title="title.select.client" showBack />
    </Box>
  );
};
