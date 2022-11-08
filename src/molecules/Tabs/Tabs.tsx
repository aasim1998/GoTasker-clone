import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Touch} from 'atoms/Touch';
import {Icon} from 'atoms/Icon';
import theme from 'styles/theme';
import {PressEvent} from 'typings/utils';
import {LocaleString} from 'locales/en';
import {Image} from 'atoms/Image';
import {Text} from 'atoms/Text';
import useDashboard from 'context/DashboardAPI';

type TabsProps = {
  title?: LocaleString;
  imageURL: string;
  onPress?: PressEvent;
  pendingActionCounter?: boolean;
};

export const Tabs = ({
  title,
  imageURL,
  onPress,
  pendingActionCounter,
}: TabsProps) => {
  const {
    actions: {getPendingActionCounterList},
    state: {pendingActionCounterList},
  } = useDashboard();

  useEffect(() => {
    getPendingActionCounterList();
  }, []);

  return (
    <Box m="sl" ml="mll" mr="mll">
      <Touch
        flexDirection="row"
        justifyContent="space-between"
        borderRadius={10}
        backgroundColor="whiteText"
        onPress={onPress}
        borderColor="greyish"
        shadowColor="zBlack"
        shadowOpacity={0.2}
        shadowRadius={2}
        borderTopWidth={1}
        elevation={8}
        shadowOffset={{width: 0, height: 2}}>
        <Box pl="xl" pt="sl" pb="sl" flexDirection="row" alignItems="center">
          <Image source={imageURL} height={26} width={26} />
          <TextView
            p="xm"
            pl="l"
            color="zBlack"
            text={title}
            fontWeight="700"
            fontSize={19}
          />
        </Box>
        <Box pr="mll" flexDirection="row" alignItems="center">
          {pendingActionCounter && pendingActionCounterList != 0 ? (
            <Box
              backgroundColor="lightingYellow"
              borderRadius={100}
              width={26}
              height={26}
              justifyContent="center"
              mr="sl">
              <Text
                localeId={pendingActionCounterList}
                color="white"
                textAlign="center"
                fontSize={14}
                fontWeight="700"
              />
            </Box>
          ) : null}
          <Icon
            name="cheveron-right"
            color={theme.colors.black}
            size={20}
            onPress={onPress}
          />
        </Box>
      </Touch>
    </Box>
  );
};
