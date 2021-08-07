export const LOGIN = 'LOGIN'
export const GETUSER = 'GETUSER'
export const LOGOUT = 'LOGOUT'

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

