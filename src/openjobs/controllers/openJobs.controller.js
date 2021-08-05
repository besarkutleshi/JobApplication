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

    deleteJob = async (id) => {
        try {
            let deleted = await axios.delete(helper.url + `openJob/deleteJob/${id}`);
            return deleted.status === 200 ? true : false;
        } catch (error) {
            throw Error(error);
        }
    }

    addJobResponsibility = async (obj) => {
        try {
            let added = await axios.post(helper.url + 'openJob/addJobResponsibility',obj)
            return added.status === 200 ? added.data : false;
        } catch (error) {
            throw Error(error);
        }
    }

    deleteJobResponsibility = async (id) => {
        try {
            let deleted = await axios.delete(helper.url + `openJob/deleteJobResponsibility/${id}`);
            return deleted.status === 200 ? true : false;
        } catch (error) {
            throw Error(error);
        }
    }

    updateJobResponsibility = async (obj) => {
        try {
            let updated = await axios.post(helper.url + 'open/updateJobResponsibility',obj);
            return updated.status === 200 ? true : false;
        } catch (error) {
            throw Error(error);
        }
    }


}

export default new OpenJobsController();