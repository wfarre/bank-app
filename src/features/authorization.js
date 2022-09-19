import { createSlice } from "@reduxjs/toolkit";
import { selectAuth } from "../selector";

const initialState = {
  isAuthorized: false,
  token: null,
  error: null,
  statut: "void",
};

const { actions, reducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetching: {
      prepare: (credentials) => ({
        payload: { credentials },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.credentials);
        if (draft.statut === "void") {
          draft.statut = "pending";
          return;
        }
        if (draft.statut === "rejected") {
          draft.error = null;
          draft.statut = "pending";
          return;
        }
        if (draft.statut === "resolved") {
          draft.statut = "updating";
          return;
        }
      },
    },
    resolved: {
      prepare: (credentials, data) => ({
        payload: { credentials, data },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.credentials);
        if (draft.statut === "pending" || draft.statut === "updating") {
          draft.token = action.payload.data;
          draft.isAuthorized = true;
          draft.statut = "resolved";
          return;
        }
      },
    },
    rejected: {
      prepare: (credentials, error) => ({
        payload: { credentials, error },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.credentials);
        if (draft.statut === "pending" || draft.statut === "updating") {
          draft.error = action.payload.error;
          draft.statut = "rejected";
          return;
        }
      },
    },
    set: {
      prepare: (token) => ({
        payload: { token },
      }),
      reducer: (draft, action) => {
        draft.token = action.payload.token;
        draft.isAuthorized = true;
        draft.statut = "resolved";
        return;
      },
    },
    logout: {
      prepare: () => ({
        payload: { initialState },
      }),
      reducer: (draft, action) => {
        draft.token = null;
        draft.isAuthorized = false;
        draft.statut = "void";
        draft.error = null;
        return;
        // }
      },
    },
  },
});

/**
 * The user enters his/her credentials and the function will return
 * the right token. Then, it will update the reducer and set
 * the token in the local storage.
 * @param credentials(email address, password)
 * */
export function fetchUser(credentials) {
  return async (dispatch, getState) => {
    dispatch(actions.fetching(credentials));
    const status = selectAuth(getState()).status;
    if (status === "pending" || status === "updating") {
      return;
    }
    await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then(
        (response) => {
          if (response.status === 200) {
            dispatch(actions.resolved(credentials, response.body.token));
            if (credentials.rememberMe) {
              localStorage.setItem("token", response.body.token);
              localStorage.setItem(
                "lastLoginTime",
                new Date(Date.now()).getTime()
              );
            }
          }
          if (response.status === 400) {
            dispatch(actions.rejected(credentials, response.message));
          }
        },
        (error) => {
          dispatch(actions.rejected(credentials, error));
        }
      );
  };
}

/**
 * if the user decided to stay connected, the function will
 * retrieve the jwtToken from the local storage.
 * @returns an async function which will dispatch the token
 */
export function setUserAuthorization() {
  const token = localStorage.getItem("token");

  if (token !== null) {
    return async (dispatch, getState) => {
      dispatch(actions.set(token));
    };
  }
}

/**
 * The function will log out the user.
 * @returns an async function which reset the authorization reducer to its initial state
 * and remove the token from the local storage
 */
export function setlogout() {
  return async (dispatch, getState) => {
    dispatch(actions.logout());
    localStorage.removeItem("token");
  };
}

function setVoidIfUndefined(draft, credentials) {
  if (draft[credentials] === undefined) {
    draft[credentials] = { status: "void" };
  }
}

export default reducer;
