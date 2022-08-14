import { createSlice } from "@reduxjs/toolkit";
import { selectAuth } from "../selector";

const initialState = {
  isAuthorized: false,
  token: null,
  error: null,
  statut: "void",
};

// configureStore({
//     name: "auth",
//     initialState,
//     reducer: {
//         fetching:
//     }
// })

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
        console.log("porut");
        // setVoidIfUndefined(draft, action.payload.credentials);
        // if (draft.statut === "pending" || draft.statut === "updating") {
        draft.token = action.payload.token;
        draft.isAuthorized = true;
        draft.statut = "resolved";
        return;
        // }
      },
    },
    logout: {
      prepare: () => ({
        payload: { initialState },
      }),
      reducer: (draft, action) => {
        console.log("logout");
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

const { authFetching, authResolved, authRejected } = { actions };

export function fetchUser(credentials) {
  console.log("blabla");
  return async (dispatch, getState) => {
    console.log("caca prout");
    dispatch(actions.fetching(credentials));
    const status = selectAuth(getState()).status;
    if (status === "pending" || status === "updating") {
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const token = await response.json();
      dispatch(actions.resolved(credentials, token.body.token));
      if (credentials.rememberMe) {
        localStorage.setItem("token", token.body.token);
      }
      // console.log(token);
    } catch (error) {
      dispatch(actions.rejected(credentials, error));
    }
  };
}

export function setUserAuthorization() {
  console.log("poulowkdsjadijiowej");
  const token = localStorage.getItem("token");

  if (token !== null) {
    console.log(token);

    return async (dispatch, getState) => {
      console.log("get inside the function ");
      dispatch(actions.set(token));
    };
  }
}

export function setlogout() {
  console.log("nahhhh");
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
