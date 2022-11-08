/* eslint-disable no-console */
import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
} from 'utils/context';
import {api} from 'utils/api/api';
import {OrganizationType} from 'typings/org.type';
import {AUTH_KEYS, hydrate} from 'utils/storage';

export type JobState = {
  organizationLoading: boolean;
  organizationJobData: any;
};
const initialState: JobState = {
  organizationLoading: false,
  organizationJobData: [],
};
const actions = {
  organizationListLoading: createAsyncActions('ORGANIZATION_LOADING'),
};

const OrgJobReducer = createReducer<JobState>({
  [`${actions.organizationListLoading.loading}`]: state => ({
    ...state,
    organizationLoading: true,
  }),
  [`${actions.organizationListLoading.success}`]: (state, {payload}) => ({
    ...state,
    organizationLoading: false,
    organizationJobData: payload?.organizationJobData[0].organization_list,
  }),
  [`${actions.organizationListLoading.failure}`]: state => ({
    ...state,
    organizationLoading: false,
  }),
});

export const {
  useContext: useOrgJob,
  Context: OrgJobContext,
  Provider: OrgJobProvider,
  TestProvider: TestOrgJobProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(OrgJobReducer, initialState);

  const getOrganizationList = useCallback(async () => {
    dispatch(actions.organizationListLoading.loading());
    const token = await hydrate<string>(AUTH_KEYS.token);
    try {
      const {data} = await api.get<OrganizationType>(
        `mobile/profile/organization_list?token=${token}&flag=true`,
      );

      dispatch(
        actions.organizationListLoading.success({
          organizationJobData: data.data,
        }),
      );
    } catch (e) {
      // showErrorMessage(e.message);
      dispatch(actions.organizationListLoading.failure());
    }
  }, []);

  return {
    state: {
      ...state,
    },
    actions: {
      getOrganizationList,
    },
  };
});

export default useOrgJob;
