import {Box} from 'atoms/Box';
import {Touch} from 'atoms/Touch';
import {Button} from 'molecules/Button';
import React from 'react';
import {OptionalLocalString} from 'locales/en';
import {CenteredModal} from 'atoms/CenteredModal';
import {Text} from 'atoms/Text';
import {Image} from 'atoms/Image';
import {StyleSheet} from 'react-native';
import image from 'images/success.png';
import {PressEvent} from 'typings/utils';

type SuccessModalProps = {
  isModalVisible?: boolean;
  localeID: OptionalLocalString;
  onCloseModal: PressEvent;
  showTitle?: boolean;
};
export const SuccessModal = ({
  isModalVisible,
  onCloseModal,
  localeID,
  showTitle,
}: SuccessModalProps) => {
  return (
    <CenteredModal visible={isModalVisible}>
      <Box
        bg="mainBackground"
        width="80%"
        p="s"
        borderRadius={10}
        maxHeight={300}
        alignItems="center"
        paddingHorizontal="ml">
        <Box
          borderWidth={13}
          borderColor="mainBackground"
          shadowColor="black"
          shadowOpacity={0.8}
          shadowRadius={10.32}
          elevation={12}
          top={-30}
          borderRadius={45}
          position="absolute"
          bg="mainBackground">
          <Image source={image} height={40} width={40} />
        </Box>
        <Box mt="xxl" alignItems="center">
          {showTitle && (
            <Text
              marginBottom="m"
              localeId="success.text"
              variant="headline"
              color="darkGreyText"
              fontSize={23}
              fontWeight="bold"
            />
          )}
          <Text
            textAlign="center"
            localeId={localeID}
            variant="headline"
            color="simplygrey"
          />
        </Box>
        <Box
          width="50%"
          shadowColor="shadowYellow"
          shadowOffset={{width: 5, height: 5}}
          shadowOpacity={0.8}
          shadowRadius={2}>
          <Touch onPress={onCloseModal}>
            <Button
              marginBottom="s"
              marginTop="m"
              alignSelf="center"
              variant="primary"
              textAlign="center"
              onPress={onCloseModal}
              backgroundColor="darkYellowButton"
              title="oky.Text"
              elevation={20}
            />
          </Touch>
        </Box>
      </Box>
    </CenteredModal>
  );
};

export const styles = StyleSheet.create({
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 6, height: 6},
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
});
