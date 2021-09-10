import React, { useState, useEffect } from 'react'
import MUI from 'mui-datatables'
import Icon from 'react-icons-kit'
import applicationController from '../../controllers/application.controller'
import { Switch, Input } from 'antd'
import '../../style/style.css'
import Loading from '../../../loader/components/loader'
import { SearchOutlined } from '@ant-design/icons';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import $ from 'jquery'
import applicantController from '../../../applicants/controllers/applicant.controller'
import { ic_work_outline_twotone } from 'react-icons-kit/md/ic_work_outline_twotone'
import { ic_work_twotone } from 'react-icons-kit/md/ic_work_twotone'
import { ic_cast_for_education } from 'react-icons-kit/md/ic_cast_for_education'
import { ic_computer_twotone } from 'react-icons-kit/md/ic_computer_twotone'
import { ic_language_twotone } from 'react-icons-kit/md/ic_language_twotone'
import Swal from 'sweetalert2'
import SuccessAlert from '../../../alerts/components/successAlert'
const Applications = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [applicationID, setApplicationID] = useState();
    const [applications, setApplications] = useState([]);
    const [application, setApplication] = useState();
    const [applicationStatus, setApplicationStatus] = useState();
    const [applicationQuestions, setApplicationQuestions] = useState([]);
    const [profile, setProfile] = useState();
    const [classList, setClassList] = useState('overflow-auto');
    const [heightList, setHeightList] = useState('700px');

    const [allApplications, setAllApplications] = useState([]);

    const [normalApplication, setNormalApplications] = useState(true);
    const [kedsAcademyApplication, setKedsAcademyApplication] = useState(true);
    const [showYourInteresApplication, setShowYourInterestApplications] = useState(true);


    const onChangeNormalApplications = (value) => {
        if (value === false) {
            let filteredArray = applications.filter(element => {
                return element.applicationTypeId !== 1;
            });
            setApplications(filteredArray);
        }
        else {
            let filteredArray = allApplications.filter(element => {
                return element.applicationTypeId === 1;
            });
            let result = applications.concat(filteredArray);
            setApplications(result);
        }
        setNormalApplications(value);
    }

    const onChangeKedsAcademyApplications = (value) => {
        if (value === false) {
            let filteredArray = applications.filter(element => {
                return element.applicationTypeId !== 3;
            });
            setApplications(filteredArray);
        }
        else {
            let filteredArray = allApplications.filter(element => {
                return element.applicationTypeId === 3;
            });
            let result = applications.concat(filteredArray);
            setApplications(result);
        }
        setKedsAcademyApplication(value);
    }

    const onChangeShowInterestApplications = (value) => {
        if (value === false) {
            let filteredArray = applications.filter(element => {
                return element.applicationTypeId !== 2;
            });
            setApplications(filteredArray);
        }
        else {
            let filteredArray = allApplications.filter(element => {
                return element.applicationTypeId === 2;
            });
            let result = applications.concat(filteredArray);
            setApplications(result);
        }
        setShowYourInterestApplications(value);
    }

    const changeStatus = async (value) => {
        let obj = { ApplicationID: applicationID, Status: value };
        let response = await applicationController.updateApplicationStatus(obj);
        if (response) {
            applications.forEach(element => {
                if (element.id === applicationID) {
                    element.status = value;
                }
            });
            setApplicationStatus(value);
        }
    }

    const getApplications = async () => {
        setIsLoading(true);
        let result = await applicationController.getApplications();
        if (result) {
            setApplications(result);
            setAllApplications(result);
        }
        setIsLoading(false);
    }

    const getApplicationQuestions = async (applicationID, userProfileID) => {
        setApplicationID(applicationID);
        let application = applications.find(a => a.id === applicationID);
        setApplication(application);
        setApplicationStatus(application.status)
        let result = await applicationController.getApplicationQuestions(applicationID);
        if (result) {
            let profile = await applicantController.getApplicantProfile(userProfileID);
            if (profile) {
                setProfile(profile);
                setApplicationQuestions(result);
                $('#applicationDetails').show();
            }
        }
    }

    const sendEmail = async () => {
        let result = await Swal.fire({
            title: 'Are you sure?',
            text: "Email will be sended to this applicant.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        });
        if(result.isConfirmed){

        }
    }

    useEffect(() => {
        const getAll = async () => await getApplications();
        getAll();
    }, []);

    if (isLoading) {
        return (
            <Loading />
        )
    }
    else if (applications.length > 0) {
        return (
            <div className="container-fluid">
                <div className="card p-4 mb-4">
                    <div className="row">
                        <div className="col-lg-2 p-3 column">
                            <div>
                                <label className="black">Job Vacancy</label>
                                <Switch onChange={onChangeNormalApplications} checked={normalApplication} className="ml-2 float-right" />
                            </div>
                            <div>
                                <label className="black">Keds Academy</label>
                                <Switch onChange={onChangeKedsAcademyApplications} checked={kedsAcademyApplication} className="ml-2 float-right" />
                            </div>
                            <div>
                                <label className="black">Show your interest</label>
                                <Switch onChange={onChangeShowInterestApplications} checked={showYourInteresApplication} className="ml-2 float-right" />
                            </div>
                        </div>
                        <div className="col-lg-2 p-3 text-center column">
                            <h5 className="black text-muted">New</h5>
                            <h3 className="black text-info"> {allApplications.filter(element => element.status === "New").length} </h3>
                        </div>
                        <div className="col-lg-2 p-3 text-center column">
                            <h5 className="black text-muted">Hiring</h5>
                            <h3 className="black text-info">{allApplications.filter(element => element.status === "Hired").length}</h3>
                        </div>
                        <div className="col-lg-2 p-3 text-center column">
                            <h5 className="black text-muted">KEDS Academy</h5>
                            <h3 className="black text-info">{allApplications.filter(element => element.applicationTypeId === 3).length}</h3>
                        </div>
                        <div className="col-lg-2 p-3 text-center column">
                            <h5 className="black text-muted">Show your interest</h5>
                            <h3 className="black text-info">{allApplications.filter(element => element.applicationTypeId === 2).length}</h3>
                        </div>
                        <div className="col-lg-2 p-3 text-center column">
                            <h5 className="black text-muted">Total</h5>
                            <h3 className="black text-info">{allApplications.length}</h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className={`col-lg-4 ${classList}`} style={{ height:`${heightList}`}}>
                        <div className="col-lg-12 card p-3 mb-2">
                            <div className="row">
                                <div className="col-lg-12">
                                    <Input type="text" placeholder="Filter by name" prefix={<SearchOutlined />} />
                                </div>
                            </div>
                            <hr />
                            {
                                applications.map((element, key) => {
                                    return (
                                        <div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div class="d-flex justify-content-between">
                                                        <div class="d-flex flex-row align-items-center">
                                                            <div><h2 className="p-2 text-center rrumullaku">{element.aplicantProfile.name.substring(0, 1)}{element.aplicantProfile.surname.substring(0, 1)}</h2> </div>
                                                            <div class="ms-4 c-details">
                                                                <h4 class="mb-0">{element.aplicantProfile.name} {element.aplicantProfile.surname}</h4>
                                                                <span>{element.dayAgo} days ago</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button onClick={() => getApplicationQuestions(element.id, element.aplicantProfileId)} className="btn btn-info">Details <Icon icon={arrowRight2} /> </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {
                        profile &&
                        <div style={{ display: "none" }} id="applicationDetails" className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-12 card p-3 mb-2">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row align-items-center">
                                            <div><h2 className="p-2 text-center rrumullaku">BK</h2> </div>
                                            <div class="ms-4 c-details">
                                                <h4 class="mb-0">{profile ? profile.name + ' ' + profile.surname : ''}</h4>
                                                <span>{application ? application.dayAgo : '0'} days ago</span>
                                            </div>
                                        </div>
                                        <div>
                                            <a class="btn btn-info" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Contact Applicant</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row card p-3 mb-2">
                                <div className="d-flex justify-content-between">
                                    <h5 className="text-muted lead"> <Icon icon={ic_work_outline_twotone} size={30} />
                                        <span className="ml-3"> {application && application.applicationTypeId === 1 || application.applicationTypeId === 3 ? 'Position applied for' : 'Category applied for'} </span>
                                    </h5>
                                    {application && application.applicationTypeId === 1 && <h5 className="text-muted lead">{application.openJob.jobName}</h5>}
                                    {application && application.applicationTypeId === 2 && <h5 className="text-muted lead">{application.category.category}</h5>}
                                    {application && application.applicationTypeId === 3 && 'Keds Academy'}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 card p-3 mb-2">
                                    {
                                        applicationQuestions.map((element, key) => {
                                            return (
                                                <div className="row p-2" key={key}>
                                                    <div className="col-sm-6">
                                                        <p style={{ color: "black" }}> {element.question.question} </p>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <Switch checked={element.hasAnswer === 1 ? true : false} className="float-right"> </Switch>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <textarea type="text" value={element.answer} disabled className="form-control" style={{ marginTop: "-8px" }} />
                                                    </div>
                                                    <br />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="card p-4">
                                    <h6 className="text-muted lead"> <Icon icon={ic_work_twotone} size={30} /> Work Experience</h6>
                                    <hr />
                                    {
                                        profile.applicantWorkExperiences.map((element, key) => {
                                            return (
                                                <div>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <h6 className=""> <b> {element.position} - {element.institution} </b></h6>
                                                            <p style={{ color: "black" }}> {element.startDate.split('T')[0]} - {element.endDate.split('T')[0]} </p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="card p-4">
                                    <h6 className="text-muted lead"> <Icon icon={ic_cast_for_education} size={30} /> Education</h6>
                                    <hr />
                                    {
                                        profile.applicantEducations.map((element, key) => {
                                            return (
                                                <div>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <h6 className=""> <b> {element.institution} - {element.direction} </b></h6>
                                                            <p style={{ color: "black" }}> {element.startDate.split('T')[0]} - {element.endDate.split('T')[0]} </p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="card overflow-auto p-4" style={{ height: "500px" }}>
                                    <h6 className="text-muted lead"> <Icon icon={ic_computer_twotone} size={30} /> Computer Skills</h6>
                                    <hr />
                                    {
                                        profile.applicantSkills.map((element, key) => {
                                            return (
                                                <div>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <h6 className=""> <b> {element.skill} </b></h6>
                                                            <p style={{ color: "black" }}> {element.knowledgeLevel} </p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="card overflow-auto p-4">
                                    <h6 className="text-muted lead"> <Icon icon={ic_language_twotone} size={30} /> Languages</h6>
                                    <hr />
                                    {
                                        profile.applicantLanguages.map((element, key) => {
                                            return (
                                                <div>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <h6 className=""> <b> {element.language} </b></h6>
                                                            <p style={{ color: "black" }}> {element.knowledgeLevel} </p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            )
                                        })
                                    }
                                </div></div>
                        </div>
                    }
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalToggleLabel">Contact Applicant</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div className="row">
                                            <div className=" d-flex justify-content-between align-content-center">
                                                <h6 className="mt-3">Change Status</h6>
                                                <div>
                                                    <select className="form-select rounded ml-2" onChange={(e) => changeStatus(e.target.value)} value={applicationStatus ? applicationStatus : "New"}>
                                                        <option className="text-warning" value="New">New</option>
                                                        <option className="text-info" value="In Review">In Review</option>
                                                        <option className="text-primary" value="Iterview">Iterview</option>
                                                        <option className="text-danger" value="Offered">Offered</option>
                                                        <option className="text-success" value="Hired">Hired</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            {
                                                (applicationStatus != "New" && applicationStatus !== "Reject" && applicationStatus !== "In Review") &&
                                                <div className="col-sm-12 mb-2">
                                                    <label htmlFor="">
                                                        {applicationStatus === "Iterview" && 'Iterview Date'}
                                                        {applicationStatus === "Offered" && 'Offered Expire'}
                                                        {applicationStatus === "Hired" && 'Start Date'}
                                                    </label>
                                                    <input type="date" className="form-control" placeholder="Email subject" />
                                                </div>
                                            }
                                            {
                                                applicationStatus === "Offered" && 
                                                <div className="col-sm-12 mb-2">
                                                    <textarea placeholder="What do you offer?" className="form-control" rows="10"></textarea>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-primary">Send Email</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container-fluid text-center">
                <h5 className="text-muted lead">Does not have any application</h5>
            </div>
        )
    }

}

export default Applications;

