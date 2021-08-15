export const ADD_PROFILE = 'ADD_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const ADD_EDUCATION = 'ADD_EDUCATION';
export const DELETE_EDUCATION = 'DELETE_EDUCATION';
export const ADD_EXPERIENCE = 'ADD_EXPERIENCE';
export const DELETE_EXPERIENCE = 'DELETE_EXPERIENCE';
export const ADD_SKILLS = 'ADD_SKILLS';
export const DELETE_SKILLS = 'DELETE_SKILLS';
export const ADD_LANGUAGE = 'ADD_LANGUAGE';
export const DELETE_LANGUAGE = 'DELETE_LANGUAGE';

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

export const deleteEducations = () => {
    return (dispatch) => {
        dispatch({
            type:DELETE_EDUCATION
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

export const deleteExperiences = () => {
    return (dispatch) => {
        dispatch({
            type:DELETE_EXPERIENCE
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

export const deleteSkills = () => {
    return (dispatch) => {
        dispatch({
            type:DELETE_SKILLS
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

export const deleteLanguages = () => {
    return (dispatch) => {
        dispatch({
            type:DELETE_LANGUAGE
        });
    }
}