import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router-dom';

import Menu from '@App/components/Menu';

import Home from './views/Home';
import General from './views/General';
import Nutrition from './views/Nutrition';
import Other from './views/Other';

interface ActionProps {
}

type AppProps = ActionProps;

interface AppState {

}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    height: 100vh;
    background-color: #F9F9F9;
    font-family: sans-serif;
  }
`;

const AppContainer = styled.div`
  width: 100%;
  height: 95%;
  position: relative;
  margin-bottom: 20px;
`;

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
  }
  componentDidMount() {
  }

  public render() {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Menu />
          <Route exact={true} path="/" component={Home} />
          <Route path="/general" component={General} />
          <Route path="/nutrition" component={Nutrition} />
          <Route path="/other" component={Other} />
        </AppContainer>
      </>
    );
  }
}

export default App;