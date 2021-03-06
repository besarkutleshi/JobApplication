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
import { useEffect } from 'react';
import fileController from '../../../shared/fileControllers/file.controller';
import loader from '../../../images/loader.gif'
const UserData = ({ submitText = null }) => {

    const dispatch = useDispatch();
    const addProfileStore = bindActionCreators(addProfile, dispatch);
    const user = useSelector((state) => state.login.user);
    const profile = useSelector((state) => state.profile.profile);

    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(profile ? profile.id ? profile.id : 0 : 0);
    const [photo, setPhoto] = useState(profile ? profile.photo.split('_')[1] : '');
    const [lastImageName, setLastImageName] = useState(profile ? profile.photo : '');
    const [photoFile, setPhotoFile] = useState(profile ? profile.photoFile : '');
    const [imageBytes, setImageBytes] = useState(profile ? profile.imageBytes : '');
    const [name, setName] = useState(profile ? profile.name ? profile.name : '' : '');
    const [surname, setSurname] = useState(profile ? profile.surname ? profile.surname : '' : '');
    const [middleName, setMiddleName] = useState(profile ? profile.middleName ? profile.middleName : '' : '');
    const [personalNumber, setPersonalNumber] = useState(profile ? profile.personalNumber ? profile.personalNumber : '' : '');
    const [birthdate, setBirthdate] = useState(profile ? profile.birthDate ? profile.birthDate.split('T')[0] : '' : '');
    const [birthPlace, setBirthPlace] = useState(profile ? profile.birthPlace ? profile.birthPlace : '' : '');
    const [birthNationality, setBirthNationality] = useState(profile ? profile.birthCountry ? profile.birthCountry : '' : '');
    const [currentNationality, setCurrentNationality] = useState(profile ? profile.currentCountry ? profile.currentCountry : '' : '');
    const [gender, setGender] = useState(profile ? profile.gender ? profile.gender : '' : '');
    const [permanentAddress, setPermanentAddress] = useState(profile ? profile.address ? profile.address : '' : '');
    const [phoneNumber, setPhoneNumber] = useState(profile ? profile.phone ? profile.phone : '' : '');
    const [permanentEmail, setPermantentEmail] = useState(profile ? profile.email ? profile.email : '' : '');
    const [submit, setSubmit] = useState('Add Profile Data');

    useEffect(() => {
        const submitMessage = async () => {
            if(name.length > 0){
                setSubmit("Update Profile Data");
            }
        }
        submitMessage();
    },[]);

    const getObject = (obj) => {
        let profile = {
            birthCountry: obj.birthCountry,
            birthDate: obj.birthDate,
            birthPlace: obj.birthPlace,
            currentCountry: obj.currentCountry,
            description: obj.description,
            email: obj.email,
            gender: obj.gender,
            id: obj.id,
            insertDate: obj.insertDate,
            isActive: obj.isActive,
            middleName: obj.middleName,
            name: obj.name,
            personalNumber: obj.personalNumber,
            phone: obj.phone,
            photo: obj.photo,
            photoFile:obj.photoFile,
            imageBytes: obj.imageBytes,
            status: obj.status,
            surname: obj.surname,
            userId: user.userId,
            address: obj.address
        }
        return profile;
    }

    const createProfile = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        let bodyFormData = new FormData();
        bodyFormData.append('id', '0');
        bodyFormData.append('name', name);
        bodyFormData.append('surname', surname);
        bodyFormData.append('middleName', middleName);
        bodyFormData.append('personalNumber', personalNumber);
        bodyFormData.append('birthDate', birthdate);
        bodyFormData.append('birthPlace', birthPlace);
        bodyFormData.append('currentCountry', currentNationality);
        bodyFormData.append('birthCountry', birthNationality);
        bodyFormData.append('address', permanentAddress);
        bodyFormData.append('email', permanentEmail);
        bodyFormData.append('phone', phoneNumber);
        bodyFormData.append('gender', gender);
        bodyFormData.append('isActive', 1);
        bodyFormData.append('insertBy', user.userId);
        bodyFormData.append('photoFile', photoFile);

        let created = await userProfileController.createProfile(bodyFormData);
        if(created > 1){
            SuccessAlert('Registered Successful');
            addProfileStore(getObject(created));
            setSubmit("Update Profile Data");
            setId(created.id);
        }
        setIsLoading(false);
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
        setIsLoading(true);
        e.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.append('id', id);
        bodyFormData.append('name', name);
        bodyFormData.append('surname', surname);
        bodyFormData.append('middleName', middleName);
        bodyFormData.append('personalNumber', personalNumber);
        bodyFormData.append('birthDate', birthdate);
        bodyFormData.append('birthPlace', birthPlace);
        bodyFormData.append('currentCountry', currentNationality);
        bodyFormData.append('birthCountry', birthNationality);
        bodyFormData.append('address', permanentAddress);
        bodyFormData.append('email', permanentEmail);
        bodyFormData.append('phone', phoneNumber);
        bodyFormData.append('gender', gender);
        bodyFormData.append('isActive', 1);
        bodyFormData.append('insertBy', user.userId);
        bodyFormData.append('photoFile', photoFile);
        bodyFormData.append('lastImageName', lastImageName);


        let updated = await userProfileController.updateProfile(bodyFormData);
        if (updated !== false && updated.name) {
            SuccessAlert('Update Successful');
            addProfileStore(getObject(updated));
        }
        setIsLoading(false);
    }


    return (
        <div className="container-fluid">
            <div className="card p-4">
                <h6 className="lead">Personal Data</h6>
                <hr />
                <br />
                <form id="formElm" enctype="multipart/form-data" onSubmit={submit === "Add Profile Data" ? createProfile : updateProfile}>
                    <div className="row">
                        <div className="col-lg-3 text-center">
                            <label htmlFor="">Image</label>
                            <div class="image-upload ml-3" style={{ marginTop: "50px", cursor: "auto" }}>
                                {
                                    imageBytes && <label for="file-input">  <img id="my-img" className="rounded img-fluid" src={`data:image/png;base64, ${imageBytes}`} alt="" width={150} height={150} /></label>
                                }
                                {
                                    !imageBytes && <label for="file-input"> <Icon size={100} icon={userPlus} /></label>
                                }
                                
                                <input id="file-input" type="file" onChange={ async (e) => {
                                    const file = e.target.files[0];
                                    if(file){
                                        setPhotoFile(file);
                                        let bytes = await fileController.getAsByteArray(file);
                                        document.getElementById('my-img').src = URL.createObjectURL(
                                            new Blob([bytes.buffer], { type: 'image/png' })
                                        );
                                    }
                                }} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Name</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Surname</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Middle Name</label>
                                    <label htmlFor="" className="float-right" style={{ fontSize: "10px" }}>Optional</label>
                                    <input type="text" className="form-control" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Personal Number </label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="input" className="form-control" value={personalNumber} onChange={(e) => setPersonalNumber(e.target.value)} required />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Birthday</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="date" className="form-control" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Birth Place</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Current Nationality</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" value={currentNationality} onChange={(e) => setCurrentNationality(e.target.value)} className="form-control" required />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Birth Nationality</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={birthNationality} onChange={(e) => setBirthNationality(e.target.value)} />
                                </div>
                                <div className="col-lg-4 mb-2" style={{ marginTop: "40px" }}>
                                    <label htmlFor="">Gender</label>
                                    <Radio.Group className="ml-2" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <Radio value={"M"}>Male</Radio>
                                        <Radio value={"F"}>Female</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Permanent Address </label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)} required />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Phone Number</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <PhoneInput
                                        className="form-control"
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        onChange={setPhoneNumber} />
                                </div>
                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Email Address</label>
                                    <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                    <input type="text" className="form-control" value={permanentEmail} onChange={(e) => setPermantentEmail(e.target.value)} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-between">
                            <button type="button" className="btn btn-primary" onClick={clearAttributes}> <Icon icon={ic_delete_sweep} size={20} /> Clear</button>
                            {isLoading && <img src={loader} alt="" className="float-right" width="80" height="80" />}
                            <button type="submit" className="btn btn-primary"> <Icon icon={ic_file_download_done} size={20} /> {submit}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default UserData;