import React from 'react';
import {Touch} from 'atoms/Touch';
import {Box} from 'atoms/Box';
import {Button} from 'molecules/Button';
import {CenteredModal} from 'atoms/CenteredModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Image} from 'atoms/Image';
import {Text} from 'atoms/Text';
import image from 'images/success.png';

type ClientParticipationModalProps = {
  visible?: boolean;
  onCloseModal?: any;
  projectInternal?: boolean;
};

export const ClientParticipationModal = ({
  visible,
  onCloseModal,
  projectInternal,
}: ClientParticipationModalProps) => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      enableOnAndroid>
      <CenteredModal
        visible={visible}
        onBackdropPress={() => {
          onCloseModal();
        }}>
        <Box
          borderColor="greyish"
          shadowColor="zBlack"
          shadowOpacity={0.2}
          shadowRadius={2}
          borderTopWidth={1}
          elevation={8}
          shadowOffset={{width: 0, height: 2}}
          borderRadius={10}
          width="80%"
          bg="whiteText"
          p="m"
          justifyContent="space-between">
          <Box mb="m" alignItems="center">
            <Image source={image} height={42} width={42} />
            <Text
              textAlign="center"
              mt="sl"
              localeId={
                projectInternal
                  ? 'client.participation.text.on'
                  : 'client.participation.text.off'
              }
              variant="headline"
              color="darkGreyText"
              fontSize={17}
            />
          </Box>
          <Touch onPress={onCloseModal}>
            <Button
              alignSelf="center"
              backgroundColor="lightingYellow"
              borderColor="transparent"
              textAlign="center"
              title="btn.ok"
              variant="primary-large"
              onPress={onCloseModal}
            />
          </Touch>
        </Box>
      </CenteredModal>
    </KeyboardAwareScrollView>
  );
};
