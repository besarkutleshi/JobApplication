import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from 'react-icons-kit'
import {arrowLeft2} from 'react-icons-kit/icomoon/arrowLeft2'
import {edit} from 'react-icons-kit/fa/edit'
const OpenJobDetails = ({ openJobID }) => {

    const [jobDetails, setJobDetails] = useState({});
    const [jobResponsibility, setJobResponsibility] = useState([]);
    const [jobRequirements, setJobRequirements] = useState([]);

    const openJobsStore = useSelector((state) => state.openJobs.openJobs);
    
    useEffect(() => {
        const getJobDetail = () => {
            let obj = openJobsStore.find(o => parseInt(o.id) === parseInt(openJobID));
            obj.expireDate = obj.expireDate.toString().split('T')[0];
            obj.createdDate = obj.createdDate.toString().split('T')[0];
            setJobResponsibility(obj.openJobsResponsibilities);
            setJobRequirements(obj.openJobsRequirements);
            setJobDetails(obj)
        }
        getJobDetail();
    }, []);

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 d-flex justify-content-between">
                    <Link to={{ pathname:`/`}} className="btn btn-primary"><Icon icon={arrowLeft2} /> Back</Link>
                    <Link to={{ pathname:`/editJob/${openJobID}`, state:{openJobID:openJobID}}} className="btn btn-primary"> <Icon icon={edit} /> Edit job position</Link>
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
                                    <h5 className="lead ml-3">Number of applicants</h5>
                                    <h6 className="mr-3" style={{color:"#44B1FC"}}>{jobDetails.applicationsNumber}</h6>
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
                            <h4 className="ml-3" style={{color:"#44B1FC"}}>{jobDetails.openJobName}</h4>
                        </div>
                        <div>
                            <h6 style={{fontSize:"18px"}} className="ml-3">Key tasks and responsibilities : </h6>
                            <ul>
                                {
                                    jobResponsibility.map((element,key) => {
                                        return (
                                            <li>{element.responsibility}</li>
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
                                            <li>{element.requirement}</li>
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
export default OpenJobDetails;