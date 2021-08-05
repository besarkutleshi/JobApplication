import {combineReducers} from 'redux'
import openJobReducer from './openJobReducer'
import jobResponsibilitesReducer from './jobResponsibilityReducer';
import jobRequirementReducer from './jobRequirementReducer';

const rootReducer = combineReducers({openJobs : openJobReducer, jobResponsibility:jobResponsibilitesReducer, jobRequirement: jobRequirementReducer});

export default rootReducer;