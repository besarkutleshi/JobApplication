import {
    ADD_RESPONSIBILITES
} from './action'

const initialState = {
    openJobsResponsibilities: []
}

const jobResponsibilitesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RESPONSIBILITES:
            return {
                openJobsResponsibilities: action.jobResponsibilites
            };
        default:
            return state;
    }
}

export default jobResponsibilitesReducer;