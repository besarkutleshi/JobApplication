import React, { useState } from 'react'
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import UserProfile from './userProfile'
import UserEducation from './userEducation';
import UserExperience from './userExperience'
import UserSkills from './userSkills'
import UserLanguages from './userLanguages'
import '../../style/progressBar.css'

const UserProfileProgress = () => {

    const [component, setComponent] = useState('Personal Information');

    const workExperience = () => {
        setComponent("Work Experience")
        return true;
    }

    const step2Validator = () => {
        setComponent("Work Experience")
        return true;
    }

    const step3Validator = () => {
        return true;
    }

    const onFormSubmit = () => {
        alert('success')
    }

    return (
        <div style={{marginTop:"-70px"}}>
            <br />
            {/* <div className="row">
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-between">
                    <div>
                        <h4 className="text-muted lead p-3 pr-5" style={{ border: '1px solid gray' }}><b>Reporting Analystic</b></h4>
                    </div>
                    <div style={{ borderLeft: "1px solid black" }}>
                        <img src={kedsLogo} className="p-3" alt="" />
                    </div>
                </div>
            </div> */}
            <br />
            <StepProgressBar
                startingStep={0}
                onSubmit={onFormSubmit}
                contentClass={"contentClass"}
                steps={[
                    {
                        label: 'Personal Data',
                        subtitle: '20%',
                        name: 'step 1',
                        state:"CURRENT",
                        content: <UserProfile />,
                        validator: workExperience,
                    },
                    {
                        label: 'Work Experience',
                        subtitle: '40%',
                        name: 'step 2',
                        content: <UserExperience />,
                        validator: step2Validator,
                    },
                    {
                        label: 'Education',
                        subtitle: '60%',
                        name: 'step 3',
                        content: <UserEducation />,
                        validator: step3Validator
                    },
                    {
                        label: 'Skills',
                        subtitle: '85%',
                        name: 'step 4',
                        content: <UserSkills />,
                        validator: step3Validator
                    },
                    {
                        label: 'Languages',
                        subtitle: '95%',
                        name: 'step 5',
                        content: <UserLanguages />
                    },
                    {
                        label: 'CV Review',
                        subtitle: '100%',
                        name: 'step 6',
                    }
                ]}
            />
        </div>

    )
}

export default UserProfileProgress;