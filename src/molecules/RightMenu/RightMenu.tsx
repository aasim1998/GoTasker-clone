import React from 'react';
import {Box} from 'atoms/Box';
import {Touch} from 'atoms/Touch';
import {Image} from 'atoms/Image';
import {TextView} from 'atoms/TextView';
import {LocaleString} from 'locales/en';
import {PressEvent} from 'typings/utils';
import {isIOS} from 'utils/device';

type RightMenuProps = {
  title?: LocaleString;
  imageURL: string;
  onPress?: PressEvent;
};

export const RightMenu = ({title, imageURL, onPress}: RightMenuProps) => {
  return (
    <Box>
      <Touch mb="s" flexDirection="row" alignItems="center" onPress={onPress}>
        <Image source={imageURL} height={26} width={26} />
        <TextView
          pl="sl"
          color="greytext"
          text={title}
          fontWeight='700'
          fontSize={isIOS ? 17 : 16}
        />
      </Touch>
    </Box>
  );
};
