import React, { useState, useEffect } from 'react'
import applicantController from '../controllers/applicant.controller'
import Loading from '../../loader/components/loader';
import { Radio } from 'antd';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Icon from 'react-icons-kit'
import {ic_cast_for_education} from 'react-icons-kit/md/ic_cast_for_education'
import {ic_work_twotone} from 'react-icons-kit/md/ic_work_twotone'
import {ic_computer_twotone} from 'react-icons-kit/md/ic_computer_twotone'
import {ic_language_twotone} from 'react-icons-kit/md/ic_language_twotone'
import {profile as ProfileIcon} from 'react-icons-kit/icomoon/profile'
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';
import { Link } from 'react-router-dom';
const ApplicantDetails = ({ ...props }) => {

    console.log(props);
    const [isLoading, setIsLoading] = useState(false);
    const [applicantID, setApplicantID] = useState(props.id);
    const [profile, setProfile] = useState();

    const getProfile = async () => {
        setIsLoading(true);
        if (applicantID < 1) {
            return;
        }
        let profile = await applicantController.getApplicantProfile(applicantID);
        console.log(profile);
        if (profile) {
            setProfile(profile);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const profile = async () => await getProfile();
        profile();
    }, []);


    if (isLoading) {
        return (
            <Loading />
        )
    }
    else if (profile) {
        return (
            <div className="container-fluid">
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <Link to={{pathname:"/applicants"}} className="btn btn-info"> <Icon icon={arrowLeft2}/> </Link>
                    </div>
                </div>
                <div className="card p-4">
                    <h6 className="lead"> <Icon icon={ProfileIcon} size={30} /> Personal Data</h6>
                    <hr />
                    <br />
                    <div className="row">
                        <div className="col-lg-3 text-center">
                            <label htmlFor="">Image</label>
                            <div class="image-upload ml-3" style={{ marginTop: "50px", cursor: "auto" }}>
                                {
                                    profile.imageBytes && <label for="file-input">  <img id="my-img" className="rounded img-fluid" src={`data:image/png;base64, ${profile.imageBytes}`} alt="" width={150} height={150} /></label>
                                }
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Name</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={profile.name} required />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Surname</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={profile.surname} required />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Middle Name</label>
                                    <label htmlFor="" className="float-right" style={{ fontSize: "10px" }}>Optional</label>
                                    <input type="text" className="form-control" value={profile.middleName} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Personal Number </label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="input" className="form-control" value={profile.personalNumber} required />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Birthday</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="date" className="form-control" value={profile.birthDate.split('T')[0]} required />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Birth Place</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={profile.birthPlace} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Current Nationality</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" value={profile.currentCountry} className="form-control" required />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Birth Nationality</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={profile.birthCountry} />
                                </div>
                                <div className="col-lg-4 mb-2" style={{ marginTop: "40px" }}>
                                    <label htmlFor="">Gender</label>
                                    <Radio.Group className="ml-2" value={profile.gender}>
                                        <Radio value={"M"}>Male</Radio>
                                        <Radio value={"F"}>Female</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Permanent Address </label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={profile.address} required />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Phone Number</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <PhoneInput
                                        className="form-control"
                                        placeholder="Phone Number"
                                        value={profile.phone} />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Email Address</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={profile.email} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <br />
                <div className="card p-4">
                    <h6 className="text-muted lead"> <Icon icon={ic_work_twotone} size={30} /> Work Experience</h6>
                    <hr />
                    {
                        profile.applicantWorkExperiences.map((element,key) => {
                            return(
                                <div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h6 className=""> <b> {element.position} - {element.institution} </b></h6>
                                        <p style={{color:"black"}}> {element.startDate.split('T')[0]} - {element.endDate.split('T')[0]} </p>
                                    </div>
                                </div>
                                <hr />
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <div className="card p-4">
                    <h6 className="text-muted lead"> <Icon icon={ic_cast_for_education} size={30} /> Education</h6>
                    <hr />
                    {
                        profile.applicantEducations.map((element,key) => {
                            return(
                                <div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h6 className=""> <b> {element.institution} - {element.direction} </b></h6>
                                        <p style={{color:"black"}}> {element.startDate.split('T')[0]} - {element.endDate.split('T')[0]} </p>
                                    </div>
                                </div>
                                <hr />
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <div className="card overflow-auto p-4" style={{height:"500px"}}>
                    <h6 className="text-muted lead"> <Icon icon={ic_computer_twotone} size={30} /> Computer Skills</h6>
                    <hr />
                    {
                        profile.applicantSkills.map((element,key) => {
                            return(
                                <div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h6 className=""> <b> {element.skill} </b></h6>
                                        <p style={{color:"black"}}> {element.knowledgeLevel} </p>
                                    </div>
                                </div>
                                <hr />
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <div className="card overflow-auto p-4">
                    <h6 className="text-muted lead"> <Icon icon={ic_language_twotone} size={30} /> Languages</h6>
                    <hr />
                    {
                        profile.applicantLanguages.map((element,key) => {
                            return(
                                <div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h6 className=""> <b> {element.language} </b></h6>
                                        <p style={{color:"black"}}> {element.knowledgeLevel} </p>
                                    </div>
                                </div>
                                <hr />
                                </div>
                            )
                        })
                    }
                </div>
                <br />
            </div>
        )
    }
    else {
        return (
            <div className="container-fluid text-center">
                <h5 className="text-muted lead">This applicant does not have details!</h5>
            </div>
        )
    }


}

export default ApplicantDetails;