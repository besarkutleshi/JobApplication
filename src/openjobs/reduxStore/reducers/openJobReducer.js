import {
    ADD_JOB,
    DELETE_JOB,
    FILL_ARRAY,
    ADD_JOBDETAILS
} from './action'

const initialState = {
    openJobs: [],
    openJob: {
        JobName: "",
        Departament: "",
        Division: "",
        JobTitleSQ: "",
        JobTitleEN: "",
        JobTitleSR: "",
        NoEmployeesWanted: 0,
        JobLocation: "",
        CategoryId:0,
        ExpireDate: "",
        IsRemote: 0,
        JobType: 'Not Selected',
        ExperienceLevel: 'Not Selected',
        Description: ''
    }
}

const openJobReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_JOB:
            return {
                openJobs: [...state.openJobs, action.job]
            };
        case DELETE_JOB:
            let result = initialState.openJobs.filter(function (element) {
                return element.ID != action.id;
            });
            return {
                openJobs: result
            };
        case FILL_ARRAY:
            return {
                openJobs: action.jobs
            };
        case ADD_JOBDETAILS:
            return {
                openJob: action.jobDetails
            };
        default:
            return state;
    }
}

export default openJobReducer;