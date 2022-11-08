import React from 'react';
import {Touch} from 'atoms/Touch';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {CenteredModal} from 'atoms/CenteredModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextButton} from 'atoms/TextButton';
import {Row} from 'atoms/Row';
import {navigate} from 'services/NavigationService';
import GlobalVariables from 'utils/constant';
import useProject from 'context/ProjectAPI';

type MakeActiveModalProps = {
  visible?: boolean;
  onCloseModal?: any;
};

export const MakeActiveModal = ({
  visible,
  onCloseModal,
}: MakeActiveModalProps) => {
  const {
    actions: {modifyProject},
    state: {projectDetails},
  } = useProject();

  const activeHandler = () => {
    modifyProject(String(projectDetails[0]?.id), '', '', 'active');
    onCloseModal();
    navigate(GlobalVariables.PendingAction);
  };

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
          borderRadius={3}
          width="90%"
          bg="whiteText"
          p="m"
          justifyContent="space-between">
          <Box mb="m" flexDirection="row" justifyContent="space-between">
            <Text
              localeId={
                projectDetails[0]?.status === 'active'
                  ? 'make.inactive.modal.text'
                  : 'make.active.modal.text'
              }
              variant="headline"
              fontSize={16}
              color="black"
            />
          </Box>
          <Row mt="sl" flexDirection="row-reverse">
            <Touch>
              <TextButton
                fontWeight="700"
                mr="s"
                localeId="btn.ok"
                color="black"
                onPress={activeHandler}
              />
            </Touch>
            <Touch onPress={onCloseModal}>
              <TextButton
                fontWeight="700"
                mr="l"
                localeId="btn.cancel"
                color="black"
                onPress={onCloseModal}
              />
            </Touch>
          </Row>
        </Box>
      </CenteredModal>
    </KeyboardAwareScrollView>
  );
};
