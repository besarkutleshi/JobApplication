import {
    ADD_SKILLS
} from './action'

const initialState = {
    userSkills: []
}

const userSkillsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SKILLS:
            return {
                userSkills: action.skills
            };
        default:
            return state;
    }
}

export default userSkillsReducer;