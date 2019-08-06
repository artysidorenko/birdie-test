import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Route } from 'react-router-dom';

import Menu from '@App/components/Menu';

import Dashboard from './views/Dashboard';
import Visits from './views/Visits';
import Nutrition from './views/Nutrition';
import Observations from './views/Observations';

interface AppProps {

}

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

  public render() {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Menu />

          <Route path="/dashboard" component={Dashboard} />
          <Route path="/visits" component={Visits} />
          <Route path="/nutrition" component={Nutrition} />
          <Route path="/observations" component={Observations} />

        </AppContainer>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {};

export default connect(mapStateToProps, mapDispatchToProps)(App);