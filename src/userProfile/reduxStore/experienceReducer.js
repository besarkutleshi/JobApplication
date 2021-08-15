import { ADD_EXPERIENCE, DELETE_EXPERIENCE } from './action'

const initalState = {
    userExperiences : [] 
};

const userExperiencesReducer = (state = initalState, action) => {
    switch(action.type){
        case ADD_EXPERIENCE :
            return{
                userExperiences : action.experiences
            };
        case DELETE_EXPERIENCE:
            return{
                userExperiences : []
            }
        default:
            return state;
    }
}

export default userExperiencesReducer;