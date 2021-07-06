import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const UPLOADING = "image/UPLOADING";
const SET_PREVIEW = "image/SET_PREVIEW";

const setUploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const setPreview = createAction(SET_PREVIEW, (img) => ({ img }));

const initialState = {
  uploading: false,
  preview: null,
};

const reducer = handleActions(
  {
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.img;
      }),
  },
  initialState
);

export const actionCreators = { setUploading, setPreview };
export default reducer;
