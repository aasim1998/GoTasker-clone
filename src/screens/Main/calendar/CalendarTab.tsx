import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Calendar} from 'react-native-calendars';
import useAuth from 'context/Authentication';
import moment from 'moment';
import {Text} from 'atoms/Text';
import {LabeledCard} from 'molecules/LabeledCard';
import {Navbar} from 'molecules/Navbar';
import theme from 'styles/theme';
import {navigate} from 'services/NavigationService';
import {useIsFocused} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {Spinner} from 'atoms/Spinner';
let objmarked = {};

export const CalendarTab = () => {
  const [event, setEvent] = useState([]);
  const [marked, setMarked] = useState({});
  const [loading, setLoading] = useState(true);
  const [selData, setSelData] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState(null);
  const {
    state: {CalendarEvent},
    actions: {getCalendarEvents},
  } = useAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      calendarDateShow();
      getCalendarEvents();
    }
  }, [isFocused]);
  const calendarDateShow = () => {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const val = {month: month, year: year};
    getCalendarEvents(val).then(res => {
      const response = res?.data?.data?.map(value => {
        const label = moment(value.time).utc().format('YYYY-MM-DD');
        objmarked[label] = {
          marked: true,
          dotColor: theme.colors.error,
        };
        setMarked({...objmarked});
        setLoading(false);
      });
    });
  };
  const handleSelectedDate = selectedDate => {
    const objectmarked = {};
    const marked = selectedDate.dateString;
    objectmarked[marked] = {
      selected: true,
      selectedColor: theme.colors.primary,
    };
    let finaldata = {...objmarked, ...objectmarked};
    setMarked(finaldata);
    if (CalendarEvent.length >= 1) {
      const check = CalendarEvent.filter(
        item =>
          moment(item.time).utc().format('YYYY-MM-DD') ===
          selectedDate.dateString,
      );
      setSelData(check);
      check.length > 0 ? setSelectedId(check[0].time) : setSelectedId(null);
    }
  };
  return (
    <Box bg="whiteText" flex={1}>
      <Navbar title="title.calendar" />
      {loading ? (
        <Box flex={1} justifyContent="center">
          <Spinner color="primary" size="large" />
        </Box>
      ) : (
        <Box flex={1}>
          <ScrollView>
            <Calendar
              hideArrows={true}
              enableSwipeMonths={true}
              markedDates={marked}
              onDayPress={day => handleSelectedDate(day)}
              pt="mll"
              borderColor={theme.colors.whiteText}
              height={400}
              onMonthChange={month => {
                const val = {month: month.month, year: month.year};
                getCalendarEvents(val).then(res => {
                  const response = res?.data?.data?.map(value => {
                    const label = moment(value.time).utc().format('YYYY-MM-DD');
                    objmarked[label] = {
                      marked: true,
                      dotColor: theme.colors.error,
                    };
                    setMarked(objmarked);
                  });
                  setEvent(response);
                });
              }}
              theme={{
                todayTextColor: theme.colors.lightingYellow,
                'stylesheet.calendar.header': {
                  week: {
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  },
                  dayHeader: {color: 'black'},
                  monthText: {
                    fontWeight: '700',
                    fontSize: 18,
                    color: 'black',
                    paddingBottom: 20,
                  },
                },
              }}
            />
            {selectedId ? (
              CalendarEvent.length > 0 &&
              CalendarEvent?.map(res => {
                return (
                  <Box>
                    {res.time === selectedId && (
                      <LabeledCard
                        cardData={res}
                        openModal={() => {
                          navigate('CalendarEventModal', {cardData: res});
                        }}
                      />
                    )}
                  </Box>
                );
              })
            ) : (
              <Text
                pt="s"
                localeId="no.event.found"
                textAlign="center"
                color="darkText"
                variant="boldTitle"
                fontWeight="500"
              />
            )}
            <Box height={40}></Box>
          </ScrollView>
        </Box>
      )}
    </Box>
  );
};
