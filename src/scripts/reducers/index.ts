import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import stakeRoundInfo from './components/stakeRoundInfo';
import account from './components/account';
import networks from './components/networks';
import nodeList from './components/nodeList';
import cache from './components/cache';
import notifications from './components/notifications';

const rootReducer = combineReducers({
  routing: routerReducer,
  networks,
  account,
  stakeRoundInfo,
  nodeList,
  cache,
  notifications,
});

export default rootReducer;
