import React from "react";
import User from "../../src/models/User";

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
    name: localStorage.getItem("user_name"),
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

async function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  const users = await User.getUsers();
  const userList = users.data.allUsers.nodes;
  setIsLoading(true);

  if (!!login && !!password) {
    let loggedUser = userList.filter(user => user.email === login);
    if (loggedUser[0] && loggedUser[0].passwordHash === password) {
      localStorage.setItem("id_token", loggedUser[0].id);
      localStorage.setItem("user_name", loggedUser[0].name);
      setTimeout(() => {
        console.log(localStorage, loggedUser);
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
