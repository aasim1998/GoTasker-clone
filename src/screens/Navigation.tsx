import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'atoms/Icon';
import theme from '../styles/theme';
import {Dashboard} from './Main/dashboard/Dashboard';
import {CalendarTab} from './Main/calendar';
import {Feeds} from './Main/feeds';
import {Profile} from './Main/profile';
import GlobalVariables from '../utils/constant';
import {en} from 'locales/en';
import {Contacts} from './Main/contacts/Contacts';
import {LoginScreen} from './Auth/loginscreen';
import {ChangePassword} from './Main/changepassword';
import {EditProfileScreen} from './Main/editprofile';
import {Settings} from './Main/Settings';
import {PendingAction} from './Main/pendingActions/PendingAction';
import {CreateFeeds} from './Main/createFeeds';
import {ListFeeds} from './Main/listFeeds/ListFeeds';
import {SavedFeeds} from './Main/savedFeeds/SavedFeeds';
import {OthersFeeds} from './Main/postedByOthers/PostedByOthers';
import {ForgotPassword} from './Auth/forgotpassword';
import {ActiveJobScreen} from './Main/activeJobScreen';
import {TermsAndCondition} from './Main/TermsAndCondition';
import {PrivacyPolicy} from './Main/PrivacyPolicy';
import {FAQs} from './Main/FAQs';
import {Box} from 'atoms/Box';
import {Projects} from './Main/projects/Projects';
import {Confirmation} from './Main/changepassword/organisms/Confirmation';
import {CalendarEventModal} from 'molecules/CalendarEventModal';
import {InsuranceScreen} from './Main/InsuranceScreen';
import {ActiveServices} from './Main/activeJobScreen/activeServices/ActiveServices';
import {SelectClient} from './Main/activeJobScreen/selectClient';
import {EditOrganisationScreen} from './Main/organisationScreen';
import {isAndroid} from 'utils/device';
import {EditFeeds} from './Main/editFeeds';
import {FeedDetails} from './Main/feedDetails';

export type MainStackParamList = {
  GlobalVariables: undefined;
  BottomNavigator: undefined;
  Dashboard: undefined;
  Contacts: undefined;
  ChangePassword: undefined;
  EditProfileScreen: undefined;
  SettingScreen: undefined;
  ForgotPassword: undefined;
  PrivacyPolicy: undefined;
  TermsAndCondition: undefined;
  FAQs: undefined;
  Projects: undefined;
  Confirmation: undefined;
  LoginScreen: undefined;
  CalendarEventModal: undefined;
  InsuranceScreen: undefined;
  FeedStackScreen: undefined;
  ActiveServices: undefined;
  SelectClient: undefined;
};

export type FeedStackParamList = {
  Feeds: undefined;
  CreateFeeds: undefined;
  ListFeeds: undefined;
  SavedFeeds: undefined;
  OthersFeeds: undefined;
  FeedDetails: undefined;
  EditFeeds: undefined;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  ForgotPassword: undefined;
};

const Tab = createBottomTabNavigator();

