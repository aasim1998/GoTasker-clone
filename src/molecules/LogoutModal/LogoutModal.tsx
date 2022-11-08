import {Box} from 'atoms/Box';
import React from 'react';
import {PressEvent} from 'typings/utils';
import {CenteredModal} from 'atoms/CenteredModal';
import {Image} from 'atoms/Image';
import {Text} from 'atoms/Text';
import {Button} from 'molecules/Button';
import {logotImg} from 'utils/constant';
import useAuth from 'context/Authentication';
import {Row} from 'atoms/Row';
import {Touch} from 'atoms/Touch';
import {isAndroid} from 'utils/device';

type restoreModalProps = {
  isModalVisible?: boolean;
  minimumLength?: boolean;
  onBackdropPress?: PressEvent;
};

export const LogoutModal = ({
  isModalVisible,
  minimumLength,
  onBackdropPress,
}: restoreModalProps) => {
  const {
    actions: {logout},
  } = useAuth();
  return (
    <CenteredModal onBackdropPress={onBackdropPress} visible={isModalVisible}>
      <Box
        height={isAndroid ? '30%' : '20%'}
        width="85%"
        bg="whiteText"
        borderRadius={10}
        alignItems="center"
        pt="xm">
        <Image height={80} width={80} source={logotImg} />
        <Text
          textAlign="center"
          fontSize={20}
          color="textInputBorderColor"
          localeId="logoutmodal.text"
        />
        <Row
          justifyContent="center"
          alignContent="center"
          height="30%"
          width="80%">
          <Touch
            mr="l"
            width="35%"
            height="100%"
            justifyContent="flex-end"
            onPress={onBackdropPress}>
            <Button
              title="no.button.text"
              variant="yellowWhite"
              borderColor="lightingYellow"
              fontSize={40}
              onPress={onBackdropPress}
            />
          </Touch>
          <Touch
            width="35%"
            height="100%"
            justifyContent="flex-end"
            onPress={() => {
              onBackdropPress;
              logout();
            }}>
            <Button
              title="yes.button.text"
              variant="yellowPrimary"
              borderColor="transparent"
              fontSize={40}
              onPress={() => {
                onBackdropPress;
                logout();
              }}
            />
          </Touch>
        </Row>
      </Box>
    </CenteredModal>
  );
};
