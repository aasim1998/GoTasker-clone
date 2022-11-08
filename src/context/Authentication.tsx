import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
  createAction,
} from 'utils/context';
import i18n from 'i18n-js';
import {api} from 'utils/api/api';
import {AUTH_KEYS, hydrate, persist, unpersist} from 'utils/storage';
import {showErrorMessage, showSuccessMessage} from 'utils/toast';
import {enabledHeadersFromStorage, removeHeaders} from 'utils/api/utils';
import {userDataType} from 'typings/auth.type';
import {goBack, navigate} from 'services/NavigationService';
import GlobalVariables from 'utils/constant';

export type AuthState = {
  language: string;
  loginLoading?: boolean;
  isLoggedIn?: boolean;
  logoutLoading: boolean;
  userData: any;
  authenticating?: boolean;
  isAppLoading: boolean;
  getCalendarEventsLoading: boolean;
  CalendarEvent: any;
  forgotPasswordLoading: boolean;
  getNotificationsLoading: boolean;
  getSmsLoading: boolean;
  getEmailLoading: boolean;
  getProductTour: boolean;
  forgotPasswords: any;
  editProfileLoading: boolean;
  editOrganization: boolean;
  editProfileImageLoading: boolean;
  editOrganizationLogoLoading: boolean;
};
const initialState: AuthState = {
  language: 'en',
  loginLoading: false,
  isLoggedIn: false,
  logoutLoading: false,
  userData: undefined,
  authenticating: false,
  isAppLoading: true,
  getCalendarEventsLoading: false,
  CalendarEvent: [],
  forgotPasswordLoading: false,
  getNotificationsLoading: false,
  getSmsLoading: false,
  getEmailLoading: false,
  getProductTour: false,
  editProfileLoading: false,
  forgotPasswords: {},
  editOrganization: false,
  editProfileImageLoading: false,
  editOrganizationLogoLoading: false,
};
const actions = {
  login: createAsyncActions('LOGIN'),
  logout: createAsyncActions('LOGOUT'),
  changeLanguage: createAction('CHANGE_LANGUAGE'),
  setAuthentication: createAction('AUTHENTICATION'),
  getCalendarEvents: createAsyncActions('GET_CALENDAR_EVENTS'),
  changePassword: createAsyncActions('CHANGE_PASSWORD'),
  forgotPassword: createAsyncActions('FORGOT_PASSWORD'),
  getNotifications: createAsyncActions('GET_NOTIFICATIONS'),
  getSms: createAsyncActions('GET_SMS'),
  getEmail: createAsyncActions('GET_EMAIL'),
  getProductTour: createAsyncActions('GET_PRODUCT_TOUR'),
  editProfile: createAsyncActions('EDIT_PROFILE'),
  confirmChangePassword: createAction('CONFIRM_CHANGE_PASSWORD'),
  editOrganizationLogo: createAsyncActions('EDIT_ORGANIZATION_LOGO'),
  editProfileImage: createAsyncActions('EDIT_IMAGE'),
  editOrganizationDetail: createAsyncActions('EDIT_ORGANIZATION_DETAIL'),
  getUserInfo: createAsyncActions('GET_USER_INFORMATION'),
  updateCalendarEvent: createAsyncActions('UPDATE_CALENDAR_EVENT'),
};
const authReducer = createReducer<AuthState>({
  [`${actions.setAuthentication}`]: (state, {payload}) => ({
    ...state,
    userData: payload?.userData,
    isLoggedIn: payload?.isLoggedIn,
    authenticating: false,
    isAppLoading: false,
  }),
  [`${actions.login.loading}`]: state => ({
    ...state,
    loginLoading: true,
  }),
  [`${actions.login.success}`]: (state, {payload}) => ({
    ...state,
    loginLoading: false,
    user: payload?.user,
    isLoggedIn: true,
  }),
  [`${actions.login.failure}`]: state => ({
    ...state,
    loginLoading: false,
  }),
  [`${actions.logout.loading}`]: state => ({
    ...state,
    logoutLoading: true,
  }),
  [`${actions.logout.success}`]: (state, {payload}) => ({
    ...state,
    logoutLoading: false,
    user: payload?.user,
    isLoggedIn: false,
  }),
  [`${actions.logout.failure}`]: state => ({
    ...state,
    logoutLoading: false,
  }),
  [`${actions.logout}`]: state => ({
    ...state,
    isLoggedIn: false,
  }),
  [`${actions.changeLanguage}`]: (state, {payload}) => ({
    ...state,
    language: payload,
  }),
  [`${actions.changeLanguage}`]: (state, {payload}) => ({
    ...state,
    language: payload,
  }),
  [`${actions.getCalendarEvents.loading}`]: state => ({
    ...state,
    getCalendarEventsLoading: true,
  }),
  [`${actions.getCalendarEvents.success}`]: (state, {payload}) => ({
    ...state,
    getCalendarEventsLoading: false,
    CalendarEvent: payload?.CalendarEvent,
  }),
  [`${actions.getCalendarEvents.failure}`]: state => ({
    ...state,
    getCalendarEventsLoading: false,
  }),
  [`${actions.forgotPassword.loading}`]: state => ({
    ...state,
    forgotPasswordLoading: true,
  }),
  [`${actions.forgotPassword.success}`]: (state, {payload}) => ({
    ...state,
    forgotPasswordLoading: false,
    forgotPasswords: payload?.forgotPasswords,
  }),
  [`${actions.forgotPassword.failure}`]: state => ({
    ...state,
    forgotPasswordLoading: false,
  }),
  [`${actions.getNotifications.loading}`]: state => ({
    ...state,
    getNotificationsLoading: true,
  }),
  [`${actions.getNotifications.success}`]: state => ({
    ...state,
    getNotificationsLoading: false,
  }),
  [`${actions.getNotifications.failure}`]: state => ({
    ...state,
    getNotificationsLoading: false,
  }),
  [`${actions.getSms.loading}`]: state => ({
    ...state,
    getSmsLoading: true,
  }),
  [`${actions.getSms.success}`]: state => ({
    ...state,
    getSmsLoading: false,
  }),
  [`${actions.getSms.failure}`]: state => ({
    ...state,
    getSmsLoading: false,
  }),
  [`${actions.getEmail.loading}`]: state => ({
    ...state,
    getEmailLoading: true,
  }),
  [`${actions.getEmail.success}`]: state => ({
    ...state,
    getEmailLoading: false,
  }),
  [`${actions.getEmail.failure}`]: state => ({
    ...state,
    getEmailLoading: false,
  }),
  [`${actions.getProductTour.loading}`]: state => ({
    ...state,
    getProductTourLoading: true,
  }),
  [`${actions.getProductTour.success}`]: state => ({
    ...state,
    getProductTourLoading: false,
  }),
  [`${actions.getProductTour.failure}`]: state => ({
    ...state,
    getProductTourLoading: false,
  }),
  [`${actions.editProfile.loading}`]: state => ({
    ...state,
    editProfileLoading: true,
  }),
  [`${actions.editProfile.success}`]: state => ({
    ...state,
    editProfileLoading: false,
  }),
  [`${actions.editProfile.failure}`]: state => ({
    ...state,
    editProfileLoading: false,
  }),
  [`${actions.editOrganizationLogo.loading}`]: state => ({
    ...state,
    editOrganizationLogoLoading: true,
  }),
  [`${actions.editOrganizationLogo.success}`]: state => ({
    ...state,
    editOrganizationLogoLoading: false,
  }),
  [`${actions.editOrganizationLogo.failure}`]: state => ({
    ...state,
    editOrganizationLogoLoading: false,
  }),
  [`${actions.editProfileImage.loading}`]: state => ({
    ...state,
    editProfileImageLoading: true,
  }),
  [`${actions.editProfileImage.success}`]: state => ({
    ...state,
    editProfileImageLoading: false,
  }),
  [`${actions.editProfileImage.failure}`]: state => ({
    ...state,
    editProfileImageLoading: false,
  }),
  [`${actions.editOrganizationDetail.loading}`]: state => ({
    ...state,
    editOrganization: true,
  }),
  [`${actions.editOrganizationDetail.success}`]: state => ({
    ...state,
    editOrganization: false,
  }),
  [`${actions.editOrganizationDetail.failure}`]: state => ({
    ...state,
    editOrganization: false,
  }),
  [`${actions.getUserInfo.loading}`]: state => ({
    ...state,
    getUserInformation: true,
  }),
  [`${actions.getUserInfo.success}`]: state => ({
    ...state,
    getUserInformation: false,
  }),
  [`${actions.getUserInfo.failure}`]: state => ({
    ...state,
    getUserInformation: false,
  }),
  [`${actions.updateCalendarEvent.loading}`]: state => ({
    ...state,
    calendarEventLoading: true,
  }),
  [`${actions.updateCalendarEvent.success}`]: state => ({
    ...state,
    calendarEventLoading: false,
  }),
  [`${actions.updateCalendarEvent.failure}`]: state => ({
    ...state,
    calendarEventLoading: false,
  }),
});

