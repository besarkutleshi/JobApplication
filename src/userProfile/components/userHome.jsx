import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-icons-kit'
import {profile} from 'react-icons-kit/icomoon/profile'
import {ic_work_twotone} from 'react-icons-kit/md/ic_work_twotone'
import {ic_cast_for_education} from 'react-icons-kit/md/ic_cast_for_education'
import {ic_computer_twotone} from 'react-icons-kit/md/ic_computer_twotone'
import {ic_language_twotone} from 'react-icons-kit/md/ic_language_twotone'
import {plusCircle} from 'react-icons-kit/fa/plusCircle'
import UserProfiles from './userDataList/userProfiles'
import UserExperiences from './userDataList/userExperiences'
const UserHome = () => {

    const [component, setComponent] = useState('UserProfile');

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-3 mb-2">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <a class="list-group-item" onClick={() => setComponent('UserProfile')} > 
                                    <Icon icon={profile} size={20} className="mr-3"/> <span> Profile's </span> 
                                </a>
                                <a class="list-group-item" onClick={() => setComponent('UserExperience')}> 
                                    <Icon icon={ic_work_twotone} size={20} className="mr-3" /> <span> Experience's </span>
                                    <span className="float-right"> <Icon onClick={() => alert('ss')} size={20} icon={plusCircle} />  </span>
                                </a>
                                <a class="list-group-item" onClick={() => setComponent('UserEducation')}> 
                                    <Icon icon={ic_cast_for_education} size={20} className="mr-3" /> <span> Education's </span>
                                    <span className="float-right"> <Icon onClick={() => alert('ss')} size={20} icon={plusCircle} />  </span>
                                </a>
                                <a class="list-group-item" onClick={() => setComponent('UserSkills')}> 
                                    <Icon icon={ic_computer_twotone} size={20} className="mr-3" /> <span> Skills's </span>
                                    <span className="float-right"> <Icon onClick={() => alert('ss')} size={20} icon={plusCircle} />  </span>
                                </a>
                                <a class="list-group-item" onClick={() => setComponent('UserLanguages')}> 
                                    <Icon icon={ic_language_twotone} size={20} className="mr-3" /> <span> Language's </span>
                                    <span className="float-right"> <Icon onClick={() => alert('ss')} size={20} icon={plusCircle} />  </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="row">
                        <div className="col-sm-12">
                            { component === "UserProfile" && <UserProfiles />  }
                            { component === "UserExperience" && <UserExperiences />  }
                            { component === "UserEducation" && <UserProfiles />  }
                            { component === "UserSkills" && <UserProfiles />  }
                            { component === "UserLanguages" && <UserProfiles />  }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default UserHome;