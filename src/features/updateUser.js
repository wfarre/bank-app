import { createAction, createReducer } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectUser } from "../selector";
import { useDispatch } from "react-redux";

// const initialState = {
//   status: "void",
//   isAuthorized: false,
//   data: null,
//   error: null,
// };

// const userFetching = createAction("user/fetching");
// const userResolved = createAction("user/resolved");
// const userRejected = createAction("user/rejected");

export async function updateUser(newName) {
  // const dispatch = useDispatch();

  const token = localStorage.getItem("token");
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
      // body: JSON.stringify({
      //   firstName: newName.firstName,
      //   lastName: newName.lastName,
      // }),
    });
    const data = await res.json();
    console.log(data);
    // store.dispatch(userResolved(data.body));
  } catch (err) {
    console.log(err);
    // store.dispatch(userRejected(error));
  }
  // dispatch(fetchOrUpdateUser(token));
}

// function setVoidIfUndefined(draft, token) {
//   if (draft[token] === undefined) {
//     draft[token] = { status: "void" };
//   }
// }

// export default createReducer(initialState, (builder) => {
//   return builder.addCase(userFetching, (draft, action) => {});
// });
