import axios from 'axios'
import Error from '../../error/controllers/error'
import helper from '../../shared/helpers/helper'
class JobCategoryController {


    addCategory = async (obj,config) => {
        try {
            let added = await axios.post(helper.url + 'jobCategory',obj,config);
            return added.data;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    deleteCategory = async (id,config) => {
        try {
            let deleted = await axios.delete(helper.url + `jobCategory/${id}`,config);
            return deleted.status === 200 ? true : false;
        } catch (error) {
            alert('eerr')
            Error.returnError(error);
            return false;
        }
    }

    updateCategory = async (obj,config) => {
        try {
            let updated = await axios.put(helper.url + 'jobCategory',obj,config);
            return updated.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

    getCategories = async (config) => {
        try {
            let categories = await axios.get(helper.url + 'jobCategory',config);
            return categories.data;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

}

export default new JobCategoryController();