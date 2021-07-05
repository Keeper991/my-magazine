import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const LOAD = "LOAD";

const loadUser = createAction(LOAD, (data) => ({ data }));

const reducer = handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        console.log("load in user");
      }),
  },
  { user: "john" }
);

export const actionCreators = { loadUser };
export default reducer;
