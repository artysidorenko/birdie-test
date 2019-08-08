import { applyMiddleware, compose, createStore, GenericStoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as _history from 'history';
import { rootReducer, RootState } from '@App/store/reducers';
import initSaga from '@App/store/sagas';
import { DataState } from './types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => undefined;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (arg: GenericStoreEnhancer) => undefined;
  }
}

const sagaMiddleware = createSagaMiddleware();
export const history = _history.createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(initSaga);

export default store;

export const mapStateToProps = (state: RootState, ownProps: object): DataState => ({
  events: state.data.events,
  fluid_intake: state.data.fluid_intake,
  food_intake: state.data.food_intake,
  observations: state.data.observations,
  pad_condition: state.data.pad_condition,
  moods: state.data.moods,
  medication: state.data.medication,
  tasks: state.data.tasks
});