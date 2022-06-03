import './App.css';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import AppInner from './AppInner';
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 
    ${reset}
    body {
      font-family: Noto Sans CJK KR
    }
`;

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <AppInner></AppInner>
    </Provider>
  );
};

export default App;
