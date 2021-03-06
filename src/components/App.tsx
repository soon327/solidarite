import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import GlobalStyles from '../styles/GlobalStyles';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/:tab" component={DetailPage} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
