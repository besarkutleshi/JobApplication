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
                            name: 'step 1',
                            content: <EditOpenJob openJobID={openJobID} />
                        },
                        {
                            label: 'Key Tasks & Responsibilities',
                            name: 'step 2',
                            content: <EditOpenJobResponsibilities openJobID={openJobID} />,
                            // validator:validateJobResponsibilites
                        },
                        {
                            label: 'Requirements & Qualifications',
                            name: 'step 3',
                            content: <EditOpenJobRequirements openJobID={openJobID} />
                        }
                    ]}
                />
        </div>
    )
}

export default EditOpenJobProgress;