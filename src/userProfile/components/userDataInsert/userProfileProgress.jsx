import React, { useState, useEffect } from 'react'
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import UserProfile from './userProfile'
import UserEducation from './userEducation';
import UserExperience from './userExperience'
import UserSkills from './userSkills'
import UserLanguages from './userLanguages'
import UserCVPrint from './userCVPrint';
import '../../style/progressBar.css'
import {useSelector} from 'react-redux'

const UserProfileProgress = () => {

    const profile = useSelector((state) => state.profile.profile)

    const onFormSubmit = () => {
        alert('success')
    }

    return (
        <div style={{marginTop:"-70px"}}>
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
                        content: <UserProfile />
                    },
                    {
                        label: 'Work Experience',
                        subtitle: '40%',
                        name: 'step 2',
                        content: <UserExperience />
                    },
                    {
                        label: 'Education',
                        subtitle: '60%',
                        name: 'step 3',
                        content: <UserEducation />
                    },
                    {
                        label: 'Skills',
                        subtitle: '85%',
                        name: 'step 4',
                        content: <UserSkills />
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
                        content: <UserCVPrint />
                    }
                ]}
            />
        </div>

    )
}

export default UserProfileProgress;