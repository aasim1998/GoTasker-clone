/* eslint-disable no-console */
import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
} from 'utils/context';
import {api} from 'utils/api/api';
import {ClientType} from 'typings/client.type';
import {AUTH_KEYS, hydrate} from 'utils/storage';
import {ActiveRecord} from 'typings/activeServices.type';

export type JobState = {
  clientLoading: boolean;
  clientJobData: any;
  activeServicesLoading: boolean;
  activeServicesData: Array<ActiveRecord>;
};
const initialState: JobState = {
  clientLoading: false,
  clientJobData: undefined,
  activeServicesLoading: false,
  activeServicesData: [],
};
const actions = {
  clientListLoading: createAsyncActions('CLIENT_LOADING'),
  activeServicesListLoading: createAsyncActions('ACTIVE_SERVICES_LOADING'),
};

const jobReducer = createReducer<JobState>({
  [`${actions.clientListLoading.loading}`]: state => ({
    ...state,
    clientLoading: true,
  }),
  [`${actions.clientListLoading.success}`]: (state, {payload}) => ({
    ...state,
    clientLoading: false,
    clientJobData: payload?.clientJobData[0].clients,
  }),
  [`${actions.clientListLoading.failure}`]: state => ({
    ...state,
    clientLoading: false,
  }),

  [`${actions.activeServicesListLoading.loading}`]: state => ({
    ...state,
    activeServicesLoading: true,
  }),
  [`${actions.activeServicesListLoading.success}`]: (state, {payload}) => ({
    ...state,
    activeServicesLoading: false,
    activeServicesData: payload?.activeServicesData[0].active_record,
  }),
  [`${actions.activeServicesListLoading.failure}`]: state => ({
    ...state,
    activeServicesLoading: false,
  }),
});

export const {
  useContext: useJob,
  Context: JobContext,
  Provider: JobProvider,
  TestProvider: TestJobProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(jobReducer, initialState);

  const getClientList = useCallback(async () => {
    dispatch(actions.clientListLoading.loading());
    const token = await hydrate<string>(AUTH_KEYS.token);
    try {
      const {data} = await api.get<ClientType>(
        `mobile/clients?token=${token}&active_job=true`,
      );

      dispatch(actions.clientListLoading.success({clientJobData: data.data}));
    } catch (e) {
      // showErrorMessage(e.message);
      dispatch(actions.clientListLoading.failure());
    }
  }, []);

  const getActiveServicesList = useCallback(async (id: string) => {
    dispatch(actions.activeServicesListLoading.loading());
    const token = await hydrate<string>(AUTH_KEYS.token);
    try {
      const {data} = await api.get<ActiveRecord>(
        `mobile/projects/${id}/client_active_projects?token=${token}&paginate=0`,
      );

      dispatch(
        actions.activeServicesListLoading.success({
          activeServicesData: data.data,
        }),
      );
    } catch (e) {
      // showErrorMessage(e.message);
      dispatch(actions.activeServicesListLoading.failure());
    }
  }, []);

  return {
    state: {
      ...state,
    },
    actions: {
      getClientList,
      getActiveServicesList,
    },
  };
});

export default useJob;
