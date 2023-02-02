import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [READ_POST, READ_POST_SUCCES, READ_POST_FAILURE] =
  createRequestActionTypes('post/READ_POST');

// UNLOAD_POST : 포스트 페이지를 벗어날 때, 리덕스 상태의 데이터 비우기
// -> 또 다른 포스트를 읽을때, 이전에 불러온 포스트가 나타나는 깜박임 현상 방지
const UNLOAD_POST = 'post/UNLOAD_POST';

export const readPost = createAction(READ_POST, (id) => id);

export const unloadPost = createAction(UNLOAD_POST);

const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

const initialState = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [READ_POST_SUCCES]: (state, { payload: post }) => ({
      ...state,
      post,
    }),

    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default post;
