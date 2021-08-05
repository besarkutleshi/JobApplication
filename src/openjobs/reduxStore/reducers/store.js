import {createStore, applyMiddleware} from 'redux'
import rootReducer from './index'
import thunk from 'redux-thunk'

const openJobStore = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
);

export default openJobStore;
