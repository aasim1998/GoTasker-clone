import {Box} from 'atoms/Box';
import React from 'react';
import {PressEvent} from 'typings/utils';
import {CenteredModal} from 'atoms/CenteredModal';
import {Image} from 'atoms/Image';
import {Text} from 'atoms/Text';
import {Button} from 'molecules/Button';
import {success} from 'utils/constant';
import {Touch} from 'atoms/Touch';

type restoreModalProps = {
  isModalVisible?: boolean;
  onBackdropPress?: PressEvent;
};

export const OrganizationModal = ({
  isModalVisible,
  onBackdropPress,
}: restoreModalProps) => (
  <CenteredModal onBackdropPress={onBackdropPress} visible={isModalVisible}>
    <Box
      height="19%"
      width="85%"
      bg="whiteText"
      borderRadius={10}
      justifyContent="space-around"
      alignItems="center">
      <Image mt="sl" height={40} width={40} source={success} />
      <Text
        textAlign="center"
        fontSize={20}
        color="textInputBorderColor"
        localeId="organization.edit.success.message"
      />
      <Touch
        height="40%"
        width="80%"
        justifyContent="center"
        onPress={onBackdropPress}>
        <Button
          title="ok.button.text"
          variant="secondary"
          borderRadius={8}
          backgroundColor="lightingYellow"
          borderColor="transparent"
          onPress={onBackdropPress}
        />
      </Touch>
    </Box>
  </CenteredModal>
);
