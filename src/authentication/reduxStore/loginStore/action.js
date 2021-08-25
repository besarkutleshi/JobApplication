export const LOGIN = 'LOGIN'
export const GETUSER = 'GETUSER'
export const LOGOUT = 'LOGOUT'
export const SAVECONFIG = 'SAVECONFIG'

export const login = (obj) => {
    return (dispatch) => {
        dispatch({
            type : LOGIN,
            obj:obj
        });
    }
}

export const getUser = () => {
    return (dispatch) => {
        dispatch({
            type: GETUSER
        })
    }
}

export const logOut = () => {
    return (dispatch) => {
        dispatch({
            type:LOGOUT
        })
    }
}

export const saveConfig = (header) => {
    return(dispatch) => {
        dispatch({
            type : SAVECONFIG,
            header:header
        })
    }
}

