import React, { useState, useEffect } from 'react'
import { Checkbox } from 'antd';
import Icon from 'react-icons-kit'
import { check } from 'react-icons-kit/fa/check'
import { useSelector } from 'react-redux'
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2'
import ApplicationQuestions from './applicationQuestions';
import { check as conditions } from 'react-icons-kit/iconic/check'
import ErrorAlert from '../../../alerts/components/errorAlert'
import applicationController from '../../controllers/application.controller';
import SuccessAlert from '../../../alerts/components/successAlert'
import helper from '../../../shared/helpers/helper';
import loader from '../../../images/loader.gif'
import jobCategoryController from '../../../openjobs/controllers/jobCategory.controller';
import { Select } from 'antd';
import emailController from '../../../shared/email/email.controller'
const { Option } = Select;
const ApplyJob = ({ ...props }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [idJob, setIdJob] = useState(props.match.params.jobId ? props.match.params.jobId : 0);
    const [applicationTypeId, setapplicationTypeId] = useState(props.match.params.applicationTypeId);
    const user = useSelector((state) => state.login.user);
    const openJobsStore = useSelector((state) => state.openJobs.openJobs);
    const [jobName, setJobName] = useState('');
    const profile = useSelector((state) => state.profile.profile);
    const aplicantQuestions = useSelector((state) => state.applicantQuestions.questions);
    const [responsiblity, setResponsibility] = useState(false);
    const [savePersonalData, setSavePersonalData] = useState(false);
    const [categoryId, setCategoryId] = useState();
    const [categories, setCategories] = useState([]);

    const getJobName = () => {
        if (idJob > 0) {
            let obj = openJobsStore.find(o => parseInt(o.id) === parseInt(idJob));
            if (obj) {
                setJobName(obj.openJobName);
            }
        }
    }

    const getJobCategories = async () => {
        let result = await jobCategoryController.getCategories({});
        if (result) {
            setCategories(result)
        }
    }

    useEffect(() => {
        const getJob = async () => {
            getJobName();
            await getJobCategories();
        }
        getJob();
    }, [])

    const createProfile = async () => {
        setIsLoading(true);
        let obj = aplicantQuestions.find(element => element.hasAnswer === 1 && (!element.answer || element.answer === ''));
        let body = `Hello ${profile.name}, <br/><br/> Thank you for your application and your interest in KEDS Company. <br /><br/> We will screen your application 
                    carefully and get back to you as soon as possible. Please understand that this can take a couple of days. <br /><br/> If you have any questions in the meantime
                    please don't hesitate to contact us via hr@keds-energy.com! <br /><br/> Thank you and best wishes,<br/> KEDS Company`;
        if (obj) {
            ErrorAlert("Please fill question description if you switched to ON any question!");
            return;
        }
        if (responsiblity && savePersonalData) {
            let obj = '';
            if (parseInt(applicationTypeId) === 1) {
                obj = { id: 0, userId: user.userId, aplicantProfileId: profile.id, openJobId: idJob, applicationTypeId: applicationTypeId, aplicantQuestions: aplicantQuestions, insertBy: user.userId };
            }
            else if (parseInt(applicationTypeId) === 2) {
                obj = { id: 0, userId: user.userId, aplicantProfileId: profile.id, categoryID:categoryId, openJobId: null, applicationTypeId: applicationTypeId, aplicantQuestions: aplicantQuestions, insertBy: user.userId };
            }
            else if (parseInt(applicationTypeId) === 3) {
                obj = { id: 0, userId: user.userId, aplicantProfileId: profile.id, openJobId: null, applicationTypeId: applicationTypeId, aplicantQuestions: aplicantQuestions, insertBy: user.userId };
            }
            let created = await applicationController.createApplication(obj);
            if (created > 1) {
                let emailed = await emailController.sendEmail(user.username,"Your application at KEDS Company",body);
                SuccessAlert("Application send successful.");
                window.location.hash = "/userHome";
                return;
            }
        }
        else {
            ErrorAlert("Please read check conditions");
        }
        setIsLoading(false);
    }

    const fields = () => {
        if (parseInt(applicationTypeId) === 1) {
            return (
                <div className="row">
                    <div className="col-sm-12 d-flex justify-content-around">
                        <label htmlFor="">Position</label>
                        <h6 className="lead"> {jobName} </h6>
                    </div>
                </div>
            )
        }
        else if (parseInt(applicationTypeId) === 2) {
            return (
                <div className="row">
                    <div className="col-sm-4">
                        <Select
                            showSearch
                            style={{ width: 350 }}
                            placeholder="Select category"
                            size="large"
                            className="mb-2"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e)}
                        >
                            {
                                categories.map((element, key) => {
                                    return (
                                        <Option key={key} value={element.id}>{element.category}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="row">
                    <div className="col-sm-12 d-flex justify-content-around">
                        <label htmlFor="">Position</label>
                        <h6 className="lead"> KEDS Academy </h6>
                    </div>
                </div>
            )
        }
    }


    return (
        <div className="container-fluid card p-4">
            {
                fields()
            }
            <hr />
            <div className="row">
                <div className="col-sm-6" style={{ borderRight: "1px solid" }}>
                    <ApplicationQuestions applicationTypeId={parseInt(applicationTypeId)} />
                </div>
                <div className="col-sm-6">
                    <div className="row p-2">
                        <div className="col-sm-12 ml-4">
                            <Icon size={30} icon={conditions} /> <span className="ml-4">Check Conditions</span>
                        </div>
                    </div>
                    <br />
                    <div className="row p-2">
                        <div className="col-sm-12 mb-5">
                            <Checkbox checked={responsiblity} onChange={(e) => setResponsibility(e.target.checked)} >
                                <h5>
                                    Responsibility - I hereby confirm that the information
                                    I have provided in this application is true. Therefore, I authorize KEDS to investigate any statements contained in this application, but not limited
                                    to the statements of this applications, but also other information that KEDS considers relevant. I understand that any false information provided,
                                    in this application may prevent me from being employed or result in immediate termination of employment.
                                </h5>
                            </Checkbox>
                        </div>
                        <div className="col-sm-12">
                            <Checkbox checked={savePersonalData} onChange={(e) => setSavePersonalData(e.target.checked)} >
                                <h5>
                                    KEDS would like to draw the attention of interesed cadidates that any information they submit regarding the expression of their
                                    interest in the application, will be treated immediately with a level of security of the highest standards in full compliance with the
                                    provisions of Law no. 06 / L-082_On the protection of personal data and bylaws issued in its implementation. Also by, providing this information,
                                    the interesed cadidates declare and approve the fruther processing of personal data by KEDS only for internal use of the company, and only
                                    for the purpose for which they have voluntarily declared this data.
                                </h5>
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-12 d-flex justify-content-between">
                    <a href={`/#/activeJobDetails/${idJob}`} className="btn btn-info"> <Icon icon={arrowLeft2} /> Back </a>
                    {isLoading && <img src={loader} alt="" className="float-right" width="80" height="80" />}
                    {helper.validUsername(user.username) && <button onClick={() => createProfile()} className="btn btn-info"> <Icon icon={check} /> Apply Online </button>}
                    {helper.validUsername(user.username) || !user.username &&
                        <button onClick={() => createProfile()} className="btn btn-info"><Icon icon={check}/> Apply Online</button> }
                </div>
            </div>
        </div>
    )

}

export default ApplyJob;