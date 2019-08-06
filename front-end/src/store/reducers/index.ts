import { combineReducers } from 'redux';
import { initialState } from './initialState';

export type RootState = Readonly<{}>;

export const rootReducer = combineReducers<RootState>({});