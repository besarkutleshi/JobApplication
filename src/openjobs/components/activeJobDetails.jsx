import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from '../../loader/components/loader'
import {fileText} from 'react-icons-kit/fa/fileText'
import Icon from 'react-icons-kit'
import {arrowLeft2} from 'react-icons-kit/icomoon/arrowLeft2'
import helper from '../../shared/helpers/helper'
import jobCategoryController from '../controllers/jobCategory.controller'
const ActiveJobDetails = ({ ...props }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [jobDetails, setJobDetails] = useState({});
    const [jobResponsibility, setJobResponsibility] = useState([]);
    const [jobRequirements, setJobRequirements] = useState([]);
    const [openJobID, setOpenJobID] = useState(props.match.params.id);


    const openJobsStore = useSelector((state) => state.openJobs.openJobs);
    const user = useSelector((state) => state.login.user);

    
    
    useEffect(() => {
        const getJobDetail = () => {
            setIsLoading(true);
            let obj = openJobsStore.find(o => parseInt(o.id) === parseInt(openJobID));
            if(obj){
                obj.expireDate = obj.expireDate.toString().split('T')[0];
                obj.createdDate = obj.createdDate.toString().split('T')[0];
                setJobResponsibility(obj.openJobsResponsibilities);
                setJobRequirements(obj.openJobsRequirements);
                setJobDetails(obj);
            }
            setIsLoading(false);
        }
        getJobDetail();
    }, []);


    const redirectToApplyPage = () => {
        if(user){
            if(user.token){
                if(user.profile){
                    window.location.hash = `/apply/${openJobID}/1`
                    return;
                }
                window.location.hash = `/createProfile`;
                return;
            }
        }
        window.location.hash = `/login/activeJobDetails/${openJobID}`;
    }



    if(isLoading){
        return(
            <Loading />
        )
    }
    else if (jobDetails.openJobName != "" && jobResponsibility.length > 0 && jobRequirements.length > 0) {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 d-flex justify-content-between">
                        <Link to={{ pathname:`/`}} className="btn btn-info me-auto"><Icon icon={arrowLeft2} /> Back</Link>
                        { helper.validUsername(user.username) && <button onClick={redirectToApplyPage} className="btn btn-info float-right"> <Icon icon={fileText}/> Apply Online</button> }
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-4">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <br />
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Role</h5>
                                        <h6 className="mr-3">{jobDetails.openJobName}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Departament</h5>
                                        <h6 className="mr-3">{jobDetails.departament}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Expiring Date</h5>
                                        <h6 className="mr-3">{jobDetails.expireDate}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Date Posted</h5>
                                        <h6 className="mr-3">{jobDetails.createdDate}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Job Type</h5>
                                        <h6 className="mr-3">{jobDetails.jobType}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Experience Level</h5>
                                        <h6 className="mr-3">{jobDetails.experienceLevel}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Employees wanted</h5>
                                        <h6 className="mr-3">{jobDetails.noEmployeesWanted}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <br />
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Active</h5>
                                        <h6 className="mr-3">{jobDetails.isActive === 1 ? 'Yes' : 'No'}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Status </h5>
                                        <h6 className="mr-3">{jobDetails.status}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="card">
                            <br />
                            <p className="ml-3 mb-4" style={{fontSize:"18px"}}>
                                <b>Based on the organizational scheme in force and the need to fill vacancies in the Division of Distribution, Operation Departament
                                    , Human Resources Departamen, July 1 2021 announces vacancies for the following positions :
                                </b>
                            </p>
                            <div className="mb-3">
                                <h4 className="ml-3 text-info">{jobDetails.openJobName}</h4>
                            </div>
                            <div>
                                <h6 style={{fontSize:"18px"}} className="ml-3">Key tasks and responsibilities : </h6>
                                <ul>
                                    {
                                        jobResponsibility.map((element,key) => {
                                            return (
                                                <li key={key}>{element.responsibility}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div>
                                <h6 style={{fontSize:"18px"}} className="ml-3">Requirements and qualifications : </h6>
                                <ul>
                                    {
                                        jobRequirements.map((element,key) => {
                                            return (
                                                <li key={key}>{element.requirement}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="row">
                <div className="col-sm-12 text-center">
                    <h5>This job does not have details, please contact administrator!</h5>
                    <br />
                    <Link to={{pathname:'/'}} className="btn btn-primary"> Job List</Link>
                </div>
            </div>
        )
    }
}
export default ActiveJobDetails;