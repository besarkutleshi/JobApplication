import axios from 'axios'
import helper from '../../helpers/helper'

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
            return user.status === 200 ? user.data : null;
        } catch (error) {
            return error.response.data;
        }
    }

}

export default new AuthenticationController();