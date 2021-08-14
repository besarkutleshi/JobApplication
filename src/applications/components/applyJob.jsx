import React, {useState, useEffect} from 'react'
import { Checkbox } from 'antd';
import Icon from 'react-icons-kit'
import {check} from 'react-icons-kit/fa/check'
import { useSelector } from 'react-redux'
import {arrowLeft2} from 'react-icons-kit/icomoon/arrowLeft2'

const ApplyJob = ({...props}) => {

    const openJobsStore = useSelector((state) => state.openJobs.openJobs);
    const user = useSelector((state) => state.login.user);
    console.log(user);

    const [jobId, setJobId] = useState(props.match.params.jobId);
    const [responsiblity, setResponsibility] = useState(false);
    const [savePersonalData, setSavePersonalData] = useState(false);
    const [job, setJob] = useState('');

    useEffect(() => {
        let job = openJobsStore.find(o => parseInt(o.id) === parseInt(jobId));
        setJob(job);
    },[])

    return(
        <div className="container card p-4">
            <div className="row d-flex justify-content-center">
                <div className="col-sm-5 p-5 card">
                    <div className="d-flex justify-content-between">
                        {job.openJobName}
                        <a className="text-info" href={`/#/activeJobDetails/${job.id}`}> Details </a>
                    </div>
                </div>
                <div className="col-sm-5 p-5 card ml-2">
                    {job.openJobName}
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="row">
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
                    <button className="btn btn-info"> <Icon icon={check} /> Apply </button>
                </div>
            </div>
        </div>
    )

}

export default ApplyJob;