import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import { actionCreators as imageActions } from "./image";
import { actionCreators as userActions } from "./user";
import moment from "moment";

const LOAD = "post/LOAD";
const ADD = "post/ADD";
const EDIT = "post/EDIT";
const REMOVE = "post/REMOVE";
const LIKE = "post/LIKE";

const loadPost = createAction(LOAD, (list) => ({ list }));
const addPost = createAction(ADD, (post) => ({ post }));
const editPost = createAction(EDIT, (post) => ({ post }));
const removePost = createAction(REMOVE, (id) => ({ id }));
const likePost = createAction(LIKE, (id, isLike) => ({ id, isLike }));

const postDB = firestore.collection("post");

const loadPostFB =
  () =>
  (dispatch, getState, { history }) => {
    postDB.get().then((docs) => {
      const postList = [];
      docs.forEach((doc) => {
        postList.push({ ...doc.data(), id: doc.id });
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
          author: {
            id: user.id,
            name: user.name,
            profile: user.profile,
            uid: user.uid,
          },
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

const likePostFB = (id, isLike) => (dispatch, getState) => {
  const postList = getState().post.list;
  let likeCnt = postList[postList.findIndex((post) => post.id === id)].likeCnt;
  isLike ? (likeCnt += 1) : (likeCnt -= 1);
  postDB
    .doc(id)
    .update({
      likeCnt,
    })
    .then(() => {
      dispatch(likePost(id, isLike));
      dispatch(userActions.setLikeListFB(id, isLike));
    });
};

const loadOnePostFB = (id) => (dispatch, getState) => {
  postDB
    .doc(id)
    .get()
    .then((doc) => {
      const post = [{ ...doc.data(), id: doc.id }];
      dispatch(loadPost(post));
    });
};

const initialState = {
  list: [
    {
      id: "",
      author: {
        id: "",
        name: "",
        profile: "",
        uid: "",
      },
      imgUrl: "",
      content: "",
      layout: "",
      likeCnt: 0,
      commentCnt: 0,
      createdAt: "",
    },
  ],
  isUploading: false,
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
    [LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (post) => post.id === action.payload.id
        );
        if (action.payload.isLike) draft.list[idx].likeCnt += 1;
        else draft.list[idx].likeCnt -= 1;
      }),
  },
  initialState
);

export const actionCreators = {
  loadPostFB,
  addPostFB,
  likePostFB,
  loadOnePostFB,
};
export default reducer;
