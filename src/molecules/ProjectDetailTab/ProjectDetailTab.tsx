import React from 'react';
import {Box} from 'atoms/Box';
import {ProjectTimeline} from 'screens/Main/ProjectTimeline';
import {ProjectQuotes} from 'screens/Main/ProjectQuotes';
import {ProjectEvents} from 'screens/Main/ProjectEvents';
import {ProjectMessage} from 'screens/Main/ProjectMessage';
import {ProjectFiles} from 'screens/Main/ProjectFiles';
import {ProjectSubcontractors} from 'screens/Main/ProjectSubcontractors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import useAuth from 'context/Authentication';
import GlobalVariables, {userRoleType} from 'utils/constant';
import theme from 'styles/theme';
import {isIOS} from 'utils/device';

const Tab = createMaterialTopTabNavigator();

export const ProjectDetailTab = ({initialRoute}) => {
  const {
    state: {userData},
  } = useAuth();
  const userInfo = userData[0]?.current_user?.role_list?.role;

  function routeName() {
    return initialRoute === GlobalVariables.ServiceText
      ? 'Timeline'
      : initialRoute === GlobalVariables.QuoteTextNew
      ? 'Quotes'
      : initialRoute === GlobalVariables.EventText
      ? 'Events'
      : initialRoute === GlobalVariables.MessageText
      ? 'Message'
      : initialRoute === GlobalVariables.FileText
      ? 'Files'
      : '';
  }
  return (
    <Box minHeight="100%">
      <Tab.Navigator
        initialRouteName={routeName()}
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.greyPrimary,
          tabBarLabelStyle: {
            fontWeight: '700',
            fontSize: 14,
            textTransform: 'none',
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.whiteText,
            height: '100%',
            borderTopColor: theme.colors.lightingYellow,
            borderTopWidth: 3,
            bottom: isIOS ? -1 : 0,
          },
          tabBarStyle: {
            backgroundColor: theme.colors.primary,
            height: 46,
            elevation: 0,
          },
          tabBarItemStyle: {
            width: 'auto',
          },
        }}>
        <Tab.Screen name="Timeline" component={ProjectTimeline} />
        <Tab.Screen name="Quotes" component={ProjectQuotes} />
        <Tab.Screen name="Events" component={ProjectEvents} />
        <Tab.Screen name="Message" component={ProjectMessage} />
        <Tab.Screen name="Files" component={ProjectFiles} />
        {userInfo !== userRoleType.CLIENT &&
          userInfo !== userRoleType.SUBCONTRACTOR && (
            <Tab.Screen
              name="Subcontractors"
              component={ProjectSubcontractors}
            />
          )}
      </Tab.Navigator>
    </Box>
  );
};
