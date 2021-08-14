import { ADD_EXPERIENCE } from './action'

const initalState = {
    userExperiences : [] 
};

const userExperiencesReducer = (state = initalState, action) => {
    switch(action.type){
        case ADD_EXPERIENCE :
            return{
                userExperiences : action.experiences
            };
        default:
            return state;
    }
}

export default userExperiencesReducer;