export const {
  useContext: useAuth,
  Context: AuthContext,
  Provider: AuthProvider,
  TestProvider: TestAuthProvider,
} = createContainer(() => {
  const [{language, ...state}, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  const changeLanguage = useCallback(async () => {
    dispatch(actions.changeLanguage('fr'));
    i18n.reset();
  }, []);

  const getCalendarEvents = async val => {
    dispatch(actions.getCalendarEvents.loading());
    const token = await hydrate<string>(AUTH_KEYS.token);
    try {
      const data = await api.get(
        `mobile/events?token=${token}&month=${val.month}&year=${val.year}`,
      );
      dispatch(
        actions.getCalendarEvents.success({
          CalendarEvent: data?.data?.data,
        }),
      );
      return data;
    } catch (e) {
      dispatch(actions.getCalendarEvents.failure());
    }
  };

  const updateCalendarEvent = useCallback(async (values?: any, id?: any) => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    dispatch(actions.updateCalendarEvent.loading());
    try {
      const {data} = await api.put(`mobile/events/${id}`, {
        event: {
          time: values.time,
          description: values.description,
          visit_type: values.visit_type,
        },
        description: values.description,
        participant_ids: values.participant_ids,
        time: values.time,
        visit_type: values.visit_type,
        token: `${token}`,
      });
      if (data.status === 'failure') {
        showErrorMessage(`${data.error.error_messages}`);
        dispatch(actions.updateCalendarEvent.failure());
      }
      dispatch(actions.updateCalendarEvent.success());
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      const val = {month: month, year: year};
      getCalendarEvents(val);
      showSuccessMessage(`${data.success_message}`);
      return data;
    } catch (e) {
      showErrorMessage(`${e}`);
      dispatch(actions.updateCalendarEvent.failure());
    }
  }, []);

  const getUserInfo = useCallback(async () => {
    const token = await hydrate<string>(AUTH_KEYS.token);

    try {
      const data = await api.get(`mobile/profile?token=${token}`);
      dispatch(
        actions.getCalendarEvents.success({
          CalendarEvent: data?.data?.data,
        }),
      );
      setUserInfo(token, data.data.data);
      return data;
    } catch (e) {}
  }, []);

  const getNotifications = useCallback(async (values: any) => {
    dispatch(actions.getNotifications.loading);
    try {
      const {data} = await api.put(
        'mobile/profile/enable_disable_notification',
        {
          token: values.token,
          user: {
            push_notifications_enabled: values.key,
          },
        },
      );
      dispatch(actions.getNotifications.success({}));
      showSuccessMessage(`${data.success_message}`);
      return data;
    } catch (e) {
      showErrorMessage(e.message);
      dispatch(actions.getNotifications.failure());
    }
  }, []);
  const getSms = useCallback(async (values: any) => {
    dispatch(actions.getSms.loading);
    try {
      const {data} = await api.put('mobile/profile/enable_disable_sms', {
        token: values.token,
        user: {
          sms_notifications_enabled: values.key,
        },
      });
      dispatch(actions.getSms.success({}));
      showSuccessMessage(`${data.success_message}`);
      return data;
    } catch (e) {
      showErrorMessage(e.message);
      dispatch(actions.getSms.failure());
    }
  }, []);
  const getEmail = useCallback(async (values: any) => {
    dispatch(actions.getEmail.loading);
    try {
      const {data} = await api.put('mobile/profile/enable_disable_mail', {
        token: values.token,
        user: {
          email_notifications_enabled: values.key,
        },
      });
      dispatch(actions.getEmail.success({}));
      showSuccessMessage(`${data.success_message}`);
      return data;
    } catch (e) {
      showErrorMessage(e.message);
      dispatch(actions.getEmail.failure());
    }
  }, []);
  const getProductTour = useCallback(async (values: any) => {
    dispatch(actions.getProductTour.loading);
    try {
      const {data} = await api.put('mobile/profile/enable_disable_mail', {
        token: values.token,
        user: {
          product_tour: values.key,
          // profile_tour: values.key,
          // project_tour: values.key,
        },
      });
      dispatch(actions.getProductTour.success({}));
      return data;
    } catch (e) {
      showErrorMessage(e.message);
      dispatch(actions.getProductTour.failure());
    }
  }, []);
  const setUserInfo = useCallback(
    async (token: string, userData: userDataType) => {
      await persist(AUTH_KEYS.token, token);
      await persist(AUTH_KEYS.user, userData);
      await persist(AUTH_KEYS.insurance, userData[0]?.current_user?.insurance);
      await enabledHeadersFromStorage();
      dispatch(
        actions.setAuthentication({
          isLoggedIn: true,
          userData: userData,
        }),
      );
    },

    [],
  );
  const getUserFromStorage = useCallback(async () => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    const user = await hydrate<string>(AUTH_KEYS.user);
    if (token && user) {
      await enabledHeadersFromStorage();
      dispatch(
        actions.setAuthentication({
          isLoggedIn: true,
          userData: user,
        }),
      );
    } else {
      dispatch(actions.setAuthentication({isLoggedIn: false}));
    }
  }, []);
  const confirmChangePassword = useCallback(async () => {
    await unpersist(AUTH_KEYS.token);
    await unpersist(AUTH_KEYS.fcmtoken);
    removeHeaders();
    dispatch(actions.logout.success({user: undefined}));
    dispatch(actions.logout.success({isLogedIn: false}));
  }, []);

  const changePassword = useCallback(async values => {
    dispatch(actions.changePassword.loading());
    try {
      const {data} = await api.put('mobile/profile/change_password', values);
      if (data.status === 'failure') {
        showErrorMessage(`${data.error.error_messages}`);
        dispatch(actions.changePassword.failure());
      } else {
        navigate('Confirmation');
      }
    } catch (e) {
      showErrorMessage(`${e}`);
      dispatch(actions.changePassword.failure());
    }
  }, []);

  const logout = useCallback(async () => {
    dispatch(actions.logout.loading());
    const token = await hydrate<string>(AUTH_KEYS.token);
    const fcmtoken = await hydrate<string>(AUTH_KEYS.fcmtoken);
    try {
      const {data} = await api.delete(
        `mobile/logout?token=${token}&device_token=${fcmtoken}`,
      );
      await unpersist(AUTH_KEYS.token);
      await unpersist(AUTH_KEYS.fcmtoken);
      removeHeaders();
      dispatch(actions.logout.success({user: undefined}));
      dispatch(actions.logout.success({isLogedIn: false}));
    } catch (e) {
      showErrorMessage(`${e}`);
      dispatch(actions.logout.failure());
    }
  }, [setUserInfo]);
  const login = useCallback(
    async (values, openErrorModal) => {
      dispatch(actions.login.loading());
      try {
        const user = values.user;
        const {data} = await api.post(`mobile/login`, {
          user,
        });
        if (data.status_code == 500) {
          var msg = data.error.error_messages[0];
          dispatch(actions.login.failure());
          openErrorModal(`${msg}`);
        } else {
          await setUserInfo(data?.data[0]?.token, data?.data);
          await persist(AUTH_KEYS.fcmtoken, values.user.token);
          dispatch(actions.login.success({userData: data.data}));
        }
      } catch (e) {
        openErrorModal(`${e}`);
        dispatch(actions.login.failure());
      }
    },
    [setUserInfo],
  );

  const forgotPassword = useCallback(async (values, openSuccessModal) => {
    dispatch(actions.forgotPassword.loading());
    try {
      const {data} = await api.post(`mobile/passwords`, values);
      if (data.success === false) {
        dispatch(actions.forgotPassword.failure());
      } else {
        dispatch(actions.forgotPassword.success());
        openSuccessModal(data.success_message);
      }
    } catch (e) {
      dispatch(actions.forgotPassword.failure());
    }
  }, []);
  const editProfile = useCallback(async values => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    dispatch(actions.editProfile.loading());
    try {
      const {data} = await api.put(`mobile/profile`, {
        token: token,
        user: values,
      });
      if (data.status == GlobalVariables.failure) {
        showErrorMessage(`${data.error.error_messages}`);
        dispatch(actions.editProfile.failure());
      } else {
        getUserInfo();
        showSuccessMessage(`${data.success_message}`);
        dispatch(actions.editProfile.success());
        goBack();
      }
    } catch (e) {
      dispatch(actions.editProfile.failure());
    }
  }, []);

  const editOrganizationLogo = useCallback(async (values, id) => {
    try {
      const {data} = await api.post(
        `mobile/organizations/${id}/update_logo`,
        values,
        {
          headers: {'Content-Type': 'multipart/form-data'},
          transformRequest: formData => formData,
        },
      );
      if (data.status == GlobalVariables.failure) {
        showErrorMessage(`${data.error.error_messages}`);
        dispatch(actions.editProfile.failure());
      } else {
        showSuccessMessage(`${data.success_message}`);
        dispatch(actions.editProfile.success());
        getUserInfo();
      }
    } catch (e) {
      dispatch(actions.editProfile.failure());
    }
  }, []);

  const editProfileImage = useCallback(async values => {
    try {
      const {data} = await api.put(
        `mobile/profile/update_profile_pic`,
        values,
        {
          headers: {'Content-Type': 'multipart/form-data'},
          transformRequest: formData => formData,
        },
      );
      if (data.status == GlobalVariables.failure) {
        showErrorMessage(`${data.error.error_messages}`);
        dispatch(actions.editProfile.failure());
      } else {
        showSuccessMessage(`${data.success_message}`);
        dispatch(actions.editProfile.success());
        getUserInfo();
      }
      console.log('Response', data);
    } catch (e) {
      dispatch(actions.editProfile.failure());
    }
  }, []);

  const editOrganizationDetail = useCallback(async values => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    dispatch(actions.editOrganizationDetail.loading());

    try {
      const {data} = await api.put(`mobile/organizations`, {
        token: token,
        organizations: values,
      });
      if (data.status == GlobalVariables.failure) {
        showErrorMessage(`${data.error.error_messages[0]}`);
        dispatch(actions.editOrganizationDetail.failure());
        return data;
      } else {
        getUserInfo();
        dispatch(actions.editOrganizationDetail.success());
      }
      return data;
    } catch (e) {
      dispatch(actions.editOrganizationDetail.failure());
      return e;
    }
  }, []);

  return {
    state: {
      ...state,
      language,
    },
    actions: {
      changeLanguage,
      login,
      getCalendarEvents,
      getUserFromStorage,
      changePassword,
      logout,
      forgotPassword,
      getNotifications,
      setUserInfo,
      getSms,
      getEmail,
      getProductTour,
      editProfile,
      confirmChangePassword,
      editOrganizationLogo,
      editProfileImage,
      editOrganizationDetail,
      getUserInfo,
      updateCalendarEvent,
    },
  };
});
export default useAuth;
