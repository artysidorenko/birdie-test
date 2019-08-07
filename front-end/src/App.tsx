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

import { DataState } from './store/types';
import {
  getEvents,
  getFluidIntake,
  getFoodIntake,
  getMedication,
  getMoods,
  getObservations,
  getPadCondition,
  getTasks
} from './store/actions';

export interface ActionProps {
  getEvents: () => void;
}

type AppProps = DataState & ActionProps;

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
    this.props.getEvents();
  }

  public render() {
    /* tslint:disable:no-console */
    console.log(this.props.events.status, this.props.events.events[0]);
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Menu />
          {this.props.events.status}
          {this.props.events.events.toString()}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/visits" component={Visits} />
          <Route path="/nutrition" component={Nutrition} />
          <Route path="/observations" component={Observations} />
        </AppContainer>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object): DataState => ({
  events: state.data.events,
  fluid_intake: state.data.fluid_intake,
  food_intake: state.data.food_intake,
  observations: state.data.observations,
  pad_condition: state.data.pad_condition,
  moods: state.data.moods,
  medication: state.data.medication,
  tasks: state.data.tasks
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  getEvents: () => dispatch(getEvents()),
  getFluidIntake: () => dispatch(getFluidIntake()),
  getFoodIntake: () => dispatch(getFoodIntake()),
  getMedication: () => dispatch(getMedication()),
  getMoods: () => dispatch(getMoods()),
  getObservations: () => dispatch(getObservations()),
  getPadCondition: () => dispatch(getPadCondition()),
  getTasks: () => dispatch(getTasks())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);