import axios from 'axios'
import helper from '../../shared/helpers/helper'
import Error from '../../error/controllers/error'

class UserController {

    createUser = async (obj) => {
        try {
            let response = await axios.post(helper.url + "users",obj,helper.config);
            return response ? response.data : -1;
        } catch (error) {
            Error.returnError(error);
        }
    }


    getUsers = async () => {
        try {
            let response = await axios.get(helper.url + "users",helper.config);
            return response ? response.data : null;
        } catch (error) {
            Error.returnError(error);
        }
    }

    deleteUser = async (id) => {
        try {
            let response = await axios.delete(helper.url + `users/${id}/delete`,helper.config)
            return response ? response.status === 200 ? true : false : false;
        } catch (error) {
            Error.returnError(error);
        }
    }


    getUserRoles = async (id) => {
        try {
            let response = await axios.get(helper.url + `users/${id}/roles`,helper.config);
            return response ? response.data : null;
        } catch (error) {
            Error.returnError(error);
        }
    }


    updateUserRoles = async (userId,userRoles) => {
        try {
            let response = await axios.post(helper.url + `users/${userId}/addUserRoles`,userRoles,helper.config);
            return response ? response.status === 200 ? true : false : false;
        } catch (error) {
            Error.returnError(error);
        }
    }
    
}

export default new UserController();