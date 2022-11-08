import {Box} from 'atoms/Box';
import {Touch} from 'atoms/Touch';
import {Button} from 'molecules/Button';
import React from 'react';
import {PressEvent} from 'typings/utils';
import {OptionalLocalString} from 'locales/en';
import {CenteredModal} from 'atoms/CenteredModal';
import {Text} from 'atoms/Text';
import {Image} from 'atoms/Image';
import caution from 'images/caution.png';

type ErrorModalProps = {
  isModalVisible?: boolean;
  onCloseModal: PressEvent;
  localeID: OptionalLocalString;
};
export const ErrorModal = ({
  isModalVisible,
  onCloseModal,
  localeID,
}: ErrorModalProps) => {
  return (
    <CenteredModal visible={isModalVisible}>
      <Box
        bg="white"
        width="80%"
        p="s"
        borderRadius={10}
        maxHeight={240}
        alignItems="center"
        paddingHorizontal="ml">
        <Box
          borderWidth={10}
          borderColor="white"
          shadowColor="black"
          shadowOpacity={0.8}
          shadowRadius={10.32}
          elevation={12}
          top={-30}
          borderRadius={45}
          position="absolute"
          bg="white">
          <Image
            backgroundColor="white"
            source={caution}
            height={40}
            width={40}
          />
        </Box>
        <Box mt="xxl" alignItems="center">
          <Text
            localeId={localeID}
            textAlign='center'
            variant="headline"
            fontSize={18}
            fontWeight="bold"
            color="darkGreyText"
          />
        </Box>
        <Box
          width="50%"
          shadowColor="shadowYellow"
          shadowOffset={{width: 5, height: 5}}
          shadowOpacity={0.8}
          shadowRadius={2}
          mb="s"
          mt="m">
          <Touch onPress={onCloseModal}>
            <Button
              elevation={20}
              alignSelf="center"
              variant="primary"
              textAlign="center"
              onPress={onCloseModal}
              backgroundColor="darkYellowButton"
              title="oky.Text"
            />
          </Touch>
        </Box>
      </Box>
    </CenteredModal>
  );
};
