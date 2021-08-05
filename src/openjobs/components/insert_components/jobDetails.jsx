import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox } from 'antd';
import { Radio } from 'antd';
import { useEffect } from 'react';
import { addJobDetails } from '../../reduxStore/reducers/action'
import { bindActionCreators } from 'redux'
import Loading from '../../../loader/components/loader'
const JobDetails = () => {


    const openJobDetails = useSelector((state) => state.openJobs.openJob);
    const dispatch = useDispatch();
    const addJobDetailsStore = bindActionCreators(addJobDetails, dispatch);

    const [jobName, setJobName] = useState(openJobDetails ? openJobDetails.JobName : '');
    const [departament, setDepartament] = useState(openJobDetails ? openJobDetails.Departament : '');
    const [division, setDivision] = useState(openJobDetails ? openJobDetails.Division : '');
    const [jobTitleSQ, setTitleSQ] = useState(openJobDetails ? openJobDetails.JobTitleSQ : '');
    const [jobTitleEN, setJobTitleEN] = useState(openJobDetails ? openJobDetails.JobTitleEN : '');
    const [jobTitleSR, setJobTitleSR] = useState(openJobDetails ? openJobDetails.JobTitleSR : '');
    const [noEmployeesWanted, setNoEmployeesWanted] = useState(openJobDetails ? openJobDetails.NoEmployeesWanted : 0);
    const [jobLocation, setJobLocation] = useState(openJobDetails ? openJobDetails.JobLocation : '');
    const [expireDate, setExpireDate] = useState(openJobDetails ? openJobDetails.ExpireDate : '');
    const [isRemote, setIsRemote] = useState(openJobDetails ? openJobDetails.IsRemote : 0);
    const [jobType, setJobType] = useState(openJobDetails ? openJobDetails.JobType : '');
    const [experienceLevel, setExperienceLevel] = useState(openJobDetails ? openJobDetails.ExperienceLevel : '');
    const [description, setDescription] = useState(openJobDetails ? openJobDetails.Description : '')


    useEffect(() => {
        addOpenJobDetails();
    }, [jobName, departament, division, jobTitleSQ, jobTitleEN, jobTitleSR, noEmployeesWanted, jobLocation, expireDate, isRemote, jobType, experienceLevel, description])


    const addOpenJobDetails = () => {
        let jobDetails = {
            JobName: jobName,
            Departament: departament,
            Division: division,
            JobTitleSQ: jobTitleSQ,
            JobTitleEN: jobTitleEN,
            JobTitleSR: jobTitleSR,
            NoEmployeesWanted: noEmployeesWanted,
            JobLocation: jobLocation,
            ExpireDate: expireDate,
            IsRemote: isRemote,
            JobType: jobType,
            ExperienceLevel: experienceLevel,
            Description: description
        }
        addJobDetailsStore(jobDetails);
    }

    if (!openJobDetails) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <div className="container-fluid">
                <div className="card p-4">
                    <form action="">
                        <div className="row">
                            <div className="col-sm-4">
                                <label htmlFor="">Job Name</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" placeholder="Job Name" value={jobName} onChange={(e) => setJobName(e.target.value)} />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="">Departament</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" placeholder="Departament" value={departament} onChange={(e) => setDepartament(e.target.value)} />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="">Division</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" placeholder="Division" value={division} onChange={(e) => setDivision(e.target.value)} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-4">
                                <label htmlFor="">Job Title - SQ</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" placeholder="Job Title - SQ" value={jobTitleSQ} onChange={(e) => setTitleSQ(e.target.value)} />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="">Job Title - EN</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" placeholder="Job Title - EN" value={jobTitleEN} onChange={(e) => setJobTitleEN(e.target.value)} />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="">Job Title - SR</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" placeholder="Job Title - SR" value={jobTitleSR} onChange={(e) => setJobTitleSR(e.target.value)} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-4">
                                <label htmlFor="">No. of Employees wanted</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="number" className="form-control" placeholder="No. of Employees wanted" value={noEmployeesWanted} onChange={(e) => setNoEmployeesWanted(e.target.value)} />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="">Job Location</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" placeholder="Job Location" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="">Expire Date</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="date" className="form-control" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-4">
                                <label htmlFor="">Job Type</label>
                                <label htmlFor="" className="float-right lead" style={{ fontSize: "13px" }}>Optional</label>
                                <select className="form-select" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Full Time"> Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Commision Only">Commision Only</option>
                                    <option value="Temporary">Temporary</option>
                                    <option value="Intership">Intership</option>
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="">Experience Level</label>
                                <label htmlFor="" className="float-right lead" style={{ fontSize: "13px" }}>Optional</label>
                                <select className="form-select" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Entry Level">Entry Level</option>
                                    <option value="Junior Level">Junior Level</option>
                                    <option value="Mid Level">Mid Level</option>
                                    <option value="Senior Level">Senior Level</option>
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="">Is Remote</label>
                                <label htmlFor="" className="float-right lead" style={{ fontSize: "13px" }}>Optional</label>
                                <Checkbox style={{ fontSize: "15px" }} checked={isRemote === 1 ? true : false}
                                    onChange={(e) => setIsRemote(e.target.checked === true ? 1 : 0)} >
                                    This is a remote or work from home job. Candidates can be anywhere in the country/world
                                </Checkbox>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-12">
                                <label htmlFor="" className="float-left">Description</label>
                                <label htmlFor="" className="float-right lead" style={{ fontSize: "13px" }}>Optional</label>
                                <textarea type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <br />
                        {/* <div className="row">
                            <button type="submit" className="btn btn-primary"> Save Job Details</button>
                        </div> */}
                    </form>
                </div>
            </div>
        )
    }


}

export default JobDetails;