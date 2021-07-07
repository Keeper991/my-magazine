import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import firebase, { auth, firestore } from "../../shared/firebase";

const LOAD = "user/LOAD";
const SET = "user/SET";
const SIGNOUT = "user/SIGNOUT";
const SIGNING = "user/SIGNING";
const LIKE = "user/LIKE";

const loadUser = createAction(LOAD, (user) => ({ user }));
const setUser = createAction(SET, (user) => ({ user }));
const signOut = createAction(SIGNOUT, () => ({}));
const setSigning = createAction(SIGNING, (isSigning) => ({ isSigning }));
const setLikeList = createAction(LIKE, (postId, isLike) => ({
  postId,
  isLike,
}));

const userDB = firestore.collection("user");

const signInFB =
  ({ id, pw }) =>
  (dispatch, getState, { history }) => {
    dispatch(setSigning(true));
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return auth.signInWithEmailAndPassword(id, pw);
      })
      .then((user) => {
        return userDB.doc(user.user.uid).get();
      })
      .then((doc) => {
        dispatch(setUser({ ...doc.data(), uid: doc.id }));
        dispatch(setSigning(false));
        alert("로그인 되었습니다.");
        history.replace("/");
      })
      .catch((e) => {
        dispatch(setSigning(true));
        alert("로그인에 실패했습니다.");
      });
  };

const signOutFB =
  () =>
  (dispatch, getState, { history }) => {
    auth.signOut().then(() => {
      dispatch(signOut());
      alert("로그아웃 되었습니다.");
      history.push("/");
    });
  };

const signUpFB =
  ({ id, pw, name }) =>
  (dispatch, getState, { history }) => {
    dispatch(setSigning(true));
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => auth.createUserWithEmailAndPassword(id, pw))
      .then(() =>
        auth.currentUser.updateProfile({
          displayName: name,
        })
      )
      .then(() => {
        const userData = {
          id,
          name,
          profile: "",
          likeList: [],
          commentList: [],
        };
        return userDB.doc(auth.currentUser.uid).set(userData);
      })
      .then(() => {
        dispatch(setUser({ id, name, profile: "", uid: auth.currentUser.uid }));
        alert("회원가입이 완료되었습니다.");
        dispatch(setSigning(true));
        history.push("/");
      })
      .catch((e) => {
        alert(e.code, e.message);
      });
  };

const signInCheckFB =
  () =>
  (dispatch, geState, { history }) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        userDB
          .doc(user.uid)
          .get()
          .then((userData) => {
            dispatch(setUser({ ...userData.data() }));
          });
      } else {
        dispatch(signOut());
      }
    });
  };

const setLikeListFB = (postId, isLike) => (dispatch, getState) => {
  const likeList = getState().user.user.likeList;
  const newList = [...likeList];
  isLike ? newList.push(postId) : newList.splice(newList.indexOf(postId), 1);

  userDB
    .doc(auth.currentUser.uid)
    .update({
      likeList: newList,
    })
    .then(() => {
      dispatch(setLikeList(postId, isLike));
    });
};

const initialState = {
  user: {
    id: "",
    name: "",
    profile: "",
    uid: "",
    likeList: [],
    commentList: [],
  },
  isSignIn: false,
  isSigning: false,
};

const reducer = handleActions(
  {
    [LOAD]: (state, action) => produce(state, (draft) => {}),
    [SET]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isSignIn = true;
      }),
    [SIGNOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = initialState;
        draft.isSignIn = false;
      }),
    [SIGNING]: (state, action) =>
      produce(state, (draft) => {
        draft.isSigning = action.payload.isSigning;
      }),
    [LIKE]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.isLike) {
          draft.user.likeList.push(action.payload.postId);
        } else {
          draft.user.likeList.splice(
            draft.user.likeList.indexOf(action.payload.postId),
            1
          );
        }
      }),
  },
  initialState
);

export const actionCreators = {
  loadUser,
  setUser,
  signOut,
  signUpFB,
  signInFB,
  signOutFB,
  signInCheckFB,
  setLikeListFB,
};
export default reducer;
