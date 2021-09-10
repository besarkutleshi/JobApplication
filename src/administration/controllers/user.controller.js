import axios from 'axios'
import helper from '../../shared/helpers/helper'
import Error from '../../error/controllers/error'

class UserController {

    getUsers = async () => {
        try {
            let response = await axios.get(helper.url + "users");
            return response ? response.data : null;
        } catch (error) {
            Error.returnError(error);
        }
    }

    
}

export default new UserController();