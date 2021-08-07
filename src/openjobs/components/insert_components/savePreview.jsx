import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../../../loader/components/loader';


const SavePreview = () => {

    const requirementsStore = useSelector((state) => state.jobRequirement.openJobsRequirements);
    const responsibilitiesStore = useSelector((state) => state.jobResponsibility.openJobsResponsibilities);
    const jobDetailsStore = useSelector((state) => state.openJobs.openJob);

    const [jobDetails, setJobDetails] = useState(jobDetailsStore ? jobDetailsStore : {});
    const [jobResponsibility, setJobResponsibility] = useState(responsibilitiesStore ? responsibilitiesStore : []);
    const [jobRequirements, setJobRequirements] = useState(requirementsStore ? requirementsStore : []);


    if (!jobDetailsStore || !responsibilitiesStore || !requirementsStore) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <div className="container-fluid">
                <br /><br /><br />
                <div className="row">
                    <div className="col-sm-4">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <br />
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Role</h5>
                                        <h6 className="mr-3">{jobDetails.JobName}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Departament</h5>
                                        <h6 className="mr-3">{jobDetails.Departament}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Division</h5>
                                        <h6 className="mr-3">{jobDetails.Division}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Expiring Date</h5>
                                        <h6 className="mr-3">{jobDetails.ExpireDate}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Job Type</h5>
                                        <h6 className="mr-3">{jobDetails.JobType}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Experience Level</h5>
                                        <h6 className="mr-3">{jobDetails.ExperienceLevel}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Employees wanted</h5>
                                        <h6 className="mr-3">{jobDetails.NoEmployeesWanted}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Job Title SQ</h5>
                                        <h6 className="mr-3">{jobDetails.JobTitleSQ}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Job Title EN</h5>
                                        <h6 className="mr-3">{jobDetails.JobTitleEN}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-right mb-2">
                                        <h5 className="lead ml-3">Job Title SR</h5>
                                        <h6 className="mr-3">{jobDetails.JobTitleSR}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="card">
                            <br />
                            <p className="ml-3 mb-4" style={{ fontSize: "18px" }}>
                                <b>Based on the organizational scheme in force and the need to fill vacancies in the Division of Distribution, Operation Departament
                                    , Human Resources Departamen, July 1 2021 announces vacancies for the following positions :
                                </b>
                            </p>
                            <div className="mb-3">
                                <h4 className="ml-3" style={{ color: "#44B1FC" }}>{jobDetails.JobName}</h4>
                            </div>
                            <div>
                                <h6 style={{ fontSize: "18px" }} className="ml-3">Key tasks and responsibilities : </h6>
                                <ul>
                                    {
                                        jobResponsibility.map((element, key) => {
                                            return (
                                                <li>{element.Responsibility}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div>
                                <h6 style={{ fontSize: "18px" }} className="ml-3">Requirements and qualifications : </h6>
                                <ul>
                                    {
                                        jobRequirements.map((element, key) => {
                                            return (
                                                <li>{element.Requirement}</li>
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


}

export default SavePreview;