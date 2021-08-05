import React from 'react'
import EditOpenJob from './editOpenJonDetails'
import EditOpenJobRequirements from './editOpenJobRequirements'
import EditOpenJobResponsibilities from './editOpenJobResponsibilites'
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import Icon from 'react-icons-kit'
import {arrowLeft2} from 'react-icons-kit/icomoon/arrowLeft2'
import { Link } from 'react-router-dom'


const EditOpenJobProgress = ({openJobID}) => {
    return(
        <div className="container-fluid" style={{marginTop:"-50px"}}>
            <div className="row">
                <div className="col-sm-12">
                    <Link to={{ pathname:`/openJobDetail/${openJobID}`, state: {openJobID : openJobID} }} className="btn btn-primary"><Icon icon={arrowLeft2} /> </Link>
                </div>
            </div>
            <StepProgressBar
                    startingStep={0}
                    contentClass={"contentClass"}
                    // onSubmit={addJob}
                    steps={[
                        {
                            label: 'Job Details',
                            subtitle: '25%',
                            name: 'step 1',
                            content: <EditOpenJob openJobID={openJobID} />
                        },
                        {
                            label: 'Key Tasks & Responsibilities',
                            subtitle: '50%',
                            name: 'step 2',
                            // content: <JobResponsibilites />,
                            // validator:validateJobResponsibilites
                        },
                        {
                            label: 'Requirements & Qualifications',
                            subtitle: '75%',
                            name: 'step 3',
                            // content: <JobReuqirements />,
                            // validator:validateJobRequirements
                        },
                        {
                            label: 'Save & Preview',
                            subtitle: '100%',
                            name: 'step 3',
                            // content: <SavePreview />
                        }
                    ]}
                />
        </div>
    )
}

export default EditOpenJobProgress;