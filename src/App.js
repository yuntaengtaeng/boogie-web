import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import AppInner from './AppInner';

const App = () => {
  return (
    <Provider store={store}>
      <AppInner></AppInner>
    </Provider>
  );
};

export default App;
