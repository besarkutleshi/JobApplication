import { LOGIN, GETUSER, LOGOUT } from './action'

const initialState = {
    user : {}
}

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN :
            return{
                user : action.obj
            };
        case GETUSER : 
            return state.user;
        case LOGOUT :
            return {
                user : {}
            }
        default:
            return state;
    }
}


export default loginReducer;