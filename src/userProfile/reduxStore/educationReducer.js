import { ADD_EDUCATION, DELETE_EDUCATION } from './action'

const initalState = {
    userEducations : [] 
};

const userEducationReducer = (state = initalState, action) => {
    switch(action.type){
        case ADD_EDUCATION :
            return{
                userEducations : action.educations
            };
        case DELETE_EDUCATION :
            return{
                userEducations : []
            }
        default:
            return state;
    }
}

export default userEducationReducer;