import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SuccessAlert from '../../../alerts/components/successAlert';
import ErrorAlert from '../../../alerts/components/errorAlert';
import openJobController from '../../controllers/openJobs.controller'
import { Checkbox } from 'antd';
import Icon from 'react-icons-kit'
import {edit} from 'react-icons-kit/fa/edit'
import loader from '../../../images/loader.gif'
const EditOpenJob = ({ openJobID }) => {

    const openJobs = useSelector((state) => state.openJobs.openJobs);
    const config = useSelector((state) => state.config.headers);
    const requirementsStore = useSelector((state) => state.jobRequirement.openJobsRequirements);
    const responsibilitesStore = useSelector((state) => state.jobResponsibility.openJobsResponsibilities);

    const [isLoading, setIsLoading] = useState(false);
    const [jobName, setJobName] = useState('');
    const [departament, setDepartament] = useState('');
    const [division, setDivision] = useState('');
    const [jobTitleSQ, setTitleSQ] = useState('');
    const [jobTitleEN, setJobTitleEN] = useState('');
    const [jobTitleSR, setJobTitleSR] = useState('');
    const [noEmployeesWanted, setNoEmployeesWanted] = useState(0);
    const [jobLocation, setJobLocation] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [isRemote, setIsRemote] = useState(0);
    const [jobType, setJobType] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [description, setDescription] = useState('')

    useEffect(() => {
        const getObjData = () => {
            let obj = openJobs.find(e => parseInt(e.id) === parseInt(openJobID));
            setJobName(obj.openJobName);
            setDepartament(obj.departament);
            setDivision(obj.division);
            setTitleSQ('');
            setJobTitleEN('');
            setJobTitleSR('');
            setNoEmployeesWanted(obj.noEmployeesWanted);
            setJobLocation(obj.jobLocation);
            setExpireDate(obj.expireDate.split('T')[0]);
            setIsRemote(obj.isRemote);
            setJobType(obj.jobType);
            setExperienceLevel(obj.experienceLevel);
            setDescription(obj.description);
        }
        getObjData();
    }, []);

    const updateJob = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let obj = {Id:parseInt(openJobID), JobName:jobName, Departament:departament, Division:division, NoEmployeesWanted:noEmployeesWanted, JobLocation:jobLocation, ExpireDate:expireDate,
            IsRemote:isRemote, JobType:jobType, ExperienceLevel:experienceLevel,Description:description,UpdateBy:1,IsActive : 1 };
        if(obj.JobName === '' || obj.Departament === '' || obj.Division === '' || obj.NoEmployeesWanted <= 0 || obj.JobLocation === '' || obj.ExpireDate === ''){
            ErrorAlert("Can not add a job without his mandatory data, please check once again!");
            setIsLoading(false);
            return false;
        }
        let updated = await openJobController.updateJob(obj,config);
        updated ? SuccessAlert("Updated Successful") : ErrorAlert("Update Not Successful");
        // window.location = '/'
        setIsLoading(false);
    }


    return (
        <div className="container-fluid">
            <br />
            <br />
            <div className="card p-4">
                <form action="" onSubmit={updateJob}>
                    <div className="row">
                        <div className="col-sm-4">
                            <label htmlFor="">Job Name</label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <input type="text" className="form-control" placeholder="Job Name" value={jobName} onChange={(e) => setJobName(e.target.value)} required />
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Departament</label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <input type="text" className="form-control" placeholder="Departament" value={departament} onChange={(e) => setDepartament(e.target.value)} required/>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Division</label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <input type="text" className="form-control" placeholder="Division" value={division} onChange={(e) => setDivision(e.target.value)} required/>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-4">
                            <label htmlFor="">Job Title - SQ</label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <input type="text" className="form-control" placeholder="Job Title - SQ" value={jobTitleSQ} onChange={(e) => setTitleSQ(e.target.value)} required/>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Job Title - EN</label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <input type="text" className="form-control" placeholder="Job Title - EN" value={jobTitleEN} onChange={(e) => setJobTitleEN(e.target.value)} required/>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Job Title - SR</label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <input type="text" className="form-control" placeholder="Job Title - SR" value={jobTitleSR} onChange={(e) => setJobTitleSR(e.target.value)} required/>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-4">
                            <label htmlFor="">No. of Employees wanted</label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <input type="number" className="form-control" placeholder="No. of Employees wanted" value={noEmployeesWanted} onChange={(e) => setNoEmployeesWanted(e.target.value)} required/>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Job Location</label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <input type="text" className="form-control" placeholder="Job Location" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} required/>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Expire Date</label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <input type="date" className="form-control" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} required/>
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
                    { isLoading && <img src={loader} alt="" className="float-right" width="80" height="80" /> }
                    <br />
                    <div className="row">
                        <button type="submit" className="btn btn-primary"> <Icon icon={edit} /> Update Job Details</button>
                    </div>
                </form>
            </div>
        </div>
    )


}


export default EditOpenJob;