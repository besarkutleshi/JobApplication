import axios from 'axios'
import helper from '../../helpers/helper'
import Error from '../../errorComponents/controllers/error'
class OpenJobsController {

    getOpenJobs = async (config) => {
        try {
            let openJobs = await axios.get(helper.url + 'openjob/getOpenJobs',config);
            return openJobs.status === 200 ? openJobs.data : [];
        } catch (error) {
            Error.returnError(error);
            return [];
        }
    }

    getActiveJobs = async () => {
        try {
            let openJobs = await axios.get(helper.url + 'openjob/getActiveJobs');
            return openJobs.status === 200 ? openJobs.data : [];
        } catch (error) {
            Error.returnError(error);
            return [];
        }
    }

    addJob = async (job) => {
        try {
            let added = await axios.post(helper.url + 'openJob/createJob',job);
            return added.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    updateJob = async (job) => {
        try{
            let updated = await axios.post(helper.url + 'openJob/updateJob',job);
            return updated.status === 200 ? true : false;
        } catch(error){
            Error.returnError(error);
            return false;
        }
    }

    deleteJob = async (id) => {
        try {
            let deleted = await axios.delete(helper.url + `openJob/deleteJob/${id}`);
            return deleted.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    addJobResponsibility = async (obj) => {
        try {
            let added = await axios.post(helper.url + 'openJob/addJobResponsibility',obj)
            return added.status === 200 ? added.data : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    deleteJobResponsibility = async (id) => {
        try {
            let deleted = await axios.delete(helper.url + `openJob/deleteJobResponsibility/${id}`);
            return deleted.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    updateJobResponsibility = async (obj) => {
        try {
            let updated = await axios.post(helper.url + 'openJob/updateJobResponsibility',obj);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    addJobRequirement = async (obj) => {
        try {
            let added = await axios.post(helper.url + 'openJob/addJobRequirement',obj)
            return added.status === 200 ? added.data : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    deleteJobRequirement = async (id) => {
        try {
            let deleted = await axios.delete(helper.url + `openJob/deleteJobRequirement/${id}`);
            return deleted.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    updateJobRequirement = async (obj) => {
        try {
            let updated = await axios.post(helper.url + 'openJob/updateJobRequirement',obj);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

}

export default new OpenJobsController();