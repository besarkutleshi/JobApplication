import {
    ADD_REQUIREMENTS,
    DELETE_REQUIREMENTS
} from './action'

const initialState = {
    openJobsRequirements: []
};

const jobRequirementReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_REQUIREMENTS:
            return {
                openJobsRequirements: action.jobRequirements
            };
        default:
            return state;
    }
}


export default jobRequirementReducer;