import { ADD_EDUCATION } from './action'

const initalState = {
    userEducations : [] 
};

const userEducationReducer = (state = initalState, action) => {
    switch(action.type){
        case ADD_EDUCATION :
            return{
                userEducations : action.educations
            };
        default:
            return state;
    }
}

export default userEducationReducer;