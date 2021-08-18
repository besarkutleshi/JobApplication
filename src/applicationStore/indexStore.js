import {combineReducers} from 'redux'
import openJobReducer from '../openjobs/reduxStore/reducers/openJobReducer'
import jobResponsibilitesReducer from '../openjobs/reduxStore/reducers/jobResponsibilityReducer';
import jobRequirementReducer from '../openjobs/reduxStore/reducers/jobRequirementReducer';
import loginReducer from '../authentication/reduxStore/loginStore/loginReducer';
import moduleReducer from '../modules/reduxStore/moduleReducer';
import profileReducer from '../userProfile/reduxStore/profileReducer'
import userEducationReducer from '../userProfile/reduxStore/educationReducer'
import userExperiencesReducer from '../userProfile/reduxStore/experienceReducer'
import userSkillReducer from '../userProfile/reduxStore/skillsReducer'
import userLanguagesReducer from '../userProfile/reduxStore/languageReducer'
import questionReducer from '../applications/reduxStore/questionReducer'

const rootReducer = combineReducers({openJobs : openJobReducer, jobResponsibility:jobResponsibilitesReducer, 
    jobRequirement: jobRequirementReducer, login:loginReducer, module: moduleReducer, profile:profileReducer, userEducation:userEducationReducer,
    userExperience:   userExperiencesReducer, userSkills:userSkillReducer, userLanguages:userLanguagesReducer, applicantQuestions : questionReducer
});

export default rootReducer;