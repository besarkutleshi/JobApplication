import React from 'react'
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import '../../userProfile/style/progressBar.css'
import ApplyJob from './applyJob'
import ApplicationQuestions from './applicationQuestions';

const ApplyProgress = ({...props}) => {

    return (
        <div style={{marginTop:"-70px"}}>
            <br />
            <StepProgressBar
                startingStep={0}
                contentClass={"contentClass"}
                steps={[
                    {
                        label: 'Questions',
                        subtitle: '50%',
                        name: 'step 1',
                        state:"CURRENT",
                        content: <ApplicationQuestions applicationTypeId={1} />
                    },
                    {
                        label: 'Confirm',
                        subtitle: '100%',
                        name: 'step 2',
                        content: <ApplyJob idJob={props.match.params.jobId} />
                    },
                ]}
            />
        </div>
    )
}

export default ApplyProgress;