import { createSlice } from "@reduxjs/toolkit";

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

/**
 * The function gets all the user's data from a token.
 * @param jwtToken
 * @dispatch user's data
 * @dispatch error if there's an error
 */
export function fetchOrUpdateUser(token) {
  return async (dispatch, getState) => {
    dispatch(actions.fetching());
    try {
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          Authorization: "Bearer" + token,
          accept: "application/json",
        },
      });
      const data = await res.json();
      dispatch(actions.resolved(data.body));
    } catch (err) {
      dispatch(actions.rejected(err));
      console.log(err);
    }
  };
}

/**
 * The function allows to update the name of the user.
 * @param userName
 * @param token
 * @dispatch the new name of the user in the database
 * @dispatch an error, if there is any
 */
export function updateUser(newName, token) {
  return async (dispatch, getState) => {
    dispatch(actions.fetching());
    try {
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          Authorization: "Bearer" + token,
          "content-type": "application/json",
        },
        body: JSON.stringify(newName),
      });
      const data = await res.json();
      dispatch(actions.resolved(data.body));
    } catch (err) {
      console.log(err);
      dispatch(actions.rejected(err));
    }
  };
}

function setVoidIfUndefined(draft, token) {
  if (draft === undefined) {
    draft = { status: "void" };
  }
}

export default reducer;
