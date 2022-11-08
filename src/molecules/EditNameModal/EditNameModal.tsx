import React, {useEffect} from 'react';
import {Touch} from 'atoms/Touch';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {Button} from 'molecules/Button';
import {Formik} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {CenteredModal} from 'atoms/CenteredModal';
import {Icon} from 'atoms/Icon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useProject} from 'context/ProjectAPI';
import {en} from 'locales/en';
import Toast from 'react-native-simple-toast';
import useDashboard from 'context/DashboardAPI';

type EditNameModalProps = {
  visible?: boolean;
  onCloseModal?: any;
};

type EditNameFormValues = {
  label: string;
};

export const EditNameModal = ({visible, onCloseModal}: EditNameModalProps) => {
  const {
    actions: {modifyProject, getProjectDetails},
    state: {projectDetails},
  } = useProject();

  const {
    actions: {getPendingAction},
  } = useDashboard();

  const onSubmit = async val => {
    await modifyProject(String(projectDetails[0]?.id), '', val.label);
    await getPendingAction();
    {
      val.label.length === 0
        ? Toast.show(en['toast.edit.name'])
        : onCloseModal();
    }
  };

  useEffect(() => {
    getProjectDetails(String(projectDetails[0]?.id));
  }, []);

  const initialValues = {
    label: String(projectDetails[0]?.name),
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
          borderRadius={10}
          width="90%"
          bg="whiteText"
          p="m"
          justifyContent="space-between">
          <Box mb="m" flexDirection="row" justifyContent="space-between">
            <Text
              localeId="edit.project.name"
              variant="headline"
              fontWeight="700"
              fontSize={19}
              color="black"
            />
            <Icon
              name="clear"
              onPress={() => {
                onCloseModal();
              }}
            />
          </Box>
          <Formik<EditNameFormValues>
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize>
            {({handleSubmit}) => {
              return (
                <Box>
                  <Box>
                    <Text mb="s" localeId="project.name" color="greytext" />
                    <FormTextInput
                      name="label"
                      borderRadius={6}
                      maxLength={150}
                      color="black"
                      fontSize={18}
                      fontWeight="700"
                      textAlignVertical="top"
                      autoCapitalize="sentences"
                      textTransform="capitalize"
                    />
                    <Touch mt="-xxs" onPress={handleSubmit}>
                      <Button
                        alignSelf="center"
                        backgroundColor="lightingYellow"
                        borderColor="transparent"
                        textAlign="center"
                        title="btn.title.update"
                        variant="primary-large"
                      />
                    </Touch>
                  </Box>
                </Box>
              );
            }}
          </Formik>
        </Box>
      </CenteredModal>
    </KeyboardAwareScrollView>
  );
};
