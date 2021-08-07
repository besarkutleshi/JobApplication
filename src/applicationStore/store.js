import {createStore, applyMiddleware} from 'redux'
import rootReducer from './indexStore'
import thunk from 'redux-thunk'

const openJobStore = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
);

export default openJobStore;
