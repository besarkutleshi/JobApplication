import {
    ADD_LANGUAGE
} from './action'

const initialState = {
    userLanguages: []
}

const userLanguagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LANGUAGE:
            return {
                userLanguages: action.languages
            };
        default:
            return state;
    }
}

export default userLanguagesReducer;