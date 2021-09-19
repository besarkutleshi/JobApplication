import axios from 'axios'
import helper from '../../shared/helpers/helper'
import Error from '../../error/controllers/error'

class RoleController {

    getRoles = async () => {
        try {
            let response = await axios.get(helper.url + 'authorization',helper.config);
            return response ? response.data : null;
        } catch (error) {
            Error.returnError(error);
        }
    }

    getUsersInRole = async (roleId) => {
        try {
            let response = await axios.get(helper.url + `authorization/${roleId}/usersInRole`,helper.config);
            return response ? response.data : null;
        } catch (error) {
            Error.returnError(error);
        }
    }

    saveUsersInRole = async (roleId, usersInRole) => {
        try {
            let response = await axios.post(helper.url + `authorization/${roleId}/usersInRole`,usersInRole,helper.config);
            return response ? response.status === 200 ? true : false : false;
        } catch (error) {
            Error.returnError(error);
        }
    }

    createRole = async (obj) => {
        try {
            let response = await axios.post(helper.url + 'authorization',obj,helper.config);
            return response ? response.data : -1;
        } catch (error) {
            Error.returnError(error);
        }
    }

    deleteRole = async (id) => {
        try {
            let response = await axios.delete(helper.url + `authorization/${id}`,helper.config);
            return response ? response.status === 200 ? true : false : false;
        } catch (error) {
            Error.returnError(error);
        }
    }

    updateRole = async (obj) => {
        try {
            let response = await axios.put(helper.url + 'authorization',obj,helper.config);
            return response ? response.status === 200 ? true : false : false;
        } catch (error) {
            Error.returnError(error);
        }
    }

}

export default new RoleController();