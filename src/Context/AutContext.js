import AutReducer from "./AutReducer";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  usuario: JSON.parse(localStorage.getItem("usuario")) || null,
  isFetching: false,
  error: false,
};

export const AutContext = createContext(INITIAL_STATE);
export const AutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AutReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("usuario", JSON.stringify(state.usuario));
  }, [state.usuario]);

  return (
    <AutContext.Provider
      value={{
        usuario: state.usuario,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AutContext.Provider>
  );
};
