import React, {FC} from 'react';
import {ModalProps, Modal, Platform} from 'react-native';
import {Merge} from 'typings/utils';
import {Touch} from 'atoms/Touch';
import {Box} from 'atoms/Box';
import {deviceHeight} from 'utils/device';

type MenuModalProps = Merge<ModalProps, {onBackdropPress?: () => void}>;

export const MenuModal: FC<MenuModalProps> = ({
  children,
  visible,
  onBackdropPress,
  ...props
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onBackdropPress}
      {...props}>
      <Box
        flex={1}
        alignItems="flex-end"
        mt={deviceHeight < 750 ? '-xl' : null}
        mt={Platform.OS === 'android' ? '-xxxl' : null}>
        <Touch
          position="absolute"
          width="100%"
          height="100%"
          flex={1}
          opacity={0}
          onPress={onBackdropPress}
        />
        {children}
      </Box>
    </Modal>
  );
};
