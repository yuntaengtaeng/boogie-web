import React, { useReducer, createContext, useContext } from 'react';

const init = {
  isModalShowing: false,
  options: {
    region: [],
    position: [],
  },
};

const reducerFn = (state, action) => {
  const clone = { ...state };

  switch (action.type) {
    case 'OPEN': {
      clone.isModalShowing = true;
      return clone;
    }

    case 'CLOSE': {
      clone.isModalShowing = false;
      return clone;
    }

    case 'OVERWRITE': {
      clone.options.position = action.position;
      clone.options.region = action.region;
      return clone;
    }

    case 'OPTIONS_REMOVE': {
      const { [action.key]: target } = clone.options;

      clone.options[action.key] = target.filter(
        (option) => option.value !== action.value
      );

      return clone;
    }

    default: {
      return clone;
    }
  }
};

const JobStateContext = createContext();
const JobDispatchContext = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFn, init);

  return (
    <JobStateContext.Provider value={state}>
      <JobDispatchContext.Provider value={dispatch}>
        {children}
      </JobDispatchContext.Provider>
    </JobStateContext.Provider>
  );
};

export const useJobState = () => {
  return useContext(JobStateContext);
};

export const useJobDispatch = () => {
  return useContext(JobDispatchContext);
};

export default Context;
