import React, {useEffect} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import theme from './src/styles/theme';
import {ThemeProvider} from '@shopify/restyle';
import {composeComponents} from './src/utils/component';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoadAssets from './src/utils/LoadAssets';
import {I18nProvider} from './src/locales/I18nProvider';
import {AuthProvider} from './src/context/Authentication';
import {JobProvider} from './src/context/ClientListAPI';
import {OrgJobProvider} from './src/context/OrganizationListAPI';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import FlashMessage from 'react-native-flash-message';
import {AuthLoading} from './src/screens/Auth/AuthLoading';
import {DashboardProvider} from './src/context/DashboardAPI';
import {ProjectProvider} from './src/context/ProjectAPI';
import {FeedProvider} from './src/context/FeedAPI';
import {ProfileProvider} from './src/context/ProfileApi';

const paperTheme: typeof DefaultTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    accent: '#f1c40f',
  },
};

const Providers = composeComponents(
  SafeAreaProvider,
  AuthProvider,
  DashboardProvider,
  FeedProvider,
  JobProvider,
  OrgJobProvider,
  ProjectProvider,
  ProfileProvider,
);
const getNotificationToken = async () => {
  const fmcToken = await messaging().getToken();
  console.log('FmcToken : ', fmcToken);
};
PushNotification.createChannel(
  {
    channelId: 'Gotasker', // (required)
    channelName: 'Gotasker', // (required)
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const App = () => {
  useEffect(() => {
    getNotificationToken();
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log(
        'Message handled in foreground!',
        JSON.stringify(remoteMessage),
      );
      PushNotification.localNotification({
        channelId: 'Gotasker',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body!,
        priority: 'high',
      });
    });

    return unsubscribe;
  }, []);

  return (
    <LoadAssets>
      <Providers>
        <I18nProvider>
          <PaperProvider theme={paperTheme}>
            <ThemeProvider theme={theme}>
              <FlashMessage position="top" />
              <AuthLoading />
            </ThemeProvider>
          </PaperProvider>
        </I18nProvider>
      </Providers>
    </LoadAssets>
  );
};

export default App;
