import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const LOAD = "LOAD";

const loadPost = createAction(LOAD, (data) => ({ data }));

const reducer = handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        console.log("load in post");
      }),
  },
  { user: "john" }
);

export const actionCreators = { loadPost };
export default reducer;