const BottomNavigator = ({navigation}: {navigation: any}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: theme.textVariants.titleDescription.fontSize,
        },
        tabBarActiveTintColor: theme.colors.iconColor,
        tabBarInactiveTintColor: theme.colors.greyText,
        tabBarIconStyle: {
          marginTop: theme.spacing.s,
        },
        tabBarStyle: {
          borderTopColor: theme.colors.greyText,
          paddingBottom: isAndroid ? 7 : 25,
        },
      }}>
      <Tab.Screen
        name={GlobalVariables.Dashboard}
        component={DashboardStackScreen}
        options={{
          tabBarLabel: en.dashboard,
          tabBarIcon: ({color, focused}) => (
            <Box>
              <Icon
                name={focused ? 'ic_dashboard_grey-1' : 'dashboard'}
                size={19}
                color={color}
                onPress={() => navigation.navigate(GlobalVariables.Dashboard)}
              />
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name={GlobalVariables.Calendar}
        component={CalendarTab}
        options={{
          unmountOnBlur: true,
          tabBarLabel: en['calendar.txt'],
          tabBarIcon: ({color}) => (
            <Box>
              <Icon
                name="calendar"
                size={20}
                color={color}
                onPress={() => navigation.navigate(GlobalVariables.Calendar)}
              />
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name={GlobalVariables.Feeds}
        component={FeedStackScreen}
        options={{
          tabBarLabel: en['feeds.txt'],
          tabBarIcon: ({color}) => (
            <Box>
              <Icon
                name={GlobalVariables.feeds}
                size={24}
                color={color}
                onPress={() => navigation.navigate(GlobalVariables.Feeds)}
              />
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name={GlobalVariables.Profile}
        component={Profile}
        options={{
          tabBarLabelStyle: {
            // marginLeft: theme.spacing.xs,
          },
          tabBarLabel: en['profile.txt'],
          tabBarIcon: ({color, focused}) => (
            <Box>
              <Icon
                name={focused ? 'ProfileFilled-1' : 'ProfileOutline'}
                size={20}
                color={color}
                onPress={() => navigation.navigate(GlobalVariables.Profile)}
              />
            </Box>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DashboardStack = createStackNavigator();

export const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <DashboardStack.Screen
        name={GlobalVariables.DashboardScreen}
        component={Dashboard}
      />
      <DashboardStack.Screen
        name={GlobalVariables.PendingAction}
        component={PendingAction}
      />
      <DashboardStack.Screen
        name={GlobalVariables.Contacts}
        component={Contacts}
      />
      <DashboardStack.Screen
        name={GlobalVariables.ActiveJobScreen}
        component={ActiveJobScreen}
      />

      <DashboardStack.Screen
        name={GlobalVariables.ActiveServices}
        component={ActiveServices}
      />
    </DashboardStack.Navigator>
  );
};

const FeedStack = createStackNavigator<FeedStackParamList>();
export const FeedStackScreen = () => {
  return (
    <FeedStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <FeedStack.Screen name={GlobalVariables.Feeds} component={Feeds} />
      <FeedStack.Screen
        name={GlobalVariables.CreateFeeds}
        component={CreateFeeds}
      />
      <FeedStack.Screen
        name={GlobalVariables.ListFeeds}
        component={ListFeeds}
      />
      <FeedStack.Screen
        name={GlobalVariables.SavedFeeds}
        component={SavedFeeds}
      />
      <FeedStack.Screen
        name={GlobalVariables.OthersFeeds}
        component={OthersFeeds}
      />
      <FeedStack.Screen
        name={GlobalVariables.FeedDetails}
        component={FeedDetails}
      />
      <FeedStack.Screen
        name={GlobalVariables.EditFeeds}
        component={EditFeeds}
      />
    </FeedStack.Navigator>
  );
};

const MainStack = createStackNavigator<MainStackParamList>();
export const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen
        name={GlobalVariables.BottomNavigator}
        component={BottomNavigator}
      />

      <MainStack.Screen
        name={GlobalVariables.TermsAndCondition}
        component={TermsAndCondition}
      />
      <MainStack.Screen
        name={GlobalVariables.PrivacyPolicy}
        component={PrivacyPolicy}
      />
      <MainStack.Screen name="FAQs" component={FAQs} />
      <MainStack.Screen
        name={GlobalVariables.ProjectDetails}
        component={Projects}
      />
      <MainStack.Screen
        name={GlobalVariables.SettingScreen}
        component={Settings}
      />
      <MainStack.Screen
        name={GlobalVariables.EditProfileScreen}
        component={EditProfileScreen}
      />
      <MainStack.Screen
        name={GlobalVariables.ChangePassword}
        component={ChangePassword}
      />

      <MainStack.Screen
        name={GlobalVariables.SelectClient}
        component={SelectClient}
      />
      <MainStack.Screen
        name={GlobalVariables.Confirmation}
        component={Confirmation}
      />
      <MainStack.Screen
        name={GlobalVariables.OrganizationScreen}
        component={EditOrganisationScreen}
      />
      <MainStack.Screen
        options={{presentation: 'transparentModal', cardOverlayEnabled: true}}
        name={GlobalVariables.CalendarEventModal}
        component={CalendarEventModal}
      />
      <MainStack.Screen
        name={GlobalVariables.InsuranceScreen}
        component={InsuranceScreen}
      />
      <MainStack.Screen
        name={GlobalVariables.FeedStackScreen}
        component={FeedStackScreen}
      />
    </MainStack.Navigator>
  );
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen
        name={GlobalVariables.LoginScreen}
        component={LoginScreen}
      />
      <AuthStack.Screen
        name={GlobalVariables.ForgotPassword}
        component={ForgotPassword}
      />
    </AuthStack.Navigator>
  );
};
