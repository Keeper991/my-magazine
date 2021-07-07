import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const UPLOADING = "image/UPLOADING";
const SET_PREVIEW = "image/SET_PREVIEW";
const CHANGED = "image/CHANGED";

const setUploading = createAction(UPLOADING, (isUploading) => ({
  isUploading,
}));
const setPreview = createAction(SET_PREVIEW, (img) => ({ img }));
const setChanged = createAction(CHANGED, (isChanged) => ({ isChanged }));

const initialState = {
  isUploading: false,
  preview: null,
  isChanged: false,
};

const reducer = handleActions(
  {
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isUploading = action.payload.isUploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.img;
      }),
    [CHANGED]: (state, action) =>
      produce(state, (draft) => {
        draft.isChanged = action.payload.isChanged;
      }),
  },
  initialState
);

export const actionCreators = { setUploading, setPreview, setChanged };
export default reducer;
