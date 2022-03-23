import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import AppInner from './AppInner';
import { Reset } from 'styled-reset';

const App = () => {
  return (
    <Provider store={store}>
      <Reset />
      <AppInner></AppInner>
    </Provider>
  );
};

export default App;
