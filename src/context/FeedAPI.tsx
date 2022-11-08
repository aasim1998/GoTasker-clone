import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
} from 'utils/context';
import {api} from 'utils/api/api';
import {FeedListProps} from 'typings/listFeeds.type';
import {OthersFeedsListProps} from 'typings/savedByOthers.type';
import {SavedFeedsListProps} from 'typings/savedFeeds.type';
import {AUTH_KEYS, hydrate} from 'utils/storage';
import {showErrorMessage, showSuccessMessage} from 'utils/toast';
import {feedDetailsType} from 'typings/feedDetails.type';
import GlobalVariables from 'utils/constant';
export type FeedState = {
  getFeedsLoading: boolean;
  feedList: Array<FeedListProps>;
  getOthersFeedsLoading: boolean;
  othersFeedsList: Array<OthersFeedsListProps>;
  getSavedFeedsLoading: boolean;
  savedFeedsList: Array<SavedFeedsListProps>;
  createFeedsLoading: boolean;
  getFeedDetailsLoading: boolean;
  feedDetailsItem: Array<feedDetailsType>;
};

const initialState: FeedState = {
  getFeedsLoading: false,
  feedList: [],
  getOthersFeedsLoading: false,
  othersFeedsList: [],
  getSavedFeedsLoading: false,
  savedFeedsList: [],
  createFeedsLoading: false,
  getFeedDetailsLoading: false,
  feedDetailsItem: [],
};

const actions = {
  getFeeds: createAsyncActions('GET_FEEDS'),
  getOthersFeeds: createAsyncActions('GET_OTHERS_FEEDS'),
  getSavedFeeds: createAsyncActions('GET_SAVED_FEEDS'),
  createFeeds: createAsyncActions('CREATE_FEEDS'),
  feedsDetails: createAsyncActions('FEEDS_DETAILS'),
};

const feedReducer = createReducer<FeedState>({
  [`${actions.getFeeds.loading}`]: state => ({
    ...state,
    getFeedsLoading: true,
  }),
  [`${actions.getFeeds.success}`]: (state, {payload}) => ({
    ...state,
    feedList: payload?.feedList,
    getFeedsLoading: false,
  }),
  [`${actions.getFeeds.failure}`]: state => ({
    ...state,
    getFeedsLoading: false,
  }),

  [`${actions.getOthersFeeds.loading}`]: state => ({
    ...state,
    getOthersFeedsLoading: true,
  }),
  [`${actions.getOthersFeeds.success}`]: (state, {payload}) => ({
    ...state,
    othersFeedsList: payload?.othersFeedsList,
    getOthersFeedsLoading: false,
  }),
  [`${actions.getOthersFeeds.failure}`]: state => ({
    ...state,
    getOthersFeedsLoading: false,
  }),

  [`${actions.getSavedFeeds.loading}`]: state => ({
    ...state,
    getSavedFeedsLoading: true,
  }),
  [`${actions.getSavedFeeds.success}`]: (state, {payload}) => ({
    ...state,
    savedFeedsList: payload?.savedFeedsList,
    getSavedFeedsLoading: false,
  }),
  [`${actions.getSavedFeeds.failure}`]: state => ({
    ...state,
    getSavedFeedsLoading: false,
  }),

  [`${actions.createFeeds.loading}`]: state => ({
    ...state,
    createFeedsLoading: true,
  }),
  [`${actions.createFeeds.success}`]: state => ({
    ...state,

    createFeedsLoading: false,
  }),
  [`${actions.createFeeds.failure}`]: state => ({
    ...state,
    createFeedsLoading: false,
  }),

  [`${actions.feedsDetails.loading}`]: state => ({
    ...state,
    getFeedDetailsLoading: true,
  }),
  [`${actions.feedsDetails.success}`]: (state, {payload}) => ({
    ...state,
    feedDetailsItem: payload?.feedDetailsItem,
    getFeedDetailsLoading: false,
  }),
  [`${actions.feedsDetails.failure}`]: state => ({
    ...state,
    getFeedDetailsLoading: false,
  }),
});

export const {
  useContext: useFeed,
  Context: FeedContext,
  Provider: FeedProvider,
  TestProvider: TestFeedProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(feedReducer, initialState);
  const getFeeds = useCallback(async () => {
    dispatch(actions.getFeeds.loading());
    const token = await hydrate<string>(AUTH_KEYS.token);

    try {
      const {data} = await api.get<Array<FeedListProps>>(
        `mobile/promotions?token=${token}`,
      );
      console.log(data);
      dispatch(
        actions.getFeeds.success({
          feedList: data.data,
        }),
      );
    } catch (e) {
      dispatch(actions.getFeeds.failure());
    }
  }, []);

  const getOthersFeeds = useCallback(async () => {
    dispatch(actions.getOthersFeeds.loading());
    const token = await hydrate<string>(AUTH_KEYS.token);
    try {
      const {data} = await api.get<Array<OthersFeedsListProps>>(
        `mobile/promotions/accepted_promotions?token=${token}`,
      );
      console.log(data);
      dispatch(
        actions.getOthersFeeds.success({
          othersFeedsList: data,
        }),
      );
    } catch (e) {
      dispatch(actions.getOthersFeeds.failure());
    }
  }, []);

  const getSavedFeeds = useCallback(async () => {
    dispatch(actions.getSavedFeeds.loading());
    const token = await hydrate<string>(AUTH_KEYS.token);

    try {
      const {data} = await api.get<Array<SavedFeedsListProps>>(
        `mobile/promotions/get_saved_promotion?token=${token}`,
      );
      dispatch(
        actions.getSavedFeeds.success({
          savedFeedsList: data,
        }),
      );
    } catch (e) {
      dispatch(actions.getSavedFeeds.failure());
    }
  }, []);

  const createFeeds = useCallback(
    async values => {
      dispatch(actions.createFeeds.loading());
      const token = await hydrate<string>(AUTH_KEYS.token);
      try {
        const {data} = await api.post(
          `mobile/promotions?token=${token}`,
          values,
          {
            headers: {'Content-Type': 'multipart/form-data'},
            transformRequest: formData => formData,
          },
        );
        if (data.status == GlobalVariables.failure) {
          showErrorMessage(`${data.error.error_messages}`);
          dispatch(actions.createFeeds.failure());
        } else {
          showSuccessMessage(`${data.success_message}`);
          dispatch(actions.createFeeds.success());
          getFeeds();
        }
      } catch (e) {
        console.log(e);
        showErrorMessage(`${e}`);
        dispatch(actions.createFeeds.failure());
      }
    },
    [getFeeds],
  );

  const feedsDetails = useCallback(async id => {
    dispatch(actions.feedsDetails.loading());
    const token = await hydrate<string>(AUTH_KEYS.token);

    try {
      const {data} = await api.get<Array<feedDetailsType>>(
        `/mobile/promotions/${id}?token=${token}`,
      );
      console.log(data);
      dispatch(
        actions.feedsDetails.success({
          feedDetailsItem: data.data,
        }),
      );
    } catch (e) {
      dispatch(actions.feedsDetails.failure());
    }
  }, []);

  return {
    state: {
      ...state,
    },
    actions: {
      getFeeds,
      getOthersFeeds,
      getSavedFeeds,
      createFeeds,
      feedsDetails,
    },
  };
});

export default useFeed;
