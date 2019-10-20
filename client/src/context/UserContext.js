import React from "react";
import Queries from "../../src/queries";
import { client } from '../index';
import { gql } from "apollo-boost";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function hasValueDeep(json, findValue) {
  const values = Object.values(json);
  const object = null;
  let hasValue = values.includes(findValue);
  values.forEach(function(value) {
      if (typeof value === "object") {
          hasValue = hasValue || hasValueDeep(value, findValue);
      }
  })
  return hasValue;
}

async function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  // let users = null;
  // Queries.getUsers().then(result => {users = result;});
  const users = await Queries.getUsers();
  const userList = users.data.allUsers.nodes;
  setIsLoading(true);

  if (!!login && !!password) {
    let loggedUser = userList.filter(user => user.email === login);
    console.log(loggedUser);
    if (loggedUser[0] && loggedUser[0].passwordHash === password) {
      setTimeout(() => {
        localStorage.setItem("id_token", loggedUser[0].id);
        dispatch({ type: "LOGIN_SUCCESS" });
        setError(null);
        
        history.push("/app/dashboard");
      }, 2000);
      return;

    } else {
      setIsLoading(false);
      setTimeout(() => {
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        
        history.push("/login");
      }, 2000);
    }
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
  setError(true);
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
