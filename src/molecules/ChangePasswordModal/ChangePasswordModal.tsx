import {Box} from 'atoms/Box';
import React from 'react';
import {PressEvent} from 'typings/utils';
import {CenteredModal} from 'atoms/CenteredModal';
import {Image} from 'atoms/Image';
import {Text} from 'atoms/Text';
import {Button} from 'molecules/Button';
import {caution} from 'utils/constant';
import {Touch} from 'atoms/Touch';

type restoreModalProps = {
  isModalVisible?: boolean;
  minimumLength?: boolean;
  onBackdropPress?: PressEvent;
  newPasswordBlank?: boolean;
};

export const ChangePasswordModal = ({
  isModalVisible,
  minimumLength,
  onBackdropPress,
  newPasswordBlank,
}: restoreModalProps) => (
  <CenteredModal onBackdropPress={onBackdropPress} visible={isModalVisible}>
    <Box
      height="25%"
      width="80%"
      bg="whiteText"
      borderRadius={10}
      justifyContent="space-evenly"
      alignItems="center">
      <Image height={40} width={40} source={caution} />
      <Text
        textAlign="center"
        fontSize={20}
        color="textInputBorderColor"
        localeId={
          minimumLength
            ? 'must.password.length'
            : newPasswordBlank
            ? 'please.enter.new.password'
            : 'enter.old.password'
        }
      />
      <Touch
        height="20%"
        width="75%"
        justifyContent="center"
        onPress={onBackdropPress}>
        <Button
          title="ok.button.text"
          backgroundColor="lightingYellow"
          borderColor="transparent"
          fontSize={40}
          onPress={onBackdropPress}
        />
      </Touch>
    </Box>
  </CenteredModal>
);
