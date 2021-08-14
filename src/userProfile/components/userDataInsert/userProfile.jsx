import React, { useState } from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import { Radio } from 'antd';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Icon from 'react-icons-kit'
import { userPlus } from 'react-icons-kit/icomoon/userPlus'
import userProfileController from '../../controllers/userProfile.controller';
import SuccessAlert from '../../../alerts/components/successAlert'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProfile } from '../../reduxStore/action'
import { ic_delete_sweep } from 'react-icons-kit/md/ic_delete_sweep'
import { ic_file_download_done } from 'react-icons-kit/md/ic_file_download_done'
const UserData = () => {

    const dispatch = useDispatch();
    const addProfileStore = bindActionCreators(addProfile, dispatch);
    const user = useSelector((state) => state.login.user);

    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(0);
    const [photo, setPhoto] = useState();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [personalNumber, setPersonalNumber] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [birthPlace, setBirthPlace] = useState('');
    const [birthNationality, setBirthNationality] = useState('');
    const [currentNationality, setCurrentNationality] = useState('');
    const [gender, setGender] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [permanentEmail, setPermantentEmail] = useState('');
    const [submit, setSubmit] = useState('Add Profile Data');

    const createProfile = async (e) => {
        e.preventDefault();
        let obj = {
            Id: 0,
            UserId: 1,
            Name: name,
            Surname: surname,
            MiddleName: middleName,
            PersonalNumber: personalNumber,
            BirthDate: birthdate,
            BirthPlace: birthPlace,
            CurrentCountry: currentNationality,
            BirthCountry: birthNationality,
            Email: permanentEmail,
            Phone: phoneNumber,
            Gender: gender,
            InsertBy: user.id
        };
        let created = await userProfileController.createProfile(obj);
        if (created > 0) {
            // const formData = new FormData();
            // formData.append("FormFile",photo);
            // formData.append("FileName",photo.name);
            // formData.append("ProfileId",created);
            // let inserted = await userProfileController.insertImage(formData);
            obj.Id = created;
            SuccessAlert('Registered Successful');
            addProfileStore(obj);
            setSubmit("Update Profile Data");
            setId(created);
        }
    }

    const clearAttributes = () => {
        setBirthNationality("");
        setBirthPlace("");
        setBirthdate("");
        setCurrentNationality("");
        setGender("");
        setMiddleName("");
        setName("");
        setPermanentAddress("");
        setPermantentEmail("");
        setPersonalNumber("");
        setPhoneNumber("");
        setPhoto("");
        setSurname("");
        setSubmit("Add Profile Data");
    }

    const updateProfile = async (e) => {
        e.preventDefault();
        let obj = {
            Id: id,
            UserId: 1,
            Name: name,
            Surname: surname,
            MiddleName: middleName,
            PersonalNumber: personalNumber,
            BirthDate: birthdate,
            BirthPlace: birthPlace,
            CurrentCountry: currentNationality,
            BirthCountry: birthNationality,
            Email: permanentEmail,
            Phone: phoneNumber,
            Gender: gender
        }
        let created = await userProfileController.updateProfile(obj);
        if (created > 0) {
            SuccessAlert('Update Successful');
            addProfileStore(obj);
        }
    }


    return (
        <div className="container-fluid">
            <div className="card p-4">
                <h6 className="lead">Personal Data</h6>
                <hr />
                <br />
                <form id="formElm" enctype="multipart/form-data" onSubmit={submit === "Add Profile Data" ? createProfile : updateProfile}>
                    <div className="row">
                        <div className="col-sm-3 text-center">
                            <label htmlFor="">Image</label>
                            <div class="image-upload ml-3" style={{ marginTop: "100px", cursor: "auto" }}>
                                <label for="file-input">
                                    <Icon size={100} icon={userPlus} />
                                </label>
                                <input id="file-input" type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                                <label htmlFor="">{photo ? photo.name : ""}</label>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="row">
                                <div className="col-sm-4 mb-2">
                                    <label htmlFor="">Name</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="col-sm-4 mb-2">
                                    <label htmlFor="">Surname</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                                </div>
                                <div className="col-sm-4 mb-2">
                                    <label htmlFor="">Middle Name</label>
                                    <label htmlFor="" className="float-right" style={{ fontSize: "10px" }}>Optional</label>
                                    <input type="text" className="form-control" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 mb-2">
                                    <label htmlFor="">Personal Number </label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="input" className="form-control" value={personalNumber} onChange={(e) => setPersonalNumber(e.target.value)} required />
                                </div>
                                <div className="col-sm-4 mb-2">
                                    <label htmlFor="">Birthday</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="date" className="form-control" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
                                </div>
                                <div className="col-sm-4 mb-2">
                                    <label htmlFor="">Birth Place</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 mb-2">
                                    <label htmlFor="">Current Nationality</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" value={currentNationality} onChange={(e) => setCurrentNationality(e.target.value)} className="form-control" required />
                                </div>
                                <div className="col-sm-4 mb-2">
                                    <label htmlFor="">Birth Nationality</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={birthNationality} onChange={(e) => setBirthNationality(e.target.value)} />
                                </div>
                                <div className="col-sm-4 mb-2" style={{ marginTop: "40px" }}>
                                    <label htmlFor="">Gender</label>
                                    <Radio.Group style={{ marginLeft: "100px" }} value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <Radio value={"M"}>Male</Radio>
                                        <Radio value={"F"}>Female</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 mb-2">
                                    <label htmlFor="">Permanent Address </label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)} required />
                                </div>
                                <div className="col-sm-4 mb-2">
                                    <label htmlFor="">Phone Number</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <PhoneInput
                                        className="form-control"
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        onChange={setPhoneNumber} />
                                </div>
                                <div className="col-sm-4 mb-2">
                                    <label htmlFor="">Email Address</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={permanentEmail} onChange={(e) => setPermantentEmail(e.target.value)} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-between">
                            <button type="button" className="btn btn-primary" onClick={clearAttributes}> <Icon icon={ic_delete_sweep} size={20} /> Clear</button>
                            <button type="submit" className="btn btn-primary"> <Icon icon={ic_file_download_done} size={20} /> {submit}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default UserData;