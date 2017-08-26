import rootReducer from '../reducers';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


// enable redux devtools... can this be done with Webpack instead?
const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)


export default (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    enhancers,
  );
}
