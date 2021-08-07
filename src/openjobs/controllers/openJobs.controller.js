import axios from 'axios'
import helper from '../../helpers/helper'
import ErrorAlert from '../../alerts/components/errorAlert';
import SessionExpired from '../../errorComponents/components/sessionExpired';
import Error from '../../errorComponents/controllers/error'
class OpenJobsController {

    getOpenJobs = async (config) => {
        try {
            let openJobs = await axios.get(helper.url + 'openjob/getOpenJobs',config);
            return openJobs.status === 200 ? openJobs.data : null;
        } catch (error) {
            Error.returnError(error);
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
            let updated = await axios.post(helper.url + 'openJob/updateJobResponsibility',obj);
            return updated.status === 200 ? true : false;
        } catch (error) {
            throw Error(error);
        }
    }

    addJobRequirement = async (obj) => {
        try {
            let added = await axios.post(helper.url + 'openJob/addJobRequirement',obj)
            return added.status === 200 ? added.data : false;
        } catch (error) {
            throw Error(error);
        }
    }

    deleteJobRequirement = async (id) => {
        try {
            let deleted = await axios.delete(helper.url + `openJob/deleteJobRequirement/${id}`);
            return deleted.status === 200 ? true : false;
        } catch (error) {
            throw Error(error);
        }
    }

    updateJobRequirement = async (obj) => {
        try {
            let updated = await axios.post(helper.url + 'openJob/updateJobRequirement',obj);
            return updated.status === 200 ? true : false;
        } catch (error) {
            throw Error(error);
        }
    }

}

export default new OpenJobsController();