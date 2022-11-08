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
import success from 'images/success.png';

type InsuranceModalProps = {
  isModalVisible?: boolean;
  onCloseModal: PressEvent;
  localeID: OptionalLocalString;
  isError?: boolean;
};
export const InsuranceModal = ({
  isModalVisible,
  onCloseModal,
  localeID,
  isError,
}: InsuranceModalProps) => {
  return (
    <CenteredModal visible={isModalVisible}>
      <Box
        px='xl'
        bg="white"
        width="80%"
        p="s"
        borderRadius={10}
        maxHeight={240}
        alignItems="center"
        paddingHorizontal="ml">
        <Box
          mt='s'
          borderColor="white"
          bg="white">
          <Image
            backgroundColor="white"
            source={isError? caution : success}
            height={45}
            width={45}
          />
        </Box>
        <Box mt="m" alignItems="center">
          <Text
            localeId={localeID}
            textAlign='center'
            variant="headline"
            fontSize={18}
            fontWeight="bold"
            color="secondaryGrey"
          />
        </Box>
        <Box
          width="85%"
          mb="s"
          mt="m">
          <Touch onPress={onCloseModal}>
            <Button
              alignSelf="center"
              variant="primary"
              textAlign="center"
              onPress={onCloseModal}
              backgroundColor="darkYellowButton"
              title="oky.Text"
              fontSize={17}
              fontWeight="bold"
            />
          </Touch>
        </Box>
      </Box>
    </CenteredModal>
  );
};
