import {ADD_MODULES, REMOVE_MODULES} from './action'

const initalState = {
    modules : []
}

const moduleReducer = (state = initalState, action) => {
    switch(action.type){
        case ADD_MODULES :
            return {
                modules: action.modules
            };
        case REMOVE_MODULES :
            return {
                modules: action.modules
            };
        default :
            return state;
    }
}

export default moduleReducer;