import { createAction, createReducer } from "@reduxjs/toolkit";
import { selectUser } from "../selector";

const initialState = {
  status: "void",
  isAuthorized: false,
  data: null,
  error: null,
};

const userFetching = createAction("user/fetching");
const userResolved = createAction("user/resolved");
const userRejected = createAction("user/rejected");

// console.log(selectUser(store.getState()));

export async function fetchOrUpdateUser(store, uid) {
  const status = selectUser(store.getState()).status;
  if (status === "pending" || status === "updating") {
    return;
  }
  // let isLoggedIn = false;
  store.dispatch(userFetching());
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(uid),
    });
    const token = await response.json();
    localStorage.setItem("token", token.body.token);
    let mytoken = token.body.token;

    try {
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          Authorization: "Bearer" + mytoken,
          accept: "application/json",
        },
        // body: JSON.stringify(uid),
      });
      const data = await res.json();
      store.dispatch(userResolved(data.body));
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    store.dispatch(userRejected(error));
  }
  console.log(selectUser(store.getState()));
}

function setVoidIfUndefined(draft, token) {
  if (draft[token] === undefined) {
    draft[token] = { status: "void" };
  }
}

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(userFetching, (draft, action) => {
      setVoidIfUndefined(draft, action.payload);
      if (draft.status === "void") {
        draft.status = "pending";
        return;
      }
      if (draft.status === "rejected") {
        draft.error = null;
        draft.status = "pending";
        return;
      }
      if (draft.status === "resolved") {
        draft.status = "updating";
        draft.isAuthorized = false;
        return;
      }
      return;
    })
    .addCase(userResolved, (draft, action) => {
      setVoidIfUndefined(draft, action);
      if (draft.status === "pending" || draft.status === "updating") {
        draft.status = "resolved";
        draft.isAuthorized = true;
        draft.data = action.payload;
        return;
      }
      return;
    })
    .addCase(userRejected, (draft, action) => {
      setVoidIfUndefined(draft, action);
      if (draft.status === "pending" || draft.status === "updating") {
        draft.status = "rejected";
        draft.error = action.payload;
        return;
      }
      return;
    });
});
