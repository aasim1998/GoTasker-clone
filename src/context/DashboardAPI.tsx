import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
  createAction,
} from 'utils/context';
import i18n from 'i18n-js';
import {api} from 'utils/api/api';
import {AUTH_KEYS, hydrate} from 'utils/storage';
import {SelectClientProps} from 'typings/selectClient';
import {PendingActionCounterProp} from 'typings/pendingActionCounter';
import {SelectOrganizationProps} from 'typings/selectOrganization';
import {showErrorMessage, showSuccessMessage} from 'utils/toast';
import {AddNewServiceProps} from 'typings/addNewService.type';

export type DashboardState = {
  language: string;
  getSelectClientListLoading: boolean;
  selectClientList: Array<SelectClientProps>;
  addNewServiceLoading: boolean;
  addNewServiceData: Array<AddNewServiceProps>;
  getPendingActionCounterLoading: boolean;
  pendingActionCounterList: Array<PendingActionCounterProp>;
  getSelectOrganizationListLoading: boolean;
  selectOrganizationList: Array<SelectOrganizationProps>;
  PendingActionListLoading: boolean;
  pendingActionList: Array<any>;
  dismissActionLoading: boolean;
};
const initialState: DashboardState = {
  language: 'en',
  getSelectClientListLoading: false,
  selectClientList: [],
  addNewServiceLoading: false,
  addNewServiceData: [],
  getPendingActionCounterLoading: false,
  pendingActionCounterList: [],
  getSelectOrganizationListLoading: false,
  selectOrganizationList: [],
  PendingActionListLoading: false,
  pendingActionList: [],
  dismissActionLoading: false,
};

const actions = {
  changeLanguage: createAction('CHANGE_LANGUAGE'),
  getSelectClientList: createAsyncActions('GET_SELECT_CLIENT_LIST'),
  addNewService: createAsyncActions('ADD_NEW_SERVICE'),
  getPendingActionCounterList: createAsyncActions(
    'GET_PENDING_ACTION_COUNTER_LIST',
  ),
  getPendingAction: createAsyncActions('GET_PENDING_ACTION'),
  getSelectOrganizationList: createAsyncActions('GET_SELECT_ORGANIZATION_LIST'),
  dismissAction: createAsyncActions('DISMISS_ACTION'),
};

