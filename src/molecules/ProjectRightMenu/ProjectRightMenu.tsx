import React from 'react';
import {Box} from 'atoms/Box';
import {Touch} from 'atoms/Touch';
import {TextView} from 'atoms/TextView';
import {LocaleString} from 'locales/en';
import {PressEvent} from 'typings/utils';

type ProjectRightMenuProps = {
  title?: LocaleString;
  onPress?: PressEvent;
};

export const ProjectRightMenu = ({title, onPress}: ProjectRightMenuProps) => {
  return (
    <Box>
      <Touch mb="s" flexDirection="row" onPress={onPress}>
        <TextView
          variant="body"
          color="black"
          text={title}
          fontWeight="700"
          fontSize={15}
        />
      </Touch>
    </Box>
  );
};
