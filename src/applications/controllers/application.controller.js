import axios from 'axios'
import helper from '../../shared/helpers/helper';
import Error from '../../error/controllers/error'
class ApplicationController{

    createApplication = async (obj) =>{
        try {
            let response = await axios.post(helper.url + 'applications/',obj);
            return response.data;
        } catch (error) {
            Error.returnError(error);
            return -1;
        }
    }

    getQuestions = async (applicationTypeId) => {
        try {
            let response = await axios.get(helper.url + `applications/${applicationTypeId}/questions`);
            return response.data;
        } catch (error) {
            Error.returnError(error);
            return null;
        }
    }

    getUserApplications = async (userId,applicationTypeId) => {
        try {
            let response = await axios.get(helper.url + `applications/${userId}/${applicationTypeId}`);
            return response.data;
        } catch (error) {
            Error.returnError(error);
            return null;
        }
    }

    getApplications = async () => {
        try {
            let response = await axios.get(helper.url + 'applications');
            return response ? response.data : null;
        } catch (error) {
            Error.returnError(error);
            return null;
        }
    }

    getApplicationQuestions = async (applicationID) => {
        try {
            let response = await axios.get(helper.url + `applications/${applicationID}/applicationQuestions`);
            return response ? response.data : null;
        } catch (error) {
            Error.returnError(error);
            return null;
        }
    }

}

export default new ApplicationController();