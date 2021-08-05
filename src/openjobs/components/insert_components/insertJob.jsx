import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import JobDetails from './jobDetails';
import JobReuqirements from './jobRequirements';
import JobResponsibilites from './jobResponsibilites';
import {Link} from 'react-router-dom'
import {arrowLeft2} from 'react-icons-kit/icomoon/arrowLeft2'
import Icon from 'react-icons-kit'
import SavePreview from './savePreview';
import openJobsController from '../../controllers/openJobs.controller';
import ErrorAlert from '../../../alerts/components/errorAlert'
import SuccessAlert from '../../../alerts/components/successAlert'
import { addJobDetails, addJobRequirements, addJobResponsibilities } from '../../reduxStore/reducers/action'
import {bindActionCreators} from 'redux'
import loader from '../../../images/loader.gif'
const InsertJob = () => {

    let requirementsStore = useSelector((state) => state.jobRequirement.openJobsRequirements);
    let responsibilitiesStore = useSelector((state) => state.jobResponsibility.openJobsResponsibilities);
    let jobDetailsStore = useSelector((state) => state.openJobs.openJob);

    const dispatch = useDispatch();
    const deleteJobDetails = bindActionCreators(addJobDetails, dispatch);
    const deleteRequirements = bindActionCreators(addJobRequirements,dispatch);
    const deleteResponsibilities = bindActionCreators(addJobResponsibilities, dispatch);

    const [isLoading, setIsLoading] = useState(false);

    const addJob = async () => {
        setIsLoading(true);
        let obj = jobDetailsStore;
        obj.OpenJobsRequirements = requirementsStore;
        obj.OpenJobsResponsibilities = responsibilitiesStore;
        if(obj.JobName === '' || obj.Departament === '' || obj.Division === '' || obj.JobTitleSQ === '' || obj.JobTitleEN === '' || obj.JobTitleSR === '' ||
            obj.NoEmployeesWanted <= 0 || obj.JobLocation === '' || obj.ExpireDate === ''){
                ErrorAlert("Can not add a job without his mandatory data, please check once again!");
                setIsLoading(false);
                return false;
            }
        else if(!obj.OpenJobsResponsibilities || obj.OpenJobsResponsibilities.length <= 0){
            ErrorAlert("Can not add a job without Responsibilites, please write at least one responsibility!");
            setIsLoading(false);
            return false;
        }
        else if(!obj.OpenJobsRequirements || obj.OpenJobsRequirements.length <= 0){
            ErrorAlert("Can not add a job without Requirements, please write at least one Requirement!");
            setIsLoading(false);
            return false;
        }
        let added = await openJobsController.addJob(obj);
        if(added){
            deleteJobDetails({
                JobName: "",
                Departament: "",
                Division: "",
                JobTitleSQ: "",
                JobTitleEN: "",
                JobTitleSR: "",
                NoEmployeesWanted: 0,
                JobLocation: "",
                ExpireDate: "",
                IsRemote: 0,
                JobType: 'Not Selected',
                ExperienceLevel: 'Not Selected',
                Description: ''});
            deleteRequirements([]);
            deleteResponsibilities([]);
            SuccessAlert('Job registered successful');
            setIsLoading(false);
        }else{
            ErrorAlert('Error');
            setIsLoading(false);
        }
        window.location.pathname = '/'
    }

    const validateJobResponsibilites = () => {
        if(responsibilitiesStore.length <= 0){
            ErrorAlert("Can not add a job without Responsibilites, please write at least one responsibility!");
            return false;
        }
        return true;
    }

    const validateJobRequirements = () => {
        if(requirementsStore.length <= 0){
            ErrorAlert("Can not add a job without Requirements, please write at least one requirement");
            return false;
        }
        return true;
    }

    return(
    <div style={{marginTop:"-70px"}}>
            <br />
            <div className="row">
                <div className="col-sm-12">
                    <Link to={{pathname:'/'}} className="btn btn-primary"> <Icon icon={arrowLeft2} /> Job List</Link>
                    {isLoading && <img src={loader} alt="" className="float-right" width="80" height="80" style={{marginTop:"-17px"}} /> } 
                </div>
            </div>
            <br />
            <StepProgressBar
                startingStep={0}
                contentClass={"contentClass"}
                onSubmit={addJob}
                steps={[
                    {
                        label: 'Job Details',
                        subtitle: '25%',
                        name: 'step 1',
                        content: <JobDetails/>
                    },
                    {
                        label: 'Key Tasks & Responsibilities',
                        subtitle: '50%',
                        name: 'step 2',
                        content: <JobResponsibilites />,
                        // validator:validateJobResponsibilites
                    },
                    {
                        label: 'Requirements & Qualifications',
                        subtitle: '75%',
                        name: 'step 3',
                        content: <JobReuqirements />,
                        // validator:validateJobRequirements
                    },
                    {
                        label: 'Save & Preview',
                        subtitle: '100%',
                        name: 'step 3',
                        content: <SavePreview />
                    }
                ]}
            />
        </div>
    )
}

export default InsertJob;