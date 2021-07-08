import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { auth, firestore, storage } from "../../shared/firebase";
import { actionCreators as imageActions } from "./image";
import { actionCreators as userActions } from "./user";
import moment from "moment";

const LOAD = "post/LOAD";
const ADD = "post/ADD";
const EDIT = "post/EDIT";
const REMOVE = "post/REMOVE";
const LIKE = "post/LIKE";
const UPLOADING = "post/UPLOADING";
const LOADING = "post/LOADING";

const loadPost = createAction(LOAD, (list, paging) => ({ list, paging }));
const addPost = createAction(ADD, (post) => ({ post }));
const editPost = createAction(EDIT, (post) => ({ post }));
const removePost = createAction(REMOVE, (id) => ({ id }));
const likePost = createAction(LIKE, (postId, userId, isLike) => ({
  postId,
  userId,
  isLike,
}));
const setUploading = createAction(UPLOADING, (isUploading) => ({
  isUploading,
}));
const setLoading = createAction(LOADING, (isLoading) => ({ isLoading }));

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
      likeList: [],
      commentList: [],
      createdAt: "",
    },
  ],
  isUploading: false,
  paging: {
    start: null,
    end: null,
    size: 3,
  },
  isLoading: false,
};

const postDB = firestore.collection("post");

const loadPostFB =
  (start) =>
  (dispatch, getState, { history }) => {
    const { paging } = getState().post;

    if (paging.start && !paging.end) {
      return;
    }
    dispatch(setLoading(true));

    let query = postDB.orderBy("createdAt", "desc");
    if (start) {
      query = query.startAt(start);
    }
    query
      .limit(paging.size + 1)
      .get()
      .then((docs) => {
        let nextPaging = {
          start: docs.docs[0],
          end:
            docs.docs.length === paging.size + 1
              ? docs.docs[paging.size]
              : null,
          size: paging.size,
        };

        const postList = [];
        docs.forEach((doc) => {
          postList.push({ ...doc.data(), id: doc.id });
        });
        if (docs.docs.length === paging.size + 1) postList.pop();
        dispatch(loadPost(postList, nextPaging));
      });
  };

const addPostFB =
  (post) =>
  (dispatch, getState, { history }) => {
    dispatch(setUploading(true));
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
            uid: auth.currentUser.uid,
          },
          imgUrl: url,
          content,
          layout,
          likeList: [],
          commentList: [],
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
          dispatch(setUploading(false));
          alert("작성되었습니다.");
          history.push(`/`);
        });
      });
  };

const editPostFB =
  (postId, post) =>
  (dispatch, getState, { history }) => {
    dispatch(setUploading(true));
    const uid = getState().user.user.uid;
    const { content, layout } = post;
    const time = new Date().getTime();
    if (getState().image.isChanged) {
      const image = getState().image.preview;
      storage
        .ref(`images/${uid}_${time}`)
        .putString(image, "data_url")
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          dispatch(imageActions.setPreview(url));
          return postDB.doc(postId).update({
            imgUrl: url,
            content,
            layout,
          });
        })
        .then(() => {
          const curPost = getState().post.list.find(
            (post) => post.id === postId
          );
          const newPost = {
            ...curPost,
            imgUrl: getState().image.preview,
            content,
            layout,
          };
          dispatch(editPost(newPost));
          dispatch(setUploading(false));
          alert("작성되었습니다.");
          history.push(`/`);
        });
    } else {
      postDB
        .doc(postId)
        .update({
          content,
          layout,
        })
        .then(() => {
          const curPost = getState().post.list.find(
            (post) => post.id === postId
          );
          const newPost = { ...curPost, content, layout };
          dispatch(editPost(newPost));
          dispatch(setUploading(false));
          alert("작성되었습니다.");
          history.push(`/`);
        });
    }
  };

const likePostFB =
  (postId, userId, prevLikeList, isLike) => (dispatch, getState) => {
    const likeList = [...prevLikeList];
    isLike
      ? likeList.push(userId)
      : likeList.splice(likeList.indexOf(userId), 1);
    postDB
      .doc(postId)
      .update({
        likeList,
      })
      .then(() => {
        dispatch(likePost(postId, userId, isLike));
        dispatch(userActions.setLikeListFB(postId, isLike));
      });
  };

const loadOnePostFB =
  (id) =>
  (dispatch, getState, { history }) => {
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.data()) {
          const post = [{ ...doc.data(), id: doc.id }];
          dispatch(loadPost(post, initialState.paging));
        }
      });
  };

const removePostFB =
  (id) =>
  (dispatch, getState, { history }) => {
    postDB
      .doc(id)
      .delete()
      .then(() => {
        alert("삭제되었습니다.");
        dispatch(removePost(id));
        history.replace("/");
      });
  };

const reducer = handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        if (draft.list.length < 2) draft.list = action.payload.list;
        else draft.list.push(...action.payload.list);
        draft.paging = action.payload.paging;
        draft.isLoading = false;
      }),
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (post) => post.id === action.payload.post.id
        );
        draft.list[idx] = action.payload.post;
      }),
    [REMOVE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (post) => post.id === action.payload.id
        );
        draft.list.splice(idx, 1);
      }),
    [LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (post) => post.id === action.payload.postId
        );
        if (action.payload.isLike)
          draft.list[idx].likeList.push(action.payload.userId);
        else
          draft.list[idx].likeList.splice(
            draft.list[idx].likeList.indexOf(action.payload.userId),
            1
          );
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isUploading = action.payload.isUploading;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialState
);

export const actionCreators = {
  loadPostFB,
  addPostFB,
  likePostFB,
  loadOnePostFB,
  editPostFB,
  removePostFB,
};
export default reducer;
