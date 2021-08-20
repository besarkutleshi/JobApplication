import axios from 'axios'
import helper from '../../helpers/helper';
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

    getUserApplications = async (userId) => {
        try {
            let response = await axios.get(helper.url + `applications/${userId}/applications`);
            return response.data;
        } catch (error) {
            Error.returnError(error);
            return null;
        }
    }

}

export default new ApplicationController();