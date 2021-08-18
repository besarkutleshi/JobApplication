import React from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-icons-kit'
import { location } from 'react-icons-kit/icomoon/location'
import { ic_email } from 'react-icons-kit/md/ic_email'
import { ic_phone } from 'react-icons-kit/md/ic_phone'
const UserCV = () => {

    const user = useSelector((state) => state.login.user);
    const profile = useSelector((state) => state.profile.profile);
    const experiences = useSelector((state) => state.userExperience.userExperiences);
    const educations = useSelector((state) => state.userEducation.userEducations);
    const skills = useSelector((state) => state.userSkills.userSkills);
    const languages = useSelector((state) => state.userLanguages.userLanguages);

    return (
        <div className="container">
            <br />
            <div className="">
                <div className="row">
                    <div className="col-sm-4" style={{ backgroundColor: "#fafafa" }}>
                        <br />
                        <div className="ml-4">
                            <h4>{profile.name}</h4>
                            <h5 className="lead ml-4" style={{ marginTop: "-14px" }}>{profile.surname}</h5>
                            <br />
                            <h6 className="text-info">DATE OF BIRTH</h6>
                            <p className="ml-4" style={{ marginTop: "-14px", color: "black" }}><b>{profile.birthDate.split('T')[0]}</b></p>
                        </div>
                        <div>
                            <h5 className="ml-4">Contact</h5>
                            <p className="ml-5 text-info"><b> <span style={{ color: "black" }}> Nationality : </span></b> {profile.currentCountry} </p>
                            <p className="ml-5 text-info"><b> <span style={{ color: "black" }}> Gender : </span></b> {profile.gender === "M" ? "Male" : "Female"} </p>
                            <p className="ml-2 text-info"> <Icon size={25} icon={location} /> <b> <span className="ml-2" style={{ color: "black" }}> Address : </span></b> {profile.address} </p>
                            <p className="ml-2 text-info"> <Icon size={25} icon={ic_email} /> <b> <span className="ml-2" style={{ color: "black" }}> Email : </span></b> {profile.email} </p>
                            <p className="ml-2 text-info"> <Icon size={25} icon={ic_phone} /> <b> <span className="ml-2" style={{ color: "black" }}> Phone : </span></b> {profile.phone} </p>
                        </div>
                        <br />
                    </div>
                    <div className="col-sm-8">
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <p style={{ fontSize: "28px", color: "#5A5A5A" }}>WORK EXPERIENCE</p>
                            </div>
                        </div>
                        {
                            experiences.map((element, key) => {
                                return (
                                    <div>
                                        <div className="row" key={key}>
                                            <div style={{ width: "900px" }}>
                                                <p className="ml-5"> <span className="text-info"> <b> {element.startDate.split('T')[0]} – {element.endDate.split('T')[0]} </b> </span> –  <span className="text-info"> {element.address}, {element.city}, {element.country} </span></p>
                                                <h5 className="ml-5" style={{ color: "#5A5A5A", fontSize: "20px", marginTop: "-10px" }}> <b> {element.position} </b></h5>
                                                <p className="ml-5" style={{ fontSize: "20px", color: "#5A5A5A", marginTop: "-10px" }}>{element.institution}</p>
                                                <p style={{ fontSize: "18px", color: "#5A5A5A", marginTop: "-10px", marginLeft: "60px" }} >
                                                    {
                                                        element.description.split('.').map((element,key) => {
                                                            return(
                                                                <span>{element} <br /></span>
                                                            )
                                                        })
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="row">
                            <div className="col-md-12">
                                <p style={{ fontSize: "28px", color: "#5A5A5A" }}>EDUCATION AND TRAINING</p>
                            </div>
                        </div>
                        {
                            educations.map((element, key) => {
                                return (
                                    <div>
                                        <div className="row" key={key}>
                                            <div style={{ width: "900px" }}>
                                                <p className="ml-5"> <span className="text-info"> <b> {element.startDate.split('T')[0]} – {element.endDate.split('T')[0]} </b> </span> –  <span className="text-info"> {element.address}, {element.city}, {element.country} </span></p>
                                                <h5 className="ml-5" style={{ color: "#5A5A5A", fontSize: "20px", marginTop: "-10px" }}> <b> {element.direction} </b></h5>
                                                <p className="ml-5" style={{ fontSize: "20px", color: "#5A5A5A", marginTop: "-10px" }}>{element.institution}</p>
                                                <p style={{ fontSize: "18px", color: "#5A5A5A", marginTop: "-10px", marginLeft: "60px" }} >{element.description}</p>
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                )
                            })
                        }
                        <div className="row">
                            <div className="col-md-12">
                                <p style={{ fontSize: "28px", color: "#5A5A5A" }}>LANGUAGE SKILLS</p>
                                <div className="d-flex justify-content-around">
                                    <p className="text-info"> Language </p>
                                    <p className="text-info"> Level of Knowledge </p>
                                </div>
                            </div>
                        </div>
                        {
                            languages.map((element, key) => {
                                return (
                                    <div>
                                        <div className="row" key={key}>
                                            <div className="d-flex justify-content-around">
                                                <p style={{ color: "#5A5A5A" }}> {element.language} </p>
                                                <p style={{ color: "#5A5A5A" }}> {element.knowledgeLevel} </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <p style={{ fontSize: "28px", color: "#5A5A5A" }}>DIGITAL SKILLS</p>
                            </div>
                        </div>
                        <div>
                            <div className="row">
                                <div style={{ width: "900px" }} className="d-flex">
                                    <p style={{ fontSize: "18px" }} className="ml-5 text-info">
                                        {
                                            skills.map((element, key) => element.skill + ' / ')
                                        }
                                    </p>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default UserCV;