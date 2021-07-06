import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import { actionCreators as imageActions } from "./image";
import moment from "moment";

const LOAD = "post/LOAD";
const ADD = "post/ADD";
const EDIT = "post/EDIT";
const REMOVE = "post/REMOVE";

const loadPost = createAction(LOAD, (list) => ({ list }));
const addPost = createAction(ADD, (post) => ({ post }));
const editPost = createAction(EDIT, (post) => ({ post }));
const removePost = createAction(REMOVE, (id) => ({ id }));

const postDB = firestore.collection("post");

const loadPostFB =
  () =>
  (dispatch, getState, { history }) => {
    postDB.get().then((docs) => {
      const postList = [];
      docs.forEach((doc) => {
        postList.push(doc.data());
      });
      dispatch(loadPost(postList));
    });
  };

const addPostFB =
  (post) =>
  (dispatch, getState, { history }) => {
    dispatch(imageActions.setUploading(true));
    const user = getState().user.user;
    const image = getState().image.preview;
    const { content, layout } = post;
    const time = new Date().getTime();
    storage
      .ref(`images/${user.id}_${time}`)
      .putString(image, "data_url")
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        const postData = {
          author: user,
          imgUrl: url,
          content,
          layout,
          likeCnt: 0,
          commentCnt: 0,
          createdAt: moment(time).format("YYYY-MM-DD hh:mm:ss"),
        };
        return postDB.add(postData);
      })
      .then((docRef) => {
        docRef.get().then((doc) => {
          const newPost = {
            ...doc.data(),
            id: doc.id,
          };
          dispatch(addPost(newPost));
          dispatch(imageActions.setUploading(false));
          dispatch(imageActions.setPreview(null));
          alert("작성되었습니다.");
          history.push(`/detail/${doc.id}`);
        });
      });
  };

const initialState = {
  list: [
    {
      id: "blahblahblah",
      author: {
        id: "breadman@breadman.shop",
        name: "breadman",
        profile: "https://i.imgur.com/vlFwCsZ.jpg",
        uid: "O1BotlI5dVOQgssC626tcUYnYV62",
      },
      imgUrl: "https://i.imgur.com/vlFwCsZ.jpg",
      content: "빵이 너무 귀여워요~",
      layout: "bottom",
      likeCnt: 0,
      commentCnt: 0,
      createdAt: "2021-07-05 18:33:32",
    },
  ],
};

const reducer = handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[
          draft.list.findIndex((post) => post.id === action.payload.post.id)
        ] = action.post;
      }),
    [REMOVE]: (state, action) =>
      produce(state, (draft) => {
        draft.list.splice(
          draft.list.findIndex((post) => post.id === action.payload.id),
          1
        );
      }),
  },
  initialState
);

export const actionCreators = {
  loadPostFB,
  addPostFB,
};
export default reducer;
