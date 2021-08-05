import axios from 'axios'
import helper from '../../helpers/helper'
class OpenJobsController {

    getOpenJobs = async () => {
        try {
            let openJobs = await axios.get(helper.url + 'openjob/getOpenJobs');
            return openJobs.status === 200 ? openJobs.data : null;
        } catch (error) {
            throw Error(error);
        }
    }

    addJob = async (job) => {
        try {
            let added = await axios.post(helper.url + 'openJob/createJob',job);
            return added.status === 200 ? true : false;
        } catch (error) {
            throw Error(error);
        }
    }

    updateJob = async (job) => {
        try{
            let updated = await axios.post(helper.url + 'openJob/updateJob',job);
            return updated.status === 200 ? true : false;
        } catch(error){
            throw Error(error);
        }
    }

}

export default new OpenJobsController();