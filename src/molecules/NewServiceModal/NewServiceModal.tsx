import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Touch} from 'atoms/Touch';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {Button} from 'molecules/Button';
import {CheckBox} from 'atoms/CheckBox';
import {Formik} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {CenteredModal} from 'atoms/CenteredModal';
import useDashboard from 'context/DashboardAPI';
import DropDownPicker from 'react-native-dropdown-picker';
import {en} from 'locales/en';
import theme from 'styles/theme';
import {navigate} from 'services/NavigationService';
import {Icon} from 'atoms/Icon';
import {Row} from 'atoms/Row';
import Toast from 'react-native-simple-toast';
import useAuth from 'context/Authentication';
import {userRoleType} from 'utils/constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AUTH_KEYS, hydrate} from 'utils/storage';

type NewServiceModalProps = {
  visible?: boolean;
  onCloseModal?: any;
};

export const NewServiceModal = ({
  visible,
  onCloseModal,
}: NewServiceModalProps) => {
  const {
    state: {userData},
  } = useAuth();
  const userInfo = userData[0]?.current_user?.role_list?.role;

  const {
    actions: {getSelectClientList, addNewService, getSelectOrganizationList},
    state: {
      selectClientList,
      addNewServiceLoading,
      addNewServiceData,
      selectOrganizationList,
    },
  } = useDashboard();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isDescription, setIsDescription] = useState('');

  const client_id = selectClientList
    ?.filter(function (x) {
      return x.full_name === value;
    })
    ?.map(x => x.id);

  const organization_id = selectOrganizationList
    ?.filter(function (x) {
      return x.name === value;
    })
    ?.map(x => x.id);

  const [isClientId, setIsClientId] = useState(client_id[0]);
  const [isOrganizationId, setIsOrganizationId] = useState(organization_id[0]);
  const handleAddNewService = async () => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    const values =
      userInfo === userRoleType.CLIENT
        ? {
            project: {
              client_id: userData[0]?.current_user?.id,
              description: isDescription,
              internal: isChecked,
              organization_id: isOrganizationId,
            },
            token: token,
          }
        : {
            project: {
              client_id: isClientId,
              description: isDescription,
              internal: isChecked,
            },
            token: token,
          };
    const response = await addNewService(values);
    response?.data.status == 'success'
      ? navigate('Projects', {
          project_id: response?.data.data[0].id,
          notice_title: response?.data.data[0].description,
        })
      : null;
    setIsDescription('');
    setIsChecked(false);
    onCloseModal();
    setValue('');
  };

  useEffect(() => {
    getSelectClientList();
    getSelectOrganizationList();
  }, []);

  useEffect(() => {
    setIsClientId(client_id[0]);
    setIsOrganizationId(organization_id[0]);
  }, [value]);

  const user_client = userInfo === userRoleType.CLIENT;

  function toastMessage() {
    return value.length === 0
      ? user_client
        ? Toast.show(en['toast.select.organization'])
        : Toast.show(en['toast.select.client'])
      : isDescription.length === 0
      ? Toast.show(en['toast.service.name'])
      : handleAddNewService();
  }

  const orgList = selectOrganizationList?.map(element => ({
    value: element.name,
    label: element.name,
  }));

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      enableOnAndroid>
      <CenteredModal
        visible={visible}
        onBackdropPress={() => {
          onCloseModal();
          setIsDescription('');
          setValue('');
          setOpen(false);
          setIsChecked(false);
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
              localeId="add.new.service"
              variant="headline"
              fontWeight="700"
              color="bluished"
              fontSize={19}
            />
            <Icon
              name="clear"
              onPress={() => {
                onCloseModal();
                setIsDescription('');
                setValue('');
                setOpen(false);
                setIsChecked(false);
              }}
            />
          </Box>
          <Text
            mb="s"
            localeId={user_client ? 'select.organization' : 'select.client'}
            variant="headline"
            fontWeight="700"
            color="greytext"
          />
          <DropDownPicker
            open={open}
            value={value}
            placeholder={
              user_client ? en['select.organization'] : en['select.client']
            }
            items={
              user_client
                ? orgList
                : selectClientList.map(element => {
                    return {
                      label: element.full_name,
                      value: element.full_name,
                    };
                  })
            }
            setOpen={setOpen}
            setValue={setValue}
            showTickIcon={false}
            maxHeight={400}
            style={style.style}
            textStyle={style.textStyle}
            dropDownContainerStyle={style.dropDownContainerStyle}
            arrowIconStyle={style.arrowIconStyle}
          />
          <Formik initialValues={{}} onSubmit={() => {}} enableReinitialize>
            {({}) => {
              return (
                <Box>
                  <Box>
                    <Text
                      mt="m"
                      mb="s"
                      localeId="service.name"
                      variant="headline"
                      fontWeight="700"
                      color="greytext"
                    />
                    <FormTextInput
                      name="serviceName"
                      multiline
                      height={125}
                      borderRadius={6}
                      maxLength={150}
                      onChangeText={newVal => {
                        setIsDescription(newVal);
                      }}
                      color="black"
                      fontSize={18}
                      fontWeight="700"
                      textAlignVertical="top"
                      autoCapitalize="sentences"
                    />
                  </Box>
                  <Box mt="-xm" mb="s" flexDirection="row-reverse">
                    <Row>
                      <Text color="black">
                        {''} {isDescription.length}
                      </Text>
                      <Text localeId="modal.character.limit" color="black" />
                    </Row>
                  </Box>
                  {user_client ? null : (
                    <Box flexDirection="row" alignItems="center">
                      <CheckBox
                        checked={isChecked}
                        onPress={() => setIsChecked(!isChecked)}
                      />
                      <Text
                        ml="s"
                        localeId="checkbox.text"
                        variant="boldTitle"
                        fontWeight="700"
                        color="black"
                      />
                    </Box>
                  )}
                </Box>
              );
            }}
          </Formik>
          <Touch mt="m" onPress={() => toastMessage()}>
            <Button
              alignSelf="center"
              backgroundColor="lightingYellow"
              borderColor="transparent"
              textAlign="center"
              title="btn.add.new.service"
              onPress={() => toastMessage()}
              loading={addNewServiceLoading}
              variant="primary-large"
            />
          </Touch>
        </Box>
      </CenteredModal>
    </KeyboardAwareScrollView>
  );
};

const style = StyleSheet.create({
  style: {
    borderColor: theme.colors.linearGrey,
    borderRadius: 8,
  },
  textStyle: {
    fontSize: 17,
    fontWeight: '700',
  },
  dropDownContainerStyle: {
    borderRadius: 0,
    borderColor: theme.colors.linearGrey,
    shadowColor: theme.colors.zBlack,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderTopWidth: 1,
    elevation: 8,
    shadowOffset: {width: 0, height: 2},
    top: 0,
  },
  arrowIconStyle: {
    width: 18,
    height: 18,
    tintColor: theme.colors.primary,
  },
});
