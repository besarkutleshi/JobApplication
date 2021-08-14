import { ADD_PROFILE, DELETE_PROFILE} from './action'

const initialState = {
    profile : {}
}


const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PROFILE:
            return{
                profile:action.profile
            };
        case DELETE_PROFILE :
            return{
                profile:{}
            };
        default:
            return state;
    }
}

export default profileReducer;