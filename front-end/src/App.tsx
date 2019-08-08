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
    height: 100vh;
    background-color: #F9F9F9;
    > div {
      height: 100%;
    }
  }
`;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
  }
  componentDidMount() {
  }

  public render() {
    /* tslint:disable:no-console */
    // console.log(this.props.events.status, this.props.events.events);
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