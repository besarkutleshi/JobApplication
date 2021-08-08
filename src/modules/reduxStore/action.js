export const ADD_MODULES = 'ADD_MODULES'
export const REMOVE_MODULES = 'REMOVE_MODULES'

export const addModules = (modules) => {
    return (dispatch) => {
        dispatch({
            type : ADD_MODULES,
            modules:modules
        })
    }
}

export const removeModules = () => {
    return (dispatch) => {
        dispatch({
            type : REMOVE_MODULES,
            modules:[]
        })
    }
}