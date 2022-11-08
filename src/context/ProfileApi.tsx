import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
} from 'utils/context';
import {api} from 'utils/api/api';
import {AUTH_KEYS, hydrate, persist, unpersist} from 'utils/storage';
import {InsuranceType} from 'typings/auth.type';

export type ProfileState = {
  updateInsuranceLoading: boolean;
  updatedInsuranceData: any;
};
const initialState: ProfileState = {
  updateInsuranceLoading: false,
  updatedInsuranceData: {},
};
const actions = {
  updateInsurance: createAsyncActions('UPDATE_INSURANCE'),
};
const profileReducer = createReducer<ProfileState>({
  [`${actions.updateInsurance.loading}`]: state => ({
    ...state,
    updateInsuranceLoading: true,
  }),
  [`${actions.updateInsurance.success}`]: (state, {payload}) => ({
    ...state,
    updateInsuranceLoading: false,
    updatedInsuranceData: payload.updatedInsuranceData,
  }),
  [`${actions.updateInsurance.failure}`]: state => ({
    ...state,
    updateInsuranceLoading: false,
  }),
});

export const {
  useContext: useProfile,
  Context: ProfileContext,
  Provider: ProfileProvider,
  TestProvider: TestProfileProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(profileReducer, initialState);

  const updateInsurance = useCallback(
    async (values, openInsuranceModal, id) => {
      dispatch(actions.updateInsurance.loading());
      const token = await hydrate<string>(AUTH_KEYS.token);
      const apivalues = {
        insurance: values,
        token: token,
        flag: 'setting',
      };
      try {
        const {data} = await api.put<InsuranceType>(
          `/mobile/insurances/${id}`,
          apivalues,
        );
        if (data.status !== 'failure') {
          openInsuranceModal(`${data.success_message}`);
          await unpersist(AUTH_KEYS.insurance);
          await persist(AUTH_KEYS.insurance, data?.data[0]);
          dispatch(
            actions.updateInsurance.success({updatedInsuranceData: data.data}),
          );
        } else {
          dispatch(actions.updateInsurance.failure());
          openInsuranceModal(`${data.error.error_message}`);
        }
      } catch (e) {
        openInsuranceModal(`${e}`);
        dispatch(actions.updateInsurance.failure());
      }
    },
    [],
  );
  return {
    state: {
      ...state,
    },
    actions: {
      updateInsurance,
    },
  };
});

export default useProfile;
