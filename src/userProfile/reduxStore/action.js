export const ADD_PROFILE = 'ADD_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const ADD_EDUCATION = 'ADD_EDUCATION';
export const ADD_EXPERIENCE = 'ADD_EXPERIENCE';
export const ADD_SKILLS = 'ADD_SKILLS';
export const ADD_LANGUAGE = 'ADD_LANGUAGE';

export const addProfile = (obj) => {
    return (dispatch) => {
        dispatch({
            type:ADD_PROFILE,
            profile:obj
        })
    }
}

export const deleteProfile = () => {
    return (dispatch) => {
        dispatch({
            type:ADD_PROFILE
        })
    }
}


export const addEducations = (obj) => {
    return (dispatch) => {
        dispatch({
            type:ADD_EDUCATION,
            educations:obj
        });
    }
}

export const addExperiences = (obj) => {
    return (dispatch) => {
        dispatch({
            type:ADD_EXPERIENCE,
            experiences:obj
        });
    }
}

export const addSkills = (obj) => {
    return (dispatch) => {
        dispatch({
            type:ADD_SKILLS,
            skills:obj
        });
    }
}

export const addLanguages = (obj) => {
    return (dispatch) => {
        dispatch({
            type:ADD_LANGUAGE,
            languages:obj
        });
    }
}

