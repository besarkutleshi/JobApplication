import {
    ADD_LANGUAGE,
    DELETE_LANGUAGE
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
        case DELETE_LANGUAGE:
            return {
                userLanguages: []
            };
        default:
            return state;
    }
}

export default userLanguagesReducer;