import { ADD_QUESTIONS } from './action'

const initalState = {
    questions:[]
}

const questionReducer = (state=initalState, action) => {
    switch(action.type){
        case ADD_QUESTIONS :
            return{
                questions : action.questions
            };
        default:
            return state;
    }
}

export default questionReducer;