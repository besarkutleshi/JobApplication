import axios from 'axios'
import Error from '../../error/controllers/error'
import helper from '../../helpers/helper'
class UserProfileController {

    createProfile = async (obj) => {
        try {
            let created = await axios.post(helper.url + 'applicants/',obj,{headers:{ "Content-Type": "multipart/form-data" }});
            return created.data;
        } catch (error) {
            Error.returnError(error);
        }
    }

    updateProfile = async (obj) => {
        try {
            let created = await axios.put(helper.url + 'applicants/',obj,{headers:{ "Content-Type": "multipart/form-data" }});
            return created.status === 200 ? created.data : false;
        } catch (error) {
            Error.returnError(error);
        }
    }

    addEducation = async (obj) => {
        try {
            let added = await axios.post(helper.url + `applicants/${obj.AplicantProfileId}/educations`,obj);
            return added.data;
        } catch (error) {
            Error.returnError(error);
        }
    }
    
    updateEducation = async (obj) => {
        try {
            let updated = await axios.put(helper.url + `applicants/${obj.AplicantProfileId}/educations`,obj);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
        }
    }

    deleteEducation = async (profileId,id) => {
        try {
            let updated = await axios.delete(helper.url + `applicants/${profileId}/educations/${id}`);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
        }
    }

    
    addExperience = async (obj) => {
        try {
            let added = await axios.post(helper.url + `applicants/${obj.ApplicantProfileId}/experiences`,obj);
            return added.data;
        } catch (error) {
            Error.returnError(error);
        }
    }
    
    updateExperience = async (obj) => {
        try {
            let updated = await axios.put(helper.url + `applicants/${obj.ApplicantProfileId}/experiences`,obj);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
        }
    }

    deleteExperience = async (profileId,id) => {
        try {
            let updated = await axios.delete(helper.url + `applicants/${profileId}/experiences/${id}`);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
        }
    }

    
    addSkills = async (obj) => {
        try {
            let added = await axios.post(helper.url + `applicants/${obj.AplicantProfileId}/skills`,obj);
            return added.data;
        } catch (error) {
            Error.returnError(error);
        }
    }
    
    updateSkills = async (obj) => {
        try {
            let updated = await axios.put(helper.url + `applicants/${obj.AplicantProfileId}/skills`,obj);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
        }
    }

    deleteSkills = async (profileId,id) => {
        try {
            let updated = await axios.delete(helper.url + `applicants/${profileId}/skills/${id}`);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
        }
    }

    
    addLanguage = async (obj) => {
        try {
            let added = await axios.post(helper.url + `applicants/${obj.AplicantProfileId}/languages`,obj);
            return added.data;
        } catch (error) {
            Error.returnError(error);
        }
    }
    
    updateLanguage = async (obj) => {
        try {
            let updated = await axios.put(helper.url + `applicants/${obj.AplicantProfileId}/languages`,obj);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
        }
    }

    deleteLanguage = async (profileId,id) => {
        try {
            let updated = await axios.delete(helper.url + `applicants/${profileId}/languages/${id}`);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
        }
    }


}

export default new UserProfileController();