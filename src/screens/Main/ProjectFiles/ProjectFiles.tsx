import React from 'react';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {StyleSheet} from 'react-native';
import theme from 'styles/theme';

export const ProjectFiles = () => {return (
    <Box bg="whiteText"  height="100%">
      <Box justifyContent="center" alignItems="center">
        <Text localeId="project.files" style={style.main} />
      </Box> 
    </Box>
  );
};

const style = StyleSheet.create({
  main: {
    color: theme.colors.black,
    fontSize: 30,
  },
});