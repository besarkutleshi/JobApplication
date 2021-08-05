export const ADD_JOB = 'ADD_JOB'
export const DELETE_JOB = 'DELETE_JOB'
export const FILL_ARRAY = 'FILL_ARRAY'
export const ADD_JOBDETAILS = 'ADD_JOBDETAILS'
export const ADD_REQUIREMENTS = 'ADD_REQUIREMENTS'
export const DELETE_REQUIREMENTS = 'DELETE_REQUIREMENTS'
export const ADD_RESPONSIBILITES = 'ADD_RESPONSIBILITES'
export const DELETE_RESPONSIBILITES = 'DELETE_RESPONSIBILITES'
export const ADD_RESPONSIBILITY = 'ADD_RESPONSIBILITY'

export const addJob = (job) => {
    return (dispatch) => {
        dispatch({
            type: ADD_JOB,
            job: job
        });
    }
}

export const deleteJob = (id) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_JOB,
            id: id
        });
    }
}

export const fillOpenJobArray = (jobs) => {
    return (dispatch) => {
        dispatch({
            type: FILL_ARRAY,
            jobs: jobs
        });
    }
}

export const addJobDetails = (jobDetails) => {
    return (dispatch) => {
        dispatch({
            type:ADD_JOBDETAILS,
            jobDetails:jobDetails
        })
    }
}

export const addJobRequirements = (jobRequirements) => {
    return (dispatch) => {
        dispatch({
            type:ADD_REQUIREMENTS,
            jobRequirements:jobRequirements
        })
    }
}

export const deleteJobRequirements = (id) => {
    return (dispatch) => {
        dispatch({
            type:DELETE_REQUIREMENTS,
            id:id
        })
    }
}

export const addJobResponsibilities = (jobResponsibilites) => {
    return (dispatch) => {
        dispatch({
            type:ADD_RESPONSIBILITES,
            jobResponsibilites:jobResponsibilites
        })
    }
}

export const addJobResponsibility = (jobResponsibility) => {
    return (dispatch) => {
        dispatch({
            type:ADD_RESPONSIBILITY,
            jobResponsibility:jobResponsibility
        })
    }
}

export const deleteJobResponsibilities = (id) => {
    return (dispatch) => {
        dispatch({
            type:DELETE_RESPONSIBILITES,
            id:id
        })
    }
}
