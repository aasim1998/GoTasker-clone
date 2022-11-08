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
import {ProjectDetailsProps} from 'typings/projectDetails.type';
import {en} from 'locales/en';
import Toast from 'react-native-simple-toast';

export type ProjectState = {
  language: string;
  getProjectDetailsLoading: boolean;
  projectDetails: Array<ProjectDetailsProps>;
  modifyProjectLoading: boolean;
  modifyProjectData?: any;
};
const initialState: ProjectState = {
  language: 'en',
  getProjectDetailsLoading: false,
  projectDetails: [],
  modifyProjectLoading: false,
  modifyProjectData: [],
};

const actions = {
  changeLanguage: createAction('CHANGE_LANGUAGE'),
  getProjectDetails: createAsyncActions('GET_PROJECT_DETAILS'),
  modifyProject: createAsyncActions('MODIFY_PROJECT'),
};

const ProjectReducer = createReducer<ProjectState>({
  [`${actions.changeLanguage}`]: (state, {payload}) => ({
    ...state,
    language: payload,
  }),
  [`${actions.getProjectDetails.loading}`]: state => ({
    ...state,
    getProjectDetailsLoading: true,
  }),
  [`${actions.getProjectDetails.success}`]: (state, {payload}) => ({
    ...state,
    projectDetails: payload?.projectDetails,
    getProjectDetailsLoading: false,
  }),
  [`${actions.getProjectDetails.failure}`]: state => ({
    ...state,
    getProjectDetailsLoading: false,
  }),
  [`${actions.modifyProject.loading}`]: state => ({
    ...state,
    modifyProjectLoading: true,
  }),
  [`${actions.modifyProject.success}`]: (state, {payload}) => ({
    ...state,
    modifyProjectData: payload?.modifyProjectData,
    modifyProjectLoading: false,
  }),
  [`${actions.modifyProject.failure}`]: state => ({
    ...state,
    modifyProjectLoading: false,
  }),
});

export const {
  useContext: useProject,
  Context: ProjectContext,
  Provider: ProjectProvider,
} = createContainer(() => {
  const [{language, ...state}, dispatch] = useReducer(
    ProjectReducer,
    initialState,
  );

  const changeLanguage = useCallback(async () => {
    dispatch(actions.changeLanguage('fr'));
    i18n.reset();
  }, []);

  const getProjectDetails = useCallback(async (id: string) => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    dispatch(actions.getProjectDetails.loading());
    try {
      const {data} = await api.get(`mobile/projects/${id}?token=${token}`);
      dispatch(
        actions.getProjectDetails.success({
          projectDetails: data.data,
        }),
      );
    } catch (e) {
      dispatch(actions.getProjectDetails.failure());
    }
  }, []);

  const modifyProject = useCallback(
    async (id: string, project?: any, label?: string, status?: string) => {
      const token = await hydrate<string>(AUTH_KEYS.token);
      dispatch(actions.modifyProject.loading());
      try {
        let data;
        status && Toast.show(en['toast.project.updation']);
        project
          ? (data = await api.put(`mobile/projects/${id}`, {
              token: token,
              project: project,
            }))
          : label
          ? (data = await api.put(`mobile/projects/${id}`, {
              token: token,
              label,
            }))
          : status
          ? (data = await api.put(`mobile/projects/${id}`, {
              token: token,
              status,
            }))
          : null;
        label && Toast.show(en['toast.project.updation']);
        dispatch(actions.modifyProject.success({modifyProjectData: data.data}));
      } catch (e) {
        dispatch(actions.modifyProject.failure());
      }
    },
    [],
  );

  return {
    state: {
      ...state,
      language,
    },
    actions: {
      changeLanguage,
      getProjectDetails,
      modifyProject,
    },
  };
});

export default useProject;
