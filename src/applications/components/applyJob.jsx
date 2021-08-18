import React, {useState, useEffect} from 'react'
import { Checkbox } from 'antd';
import Icon from 'react-icons-kit'
import {check} from 'react-icons-kit/fa/check'
import { useSelector } from 'react-redux'
import {arrowLeft2} from 'react-icons-kit/icomoon/arrowLeft2'
import ApplicationQuestions from './applicationQuestions';
import {check as conditions} from 'react-icons-kit/iconic/check'
import ErrorAlert from '../../alerts/components/errorAlert'
import applicationController from '../controllers/application.controller';
import SuccessAlert from '../../alerts/components/successAlert'
const ApplyJob = ({...props}) => {

    const [idJob, setIdJob] = useState(props.match.params.jobId);
    const [applicationTypeId, setapplicationTypeId] = useState(props.match.params.applicationTypeId);
    const user = useSelector((state) => state.login.user);
    const profile = useSelector((state) => state.profile.profile);
    const aplicantQuestions = useSelector((state) => state.applicantQuestions.questions);
    const [responsiblity, setResponsibility] = useState(false);
    const [savePersonalData, setSavePersonalData] = useState(false);


    const createProfile = async () => {
        if(responsiblity && savePersonalData){
            let obj = {id:0,userId:user.userId,aplicantProfileId:profile.id,openJobId:idJob,applicationTypeId:applicationTypeId,aplicantQuestions:aplicantQuestions};
            let created = await applicationController.createApplication(obj);
            if(created > 1){
                SuccessAlert("Application send successful.");
                return;
            }
            ErrorAlert("Application does not send successful!");
        }
        else{
            ErrorAlert("Please read check conditions");
        }
    }

    return(
        <div className="container card p-4">
            <ApplicationQuestions applicationTypeId={1} />
            <hr />
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
            <br />
            <br />
            <div className="row">
                <div className="col-sm-12 d-flex justify-content-between">
                    <button className="btn btn-info"> <Icon icon={arrowLeft2} /> Back </button>
                    <button onClick={createProfile} className="btn btn-info"> <Icon icon={check} /> Apply </button>
                </div>
            </div>
        </div>
    )

}

export default ApplyJob;