const DashboardReducer = createReducer<DashboardState>({
  [`${actions.changeLanguage}`]: (state, {payload}) => ({
    ...state,
    language: payload,
  }),
  [`${actions.getSelectClientList.loading}`]: state => ({
    ...state,
    getSelectClientListLoading: true,
  }),
  [`${actions.getSelectClientList.success}`]: (state, {payload}) => ({
    ...state,
    selectClientList: payload?.selectClientList,
    getSelectClientListLoading: false,
  }),
  [`${actions.getSelectClientList.failure}`]: state => ({
    ...state,
    getSelectClientListLoading: false,
  }),
  [`${actions.addNewService.loading}`]: state => ({
    ...state,
    addNewServiceLoading: true,
  }),
  [`${actions.addNewService.success}`]: (state, payload) => ({
    ...state,
    addNewServiceData: payload.addNewServiceData,
    addNewServiceLoading: false,
  }),
  [`${actions.addNewService.failure}`]: state => ({
    ...state,
    addNewServiceLoading: false,
  }),
  [`${actions.getPendingActionCounterList.loading}`]: state => ({
    ...state,
    getPendingActionCounterLoading: true,
  }),
  [`${actions.getPendingActionCounterList.success}`]: (state, {payload}) => ({
    ...state,
    pendingActionCounterList: payload?.pendingActionCounterList,
    getPendingActionCounterLoading: false,
  }),
  [`${actions.getPendingActionCounterList.failure}`]: state => ({
    ...state,
    getPendingActionCounterLoading: false,
  }),
  [`${actions.getSelectOrganizationList.loading}`]: state => ({
    ...state,
    getSelectOrganizationListLoading: true,
  }),
  [`${actions.getSelectOrganizationList.success}`]: (state, {payload}) => ({
    ...state,
    selectOrganizationList: payload?.selectOrganizationList,
    getSelectOrganizationListLoading: false,
  }),
  [`${actions.getSelectOrganizationList.failure}`]: state => ({
    ...state,
    getSelectOrganizationListLoading: false,
  }),
  [`${actions.getPendingAction.loading}`]: state => ({
    ...state,
    PendingActionListLoading: true,
  }),
  [`${actions.getPendingAction.success}`]: (state, {payload}) => ({
    ...state,
    pendingActionList: payload,
    PendingActionListLoading: false,
  }),
  [`${actions.getPendingAction.failure}`]: state => ({
    ...state,
    PendingActionListLoading: false,
  }),
  [`${actions.dismissAction.loading}`]: state => ({
    ...state,
    dismissActionLoading: true,
  }),
  [`${actions.dismissAction.success}`]: state => ({
    ...state,
    dismissActionLoading: false,
  }),
  [`${actions.dismissAction.failure}`]: state => ({
    ...state,
    dismissActionLoading: false,
  }),
});
export const {
  useContext: useDashboard,
  Context: DashboardContext,
  Provider: DashboardProvider,
} = createContainer(() => {
  const [{language, ...state}, dispatch] = useReducer(
    DashboardReducer,
    initialState,
  );

  const changeLanguage = useCallback(async () => {
    dispatch(actions.changeLanguage('fr'));
    i18n.reset();
  }, []);

  const getSelectClientList = useCallback(async () => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    try {
      const {data} = await api.get(
        `mobile/clients?token=${token}&active_job=false`,
      );
      dispatch(
        actions.getSelectClientList.success({
          selectClientList: data?.data[0].clients,
        }),
      );
    } catch (e) {
      dispatch(actions.getSelectClientList.failure());
    }
  }, []);

  const addNewService = useCallback(async (values: AddNewServiceProps) => {
    dispatch(actions.addNewService.loading);
    try {
      const data = await api.post(`mobile/projects`, values);
      if (data.status == 'failure') {
        dispatch(actions.addNewService.failure());
      } else {
        dispatch(actions.addNewService.success({addNewServiceData: data.data}));
        return data;
      }
    } catch (e) {
      dispatch(actions.addNewService.failure());
    }
  }, []);

  const getPendingActionCounterList = useCallback(async () => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    try {
      const {data} = await api.get(
        `mobile/dashboard/incoming_count?token=${token}`,
      );
      dispatch(
        actions.getPendingActionCounterList.success({
          pendingActionCounterList: data?.data[0]?.notice_count,
        }),
      );
    } catch (e) {
      dispatch(actions.getPendingActionCounterList.failure());
    }
  }, []);

  const getSelectOrganizationList = useCallback(async () => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    try {
      const {data} = await api.get(
        `mobile/profile/organization_dropdown?token=${token}`,
      );
      dispatch(
        actions.getSelectOrganizationList.success({
          selectOrganizationList: data.data,
        }),
      );
    } catch (e) {
      dispatch(actions.getSelectOrganizationList.failure());
    }
  }, []);

  const getPendingAction = useCallback(async () => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    dispatch(actions.getPendingAction.loading());
    try {
      const data = await api.get(
        `mobile/notifications?pending=true&token=${token}`,
      );
      dispatch(
        actions.getPendingAction.success({
          pendingActionList: data?.data?.data,
        }),
      );
    } catch (e) {
      dispatch(actions.getPendingAction.failure());
    }
  }, []);
  const dismissAction = useCallback(
    async val => {
      const token = await hydrate<string>(AUTH_KEYS.token);
      try {
        const data = await api.put(`mobile/notifications/${val}`, {
          notice: {done: true},
          token: `${token}`,
        });
        if (data.data.status == 'failure' || data.data.status_code == 500) {
          showErrorMessage(`${data.data.error.error_messages[0]}`);
          dispatch(actions.dismissAction.failure());
        } else {
          showSuccessMessage(`${data.data.success_message}`);
          dispatch(actions.dismissAction.success());
          getPendingActionCounterList();
        }
      } catch (e) {
        dispatch(actions.dismissAction.failure());
      }
    },
    [getPendingActionCounterList],
  );

  return {
    state: {
      ...state,
      language,
    },
    actions: {
      changeLanguage,
      getSelectClientList,
      addNewService,
      getPendingActionCounterList,
      getSelectOrganizationList,
      getPendingAction,
      dismissAction,
    },
  };
});

export default useDashboard;
