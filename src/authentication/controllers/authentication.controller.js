import axios from 'axios'
import helper from '../../shared/helpers/helper'
import Error from '../../error/controllers/error';
class AuthenticationController {

    login = async (obj) => {
        try {
            let login = await axios.post(helper.url + 'authentication/Login',obj);
            return login.status === 200 ? login.data : null;
        } catch (error) {
            return error.response.data;
        }
    }

    registerUser = async (obj) => {
        try {
            let user = await axios.post(helper.url + 'authentication/registerUser',obj);
            return user.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
        }
    }

    forgotPassword = async (username) => {
        try {
            let mailed = await axios.get(helper.url + `authentication/forgotPassword/${username}`);
            return mailed.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    resetPassword = async (obj) => {
        try {
            let reseted = await axios.post(helper.url + 'authentication/resetPassword',obj);
            return reseted.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

}

export default new AuthenticationController();