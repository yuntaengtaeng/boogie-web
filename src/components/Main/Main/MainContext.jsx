import React, { useReducer, createContext, useContext } from 'react';

const init = {
  isModalShowing: false,
  options: {
    name: '',
    plattform: [],
    technology: [],
    classId: {},
    year: new Date(),
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

    case 'YEAR_CHANGE': {
      clone.options.year = action.date;
      return clone;
    }

    case 'OVERWRITE': {
      clone.options.name = action.name;
      clone.options.plattform = action.plattform;
      clone.options.technology = action.technology;
      clone.options.classId = action.classId;
      return clone;
    }

    case 'REMOVE_NAME': {
      clone.options.name = '';
      return clone;
    }

    case 'REMOVE_PLATTFORM': {
      clone.options.plattform = clone.options.plattform.filter(
        (v) => v !== action.item
      );
      return clone;
    }

    case 'REMOVE_TECHNOLOGY': {
      clone.options.technology = clone.options.technology.filter(
        (v) => v !== action.item
      );
      return clone;
    }

    case 'REMOVE_CLASSID': {
      clone.options.classId = {};
      return clone;
    }

    default: {
      return clone;
    }
  }
};

const MainStateContext = createContext();
const MainDispatchContext = createContext();

const MainContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFn, init);
  return (
    <MainStateContext.Provider value={state}>
      <MainDispatchContext.Provider value={dispatch}>
        {children}
      </MainDispatchContext.Provider>
    </MainStateContext.Provider>
  );
};

export const useMainState = () => {
  return useContext(MainStateContext);
};

export const useMainDispatch = () => {
  return useContext(MainDispatchContext);
};

export default MainContext;
