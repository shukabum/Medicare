import React from "react";
const getLoginState = () => {
  const storedLogin = localStorage.getItem("login");
  return storedLogin === "true";
};
const defaultGlobalState = {
  log: getLoginState(),
  emai: "",
  name: "",
};
export const globalStateContext = React.createContext(defaultGlobalState);
export const dispatchStateContext = React.createContext(undefined);

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
        switch (action.type) {
          case "LOGIN":
            return {
              ...state,
              log: true,
            };
          case "LOGOUT":
            return {
              ...state,
              log: false,
            };
          default:
            return state;
        };

      },
    defaultGlobalState
  );
  // console.log("State in authctx:", state.log); 
  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {children}
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};

export const useGlobalState = () => [
  React.useContext(globalStateContext),
  React.useContext(dispatchStateContext)
];
