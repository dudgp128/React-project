import { createAction, handleActions } from 'redux-actions';

const SAPMLE_ACTION = 'auth/SAMPLE_ACTION';

export const sampleAction = createAction(SAPMLE_ACTION);

const initialState = {};

const auth = handleActions(
  {
    [SAPMLE_ACTION]: (state, action) => state,
  },
  initialState,
);
export default auth;
