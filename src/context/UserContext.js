import { createContext, useReducer, useContext, useEffect } from "react";
import FetchApi from "../services/FetchApi";
const UserStateContext = createContext();
const UserDispatchContext = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        fullname: action.payload.fullname,
      };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false, fullname: "" };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false, fullname: "" };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const token = localStorage.getItem("token");
  const [state, dispatch] = useReducer(userReducer, {
    isAuthenticated: !!token,
    fullname: localStorage.getItem("fullname") || "",
  });
  const FetchData = async () => {
    const response = await FetchApi(token, "en", "checkToken");
    if (!response.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("fullname");
      dispatch({
        type: "SIGN_OUT_SUCCESS",
      });
    }
  };
  useEffect(() => {
    async function fetchData() {
      if (!!token) await FetchData();
    }
    fetchData();
  }, []);
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

async function loginUser(
  lang,
  dispatch,
  username,
  password,
  navigate,
  setIsLoading,
  setError
) {
  setError(false);
  setIsLoading(true);

  const response = await FetchApi(null, lang, "login", { username, password });
  if (response.success) {
    const fullname =
      response.dataBody.admin.firstname +
      " " +
      response.dataBody.admin.lastname;
    localStorage.setItem("token", response.dataBody.token);
    localStorage.setItem("fullname", fullname);
    setIsLoading(false);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        fullname,
      },
    });
    navigate("/app/dashboard");
  } else {
    setError(response.message);
    setIsLoading(false);
  }
}

function signOut(dispatch, navigate) {
  localStorage.removeItem("token");
  localStorage.removeItem("fullname");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  navigate("/login");
}
