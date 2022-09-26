import React, { useReducer, createContext, useContext } from 'react';

const init = {
  list: [],
  selectedUser: {},
};

const reducerFn = (state, action) => {
  const clone = { ...state };

  switch (action.type) {
    case 'SET_LIST': {
      clone.list = action.list;
      return clone;
    }

    case 'SET_USER': {
      clone.selectedUser = { ...action.user };
      return clone;
    }

    case 'INIT_USER': {
      clone.selectedUser = {};
      return clone;
    }

    default: {
      return clone;
    }
  }
};

const UserManagementStateContext = createContext();
const UserManagementDispatchContext = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFn, init);

  return (
    <UserManagementStateContext.Provider value={state}>
      <UserManagementDispatchContext.Provider value={dispatch}>
        {children}
      </UserManagementDispatchContext.Provider>
    </UserManagementStateContext.Provider>
  );
};

export const useUserManagementState = () => {
  return useContext(UserManagementStateContext);
};

export const useUserManagementDispatch = () => {
  return useContext(UserManagementDispatchContext);
};

export default Context;
