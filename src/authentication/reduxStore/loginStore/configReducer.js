import {
    SAVECONFIG,
    DELETECONFIG
} from "./action";

const initialState = {
    headers: {}
}

const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVECONFIG:
            return {
                headers : action.header
            };
        case DELETECONFIG:
            return {
                headers : {}
            }
        default:
            return state;
    }
}

export default configReducer;