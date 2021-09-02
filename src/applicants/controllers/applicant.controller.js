import axios from 'axios'
import Error from '../../error/controllers/error'
import helper from '../../shared/helpers/helper'
class ApplicantsController {

    getApplicantProfiles = async () => {
        try {
            let result = await axios.get(helper.url + 'applicants');
            return result ? result.status === 200 ? result.data : null : null;
        } catch (error) {
            Error.returnError(error);
            return null;
        }
    }

    getApplicantProfile = async (id) => {
        try {
            let result = await axios.get(helper.url + `applicants/${id}`);
            return result ? result.status === 200 ? result.data : null : null;
        } catch (error) {
            Error.returnError(error);
            return null;
        }
    }

}

export default new ApplicantsController();