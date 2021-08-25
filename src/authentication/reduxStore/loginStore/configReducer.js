import {
    SAVECONFIG
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
        default:
            return state;
    }
}

export default configReducer;