import {combineReducers} from 'redux'
import openJobReducer from '../openjobs/reduxStore/reducers/openJobReducer'
import jobResponsibilitesReducer from '../openjobs/reduxStore/reducers/jobResponsibilityReducer';
import jobRequirementReducer from '../openjobs/reduxStore/reducers/jobRequirementReducer';
import loginReducer from '../authentication/reduxStore/loginStore/loginReducer';

const rootReducer = combineReducers({openJobs : openJobReducer, jobResponsibility:jobResponsibilitesReducer, jobRequirement: jobRequirementReducer, login:loginReducer});

export default rootReducer;