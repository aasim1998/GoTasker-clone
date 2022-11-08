import React from 'react';
import {Box, BoxProps} from 'atoms/Box';
import {Icon} from 'atoms/Icon';
import {Image} from 'atoms/Image';
import {Row} from 'atoms/Row';
import {Text} from 'atoms/Text';
import {Touch} from 'atoms/Touch';
import {LocaleString} from 'locales/en';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {goBack} from 'services/NavigationService';
import theme from 'styles/theme';
import {PressEvent} from 'typings/utils';
import {TouchIcon} from 'atoms/Touch/TouchIcon';
import useAuth from 'context/Authentication';
import {Platform} from 'react-native';
import {userRoleType} from 'utils/constant';

type NavbarProps = {
  overrideBack?: () => void;
  title?: LocaleString;
  showBack?: boolean;
  showBackTitle?: LocaleString;
  showBackSubtitle?: LocaleString;
  backIcon?: boolean;
  containerProps?: BoxProps;
  renderRight?: React.ReactNode;
  renderLeft?: React.ReactNode;
  renderRightSecond?: React.ReactNode;
  onRightClick?: PressEvent;
  onLeftClick?: PressEvent;
  onRightClickSecond?: PressEvent;
};
export const Navbar = ({
  overrideBack,
  title,
  showBack,
  showBackTitle,
  showBackSubtitle,
  containerProps,
  renderRight,
  renderLeft,
  renderRightSecond,
  onRightClick,
  onLeftClick,
  onRightClickSecond,
}: NavbarProps) => {
  const {
    state: {userData},
  } = useAuth();

  const user_Name =
    userData !== undefined ? userData[0]?.current_user?.first_name : '';
  const userInfo =
    userData !== undefined ? userData[0]?.current_user?.role_list?.role : '';

  const {top} = useSafeAreaInsets();
  const handleBack = () => {
    if (typeof overrideBack === 'function') {
      overrideBack();
    } else {
      goBack();
    }
  };

  return (
    <Box
      bg="primary"
      alignItems="center"
      justifyContent="center"
      style={{paddingTop: top}}
      {...containerProps}
      height={Platform.OS === 'ios' ? 110 : 68}>
      <Row width="100%" justifyContent="center" alignItems="center">
        {showBack ? (
          <>
            <Touch position="absolute" left={18} onPress={handleBack}>
              <Icon
                name="chevron-left"
                size={22}
                color={theme.colors.whiteText}
                onPress={handleBack}
              />
            </Touch>
            {showBackTitle && showBackSubtitle && (
              <Box flex={1} ml="xxxl" mt="-s">
                {showBackTitle && (
                  <Text
                    variant="bodyLight"
                    color="whiteText"
                    localeId={showBackTitle}
                    fontSize={12}
                  />
                )}
                {showBackSubtitle && (
                  <Text
                    variant="bold"
                    color="whiteText"
                    localeId={showBackSubtitle}
                    fontSize={15}
                    textTransform="capitalize"
                  />
                )}
              </Box>
            )}
          </>
        ) : null}
        {title ? (
          <Text variant="bold" color="whiteText" localeId={title} />
        ) : null}
        {renderRight ? (
          <Box right={18} zIndex={999} position="absolute">
            <TouchIcon onPress={onRightClick}>
              {typeof renderRight == typeof title ? (
                <Icon
                  name={renderRight}
                  size={30}
                  color={theme.colors.whiteText}
                />
              ) : (
                <Image source={renderRight} height={26} width={26} />
              )}
            </TouchIcon>
          </Box>
        ) : null}
        {renderRightSecond ? (
          <Box
            right={
              userInfo !== userRoleType.CLIENT &&
              userInfo !== userRoleType.SUBCONTRACTOR
                ? 55
                : 18
            }
            top={-5}
            zIndex={999}
            position="absolute">
            <TouchIcon onPress={onRightClickSecond}>
              {typeof renderRightSecond == typeof title ? (
                <Icon
                  name={renderRightSecond}
                  size={36}
                  color={theme.colors.whiteText}
                />
              ) : (
                <Image source={renderRightSecond} height={26} width={26} />
              )}
            </TouchIcon>
          </Box>
        ) : null}
        {renderLeft ? (
          <Box left={18} zIndex={999} position="absolute" width={110}>
            <Touch flexDirection="row" onPress={onLeftClick}>
              <Icon
                name={renderLeft}
                size={30}
                color={theme.colors.whiteText}
                onPress={onLeftClick}
              />
              <Box width="75%">
                <Text
                  ml="xs"
                  color="whiteText"
                  fontSize={11}
                  localeId="welcome.txt"
                />
                <Text
                  ml="xs"
                  mt="xxs"
                  fontSize={12}
                  fontWeight="700"
                  color="whiteText"
                  localeId={user_Name}
                  numberOfLines={1}
                />
              </Box>
            </Touch>
          </Box>
        ) : (
          <Box />
        )}
      </Row>
    </Box>
  );
};
