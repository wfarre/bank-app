import { createSlice } from "@reduxjs/toolkit";
import { selectUser } from "../selector";

const initialState = {
  status: "void",
  isAuthorized: false,
  data: null,
  error: null,
};

const { actions, reducer } = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetching: {
      prepare: () => ({
        payload: {},
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.token);
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
          draft.data = null;
          return;
        }
        return;
      },
    },
    resolved: {
      prepare: (data) => ({
        payload: { data },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.token);
        if (draft.status === "pending" || draft.status === "updating") {
          draft.status = "resolved";
          draft.isAuthorized = true;
          draft.data = action.payload.data;
          return;
        }
        return;
      },
    },
    rejected: {
      prepare: (error) => ({
        payload: { error },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.token);
        if (draft.status === "pending" || draft.status === "updating") {
          draft.status = "rejected";
          draft.error = action.payload.error;
          return;
        }
        return;
      },
    },
  },
});

export function fetchOrUpdateUser(token) {
  return async (dispatch, getState) => {
    dispatch(actions.fetching());
    console.log("cacao");

    // const status = selectUser(getState()).status;
    // if (status === "pending" || status === "updating") {
    //   return;
    // }
    // console.log("hey");

    try {
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          Authorization: "Bearer" + token,
          accept: "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch(actions.resolved(data.body));
    } catch (err) {
      dispatch(actions.rejected(err));

      console.log(err);
    }
    console.log(selectUser(getState()));
  };
}

export function updateUser(newName, token) {
  return async (dispatch, getState) => {
    dispatch(actions.fetching());
    console.log(token);

    try {
      console.log(newName);
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          Authorization: "Bearer" + token,
          "content-type": "application/json",
        },
        body: JSON.stringify(newName),
      });
      const data = await res.json();
      console.log(data);
      dispatch(actions.resolved(data.body));
    } catch (err) {
      console.log(err);
      dispatch(actions.rejected(err));
    }
  };
}

function setVoidIfUndefined(draft, token) {
  if (draft[token] === undefined) {
    draft[token] = { status: "void" };
  }
}

export default reducer;
