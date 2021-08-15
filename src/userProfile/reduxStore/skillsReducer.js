import {
    ADD_SKILLS,
    DELETE_SKILLS
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
        case DELETE_SKILLS:
            return{
                userSkills: []
            }
        default:
            return state;
    }
}

export default userSkillsReducer;