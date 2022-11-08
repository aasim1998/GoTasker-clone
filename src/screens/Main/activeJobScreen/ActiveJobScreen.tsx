import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import theme from 'styles/theme';
import {createStackNavigator} from '@react-navigation/stack';
import {Navbar} from 'molecules/Navbar';
import useAuth from 'context/Authentication';
import {Text} from 'atoms/Text';
import {Box} from 'atoms/Box';
import {Touch} from 'atoms/Touch';
import {en} from 'locales/en';
import {StyleSheet} from 'react-native';
import {ClientScreen} from 'organisms/ClientScreen';
import {OrganizationScreen} from 'organisms/OrganizationScreen';
import {popToTop} from 'services/NavigationService';

export type TopTabStackParamList = {
  GlobalVariables: undefined;
  TopTabs: undefined;
};

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  const {
    actions: {changeLanguage},
  } = useAuth();

  function MyTabBar({state, descriptors, navigation}) {
    return (
      <Box style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const label = route.name;

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({name: route.name, merge: true});
            }
          };

          return (
            <Touch
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={[
                styles.buttonDesign,
                {
                  backgroundColor: isFocused
                    ? theme.colors.whiteText
                    : theme.colors.inactiveTabBar,
                  borderBottomColor: isFocused
                    ? theme.colors.iconColor
                    : theme.colors.darkGreyText,
                  borderBottomWidth: isFocused ? 3 : 0.2,
                },
              ]}>
              <Text
                style={{
                  color: isFocused
                    ? theme.colors.darkGreyText
                    : theme.colors.darkGreyText,
                  fontSize: isFocused
                    ? theme.textVariants.boldTitle.fontSize
                    : theme.textVariants.headline.fontSize,
                  fontWeight: isFocused ? 'bold' : '700',
                }}>
                {label}
              </Text>
            </Touch>
          );
        })}
      </Box>
    );
  }

  return (
    <>
      <Navbar title="title.active.jobs" showBack overrideBack={popToTop} />
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name={en['clients.txt']}
          component={ClientScreen}
          options={{tabBarLabel: en['clients.txt']}}
        />

        <Tab.Screen
          name={en['organizations.txt']}
          component={OrganizationScreen}
          options={{tabBarLabel: 'organizations.txt'}}
        />
      </Tab.Navigator>
    </>
  );
};
const TopTabStack = createStackNavigator<TopTabStackParamList>();

export const ActiveJobScreen = () => {
  const {
    state: {userData},
  } = useAuth();

  const userInfo = userData[0]?.current_user?.role_list?.role;

  return userInfo !== 'owner' && userInfo !== 'manager' ? (
    <>
      <Navbar title="organizations.txt" showBack />
      <OrganizationScreen />
    </>
  ) : (
    <TopTabStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <TopTabStack.Screen name="TopTabs" component={TopTabs} />
    </TopTabStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonDesign: {
    flex: 1,
    paddingVertical: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
