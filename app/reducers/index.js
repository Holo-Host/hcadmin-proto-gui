import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import counter from './counter';
import stats from './stats';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({ router: routerReducer , stats }) // stats
  );
}
