import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import firebase, { auth } from "../../shared/firebase";

const LOAD = "user/LOAD";
const SET = "user/SET";
const SIGNOUT = "user/SIGNOUT";

const loadUser = createAction(LOAD, (user) => ({ user }));
const setUser = createAction(SET, (user) => ({ user }));
const signOut = createAction(SIGNOUT, () => ({}));

const signInFB =
  ({ id, pw }) =>
  (dispatch, getState, { history }) => {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return auth.signInWithEmailAndPassword(id, pw);
      })
      .then((user) => {
        const {
          id,
          displayName: name,
          user: { uid },
          photoURL: profile,
        } = user;
        dispatch(setUser({ id, name, profile, uid }));
        alert("로그인 되었습니다.");
        history.replace("/");
      });
  };

const signOutFB =
  () =>
  (dispatch, getState, { history }) => {
    auth.signOut().then(() => {
      dispatch(signOut());
      history.push("/");
    });
  };

const signUpFB =
  ({ id, pw, name }) =>
  (dispatch, getState, { history }) => {
    auth
      .createUserWithEmailAndPassword(id, pw)
      .then(() => {
        return auth.currentUser.updateProfile({
          displayName: name,
        });
      })
      .then(() => {
        alert("회원가입이 완료되었습니다.");
        dispatch(setUser({ id, name, profile: "", uid: auth.currentUser.uid }));
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
        const signInUser = {
          id: user.email,
          name: user.displayName,
          profile: user.photoURL,
          uid: user.uid,
        };
        dispatch(setUser(signInUser));
      } else {
        dispatch(signOut());
      }
    });
  };

const initialState = {
  user: null,
  isSignIn: false,
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
        draft.user = null;
        draft.isSignIn = false;
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
};
export default reducer;
