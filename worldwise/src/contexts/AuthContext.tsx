import { createContext, useContext, useReducer, ReactNode } from "react";
import { state, user, action } from "./types";

const FAKE_USER: user = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext<{
  user: user | null;
  isAuthenticated: boolean;
  logout: () => void;
  Login: (email: string, password: string) => void;
}>({
  user: null,
  isAuthenticated: false,
  logout: () => {},
  Login: () => {},
});
const initialState: state = {
  isAuthenticated: false,
  user: null,
};
function reducer(state: state, action: action) {
  switch (action.type) {
    case "login":
      return { ...state, user: FAKE_USER, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("Unknown action");
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function Login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout, Login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
}
