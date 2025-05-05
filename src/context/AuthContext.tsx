import React, { createContext, useReducer } from "react";
import { AuthAction, AuthContextType, SigninType } from "../Type";
import { FakeUser } from "../utils/fakeUser";
import { useNavigate } from "react-router";

const initialState = {
  isAuthenticated: false,
  isPending: false,
  user: null,
  errorText: "",
  handleLogin: async () => Promise.resolve(),
  handleLogout: async () => Promise.resolve()
};

const AuthContext = createContext<AuthContextType>(initialState);

function reducer(state: AuthContextType, action: AuthAction) {
  switch (action.type) {
    case "loading":
      return { ...state, isPending: true };
    case "loggedIn":
      return {
        ...state,
        isPending: false,
        user: action.payload,
        isAuthenticated: true,
        errorText: ""
      };
    case "error":
      return {
        ...state,
        isPending: false,
        isAuthenticated: false,
        user: null,
        errorText: "Invalid email or password"
      };
    case "logout":
      return { ...state, isPending: false, isAuthenticated: false, user: null };
    default:
      throw new Error("Unknown action type");
  }
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ isPending, user, errorText, isAuthenticated }, dispatch] =
    useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }: SigninType) => {
    dispatch({ type: "loading" });
    if (email === FakeUser.email && password === FakeUser.password) {
      dispatch({ type: "loggedIn", payload: FakeUser });
      navigate("/app/cities");
    } else {
      dispatch({ type: "error" });
    }
  };

  const handleLogout = async () => {
    dispatch({ type: "logout" });
    navigate("/");
  };

  const values = {
    handleLogin,
    isAuthenticated,
    isPending,
    user,
    errorText,
    handleLogout
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
