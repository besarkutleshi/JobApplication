import axios from 'axios'
import helper from '../../shared/helpers/helper'
import Error from '../../error/controllers/error'
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

    addJob = async (job,config) => {
        try {
            let added = await axios.post(helper.url + 'openJob/createJob',job,config);
            return added.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    updateJob = async (job,config) => {
        try{
            let updated = await axios.post(helper.url + 'openJob/updateJob',job,config);
            return updated.status === 200 ? true : false;
        } catch(error){
            Error.returnError(error);
            return false;
        }
    }

    deleteJob = async (id,config) => {
        try {
            let deleted = await axios.delete(helper.url + `openJob/deleteJob/${id}`,config);
            return deleted.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    addJobResponsibility = async (obj,config) => {
        try {
            let added = await axios.post(helper.url + 'openJob/addJobResponsibility',obj,config)
            return added.status === 200 ? added.data : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    deleteJobResponsibility = async (id,config) => {
        try {
            let deleted = await axios.delete(helper.url + `openJob/deleteJobResponsibility/${id}`,config);
            return deleted.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    updateJobResponsibility = async (obj,config) => {
        try {
            let updated = await axios.post(helper.url + 'openJob/updateJobResponsibility',obj,config);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    addJobRequirement = async (obj,config) => {
        try {
            let added = await axios.post(helper.url + 'openJob/addJobRequirement',obj,config)
            return added.status === 200 ? added.data : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    deleteJobRequirement = async (id,config) => {
        try {
            let deleted = await axios.delete(helper.url + `openJob/deleteJobRequirement/${id}`,config);
            return deleted.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    updateJobRequirement = async (obj,config) => {
        try {
            let updated = await axios.post(helper.url + 'openJob/updateJobRequirement',obj,config);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

}

export default new OpenJobsController();