import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-icons-kit'
import {profile} from 'react-icons-kit/icomoon/profile'
import {ic_work_twotone} from 'react-icons-kit/md/ic_work_twotone'
import {ic_cast_for_education} from 'react-icons-kit/md/ic_cast_for_education'
import {ic_computer_twotone} from 'react-icons-kit/md/ic_computer_twotone'
import {ic_language_twotone} from 'react-icons-kit/md/ic_language_twotone'
import {ic_insert_drive_file_twotone} from 'react-icons-kit/md/ic_insert_drive_file_twotone'
import {plusCircle} from 'react-icons-kit/fa/plusCircle'
import UserProfile from './userDataInsert/userProfile'
import UserEducation from './userDataInsert/userEducation'
import UserExperience from './userDataInsert/userExperience'
import UserSkills from './userDataInsert/userSkills'
import UserLanguage from './userDataInsert/userLanguages'
import UserCVPrint from './userDataInsert/userCVPrint';
import {ic_edit_twotone} from 'react-icons-kit/md/ic_edit_twotone'
import $ from 'jquery'
import {list2} from 'react-icons-kit/icomoon/list2'
import {ic_fact_check_twotone} from 'react-icons-kit/md/ic_fact_check_twotone'
import UserApplications from '../../applications/components/userApplications/userApplications'
import {ic_flash_on} from 'react-icons-kit/md/ic_flash_on'
import {heartO} from 'react-icons-kit/fa/heartO'
const UserHome = () => {

    const [component, setComponent] = useState('UserProfile');
    const [classElement, setClass] = useState("col-sm-9");

    const hideorShow = () => {
        $("#list").toggle();
        if(classElement === "col-sm-12"){
            setClass("col-sm-9")
        }else{
            setClass("col-sm-12")
        }
    }

    return (
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-lg-12">
                    <button onClick={hideorShow} className="btn btn-primary ml-3"><Icon icon={list2} /></button>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 mb-2" id="list">
                    <div className="col-lg-12">
                        <div className="card">
                            <a class="list-group-item" onClick={() => setComponent('UserProfile')} > 
                                <Icon icon={profile} size={20} className="mr-3"/> <span> Profile's </span> 
                                <span className="float-right"> <Icon onClick={() => alert('ss')} size={20} icon={ic_edit_twotone} /></span>
                            </a>
                            <a class="list-group-item" onClick={() => setComponent('UserExperience')}> 
                                <Icon icon={ic_work_twotone} size={20} className="mr-3" /> <span> Experience's </span>
                                <span className="float-right"> <Icon onClick={() => alert('ss')} size={20} icon={ic_edit_twotone} /> <Icon onClick={() => alert('ss')} size={20} icon={plusCircle} /> </span>
                            </a>
                            <a class="list-group-item" onClick={() => setComponent('UserEducation')}> 
                                <Icon icon={ic_cast_for_education} size={20} className="mr-3" /> <span> Education's </span>
                                <span className="float-right"> <Icon onClick={() => alert('ss')} size={20} icon={ic_edit_twotone} /> <Icon onClick={() => alert('ss')} size={20} icon={plusCircle} /> </span>
                            </a>
                            <a class="list-group-item" onClick={() => setComponent('UserSkills')}> 
                                <Icon icon={ic_computer_twotone} size={20} className="mr-3" /> <span> Skills's </span>
                                <span className="float-right"> <Icon onClick={() => alert('ss')} size={20} icon={ic_edit_twotone} /> <Icon onClick={() => alert('ss')} size={20} icon={plusCircle} /> </span>
                            </a>
                            <a class="list-group-item" onClick={() => setComponent('UserLanguages')}> 
                                <Icon icon={ic_language_twotone} size={20} className="mr-3" /> <span> Language's </span>
                                <span className="float-right"> <Icon onClick={() => alert('ss')} size={20} icon={ic_edit_twotone} /> <Icon onClick={() => alert('ss')} size={20} icon={plusCircle} /> </span>
                            </a>
                            <a class="list-group-item" onClick={() => setComponent('UserCV')}> 
                                <Icon icon={ic_insert_drive_file_twotone} size={20} className="mr-3" /> <span> CV </span>
                            </a>
                        </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                        <div className="card">
                            <a class="list-group-item" onClick={() => setComponent('MyApplications')} > 
                                <Icon icon={ic_fact_check_twotone} size={20} className="mr-3 text-info"/> <span> My Application's </span> 
                            </a>
                            <a class="list-group-item" onClick={() => setComponent('MyInterests')} > 
                                <Icon icon={heartO} size={20} className="mr-3 text-danger"/> <span> My Interest's </span> 
                            </a>
                            <a class="list-group-item" onClick={() => setComponent('MyKedsApplications')} > 
                                <Icon icon={ic_flash_on} size={20} className="mr-3 text-warning"/> <span> My KEDS Academy Application's </span> 
                            </a>
                        </div>
                    </div>
                </div>
                <div id="components" className={`${classElement}`}>
                    <div className="row">
                        <div className="col-lg-12">
                            { component === "UserProfile" && <UserProfile />  }
                            { component === "UserExperience" && <UserExperience />  }
                            { component === "UserEducation" && <UserEducation />  }
                            { component === "UserSkills" && <UserSkills />  }
                            { component === "UserLanguages" && <UserLanguage />  }
                            { component === "UserCV" && <UserCVPrint /> }
                            { component === "MyApplications" && <UserApplications applicationTypeId={1} />  }
                            { component === "MyInterests" && <UserApplications applicationTypeId={2} />  }
                            { component === "MyKedsApplications" && <UserApplications applicationTypeId={3} />  }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default UserHome;