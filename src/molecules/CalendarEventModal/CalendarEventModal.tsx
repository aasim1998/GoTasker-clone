import React, {useState} from 'react';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {Icon} from 'atoms/Icon';
import {FormTextInput} from 'molecules/FormTextInput';
import {Formik} from 'formik';
import {Touch} from 'atoms/Touch';
import {CheckBox} from 'atoms/CheckBox';
import {Row} from 'atoms/Row';
import {SelectBox} from 'atoms/SelectBox';
import {isAndroid} from 'utils/device';
import moment from 'moment';
import {FormTimeInput} from 'screens/Main/calendar/organism/FormTimeInput/FormTimeInput';
import useAuth from 'context/Authentication';
import {goBack} from 'services/NavigationService';
import {DatePickerForm} from 'screens/Main/calendar/organism/DatePickerForm.tsx';
import GlobalVariables from 'utils/constant';

export const CalendarEventModal = ({route}) => {
  const {cardData} = route.params;
  const [isChecked, setIsChecked] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectAppointmentTime, setSelectAppointmentTime] = useState(null);
  const [eventType, setEventType] = useState(cardData?.visit_type);

  const {
    state: {userData},
    actions: {updateCalendarEvent},
  } = useAuth();
  const selectedTime = val => {
    if (val) {
      setSelectAppointmentTime(val);
    }
  };
  const handlePress = val => {
    var newTime = new Date(
      `${new Date(val.updatedDate).toLocaleDateString()}
      ${val.updatedTime}`,
    ).toISOString();

    const result = cardData?.event_participants.map(a => a.user_id);
    const events = {
      description: val.serviceName,
      participant_ids: result,
      time: newTime,
      visit_type: eventType,
    };
    updateCalendarEvent(events, cardData.id);
    goBack();
  };
  const initialValues = {
    serviceName: cardData?.description,
    updatedDate: moment(cardData?.time).utc().format('MM/DD/YYYY') || '',
    updatedTime: moment(cardData?.time).utc().format('HH:MM A') || '',
    visitType: cardData?.visit_type,
    participant_ids: cardData?.event_participants[0]?.user_id,
  };
  return (
    <Box
      top={isAndroid ? 90 : 160}
      alignSelf="center"
      bg="whiteText"
      shadowOpacity={0.8}
      borderRadius={12}
      p="m"
      height={isAndroid ? '78%' : '64%'}
      width="85%">
      <Box mb="s" flexDirection="row" justifyContent="space-between">
        <Text
          variant="bodyLight"
          fontWeight="700"
          color="primary"
          fontSize={17}>
          {cardData?.name}
        </Text>
        <Icon name="clear" onPress={() => goBack()} size={19} />
      </Box>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handlePress}>
        {({handleSubmit}) => {
          return (
            <>
              <Text
                localeId="events.type"
                variant="headline"
                color="primary"
                fontWeight="500"
                mb="xs"
                fontSize={17}
              />
              {cardData?.visit_type !== GlobalVariables.MyCalendar ? (
                <Row justifyContent="flex-start" mb="s">
                  {[GlobalVariables.Work, GlobalVariables.Visit].map(item => {
                    return (
                      <Touch marginHorizontal="xs">
                        <SelectBox
                          onPress={() => setEventType(item)}
                          size={10}
                          textColor="black"
                          height={30}
                          width={80}
                          fontStyle="medium"
                          text={item}
                          iconName="radio-unchecked"
                          selected={eventType === item ? true : false}
                        />
                      </Touch>
                    );
                  })}
                </Row>
              ) : (
                <Row justifyContent="flex-start" mb="s">
                  {[GlobalVariables.MyCalendar].map(item => {
                    return (
                      <Touch>
                        <SelectBox
                          size={10}
                          textColor="black"
                          height={30}
                          width={110}
                          fontStyle="medium"
                          text={item}
                          iconName="radio-unchecked"
                          selected={true}
                        />
                      </Touch>
                    );
                  })}
                </Row>
              )}
              <Text
                localeId="feed.Summary"
                variant="headline"
                color="primary"
                fontWeight="500"
                mb="s"
              />
              <FormTextInput
                name="serviceName"
                textAlignVertical="top"
                multiline
                height={58}
                borderRadius={6}
                maxLength={50}
                color="black"
                fontWeight="900"
              />
              <Row mt="-s">
                <Text
                  mt="s"
                  variant="headline"
                  localeId="date.text"
                  color="primary"
                  fontWeight="500"
                />
                <Box width="82%" px="sl">
                  <DatePickerForm
                    rightIconSize={20}
                    rightIconColor="#4d9ac5"
                    name="updatedDate"
                    color="black"
                    fontSize={15}
                    height={43}
                    minimumDate="today"
                  />
                </Box>
              </Row>
              <Row mt="-xm">
                <Text
                  mt="s"
                  variant="headline"
                  localeId="time.text"
                  color="primary"
                  fontWeight="500"
                />

                <Box width="80%" px="s">
                  <FormTimeInput
                    name="updatedTime"
                    getTime={selectedTime}
                    color="black"
                    fontSize={16}
                    height={43}
                  />
                </Box>
              </Row>
              <Text
                mt="-l"
                mb="s"
                localeId="invite.text"
                color="primary"
                variant="headline"
                fontWeight="500"
              />
              {cardData?.event_participants?.map(item => {
                let selectedId = selectedEvent;
                return (
                  <Box flexDirection="row" alignItems="center">
                    <CheckBox
                      checked={
                        item.status === 'accepted' ||
                        selectedId === item.user_id
                          ? true
                          : isChecked
                      }
                      onPress={() => setIsChecked(!isChecked)}
                    />
                    <Text
                      fontWeight="700"
                      ml="s"
                      variant="bodyLight"
                      color="primary">
                      {item.name}
                    </Text>
                  </Box>
                );
              })}
              {(userData[0].current_user.role_list.role !== 'subcontractor' ||
                (userData[0].current_user.role_list.role === 'client' &&
                  cardData?.status !== 'pending')) && (
                <Touch
                  position="absolute"
                  bottom={10}
                  ml="m"
                  mt="l"
                  width="100%">
                  <Button
                    backgroundColor={
                      moment(cardData?.time).utc().format('YYYY-MM-DD') >=
                      moment(new Date()).utc().format('YYYY-MM-DD')
                        ? 'lightingYellow'
                        : 'greyText'
                    }
                    textAlign="center"
                    title="btn.update.event"
                    onPress={handleSubmit as PressEvent}
                  />
                </Touch>
              )}
            </>
          );
        }}
      </Formik>
    </Box>
  );
};
