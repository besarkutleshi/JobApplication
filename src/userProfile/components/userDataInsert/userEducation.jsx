import React, { useState, useEffect } from 'react'
import Icon from 'react-icons-kit'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addEducations } from '../../reduxStore/action'
import { Switch } from 'antd'
import { ic_delete_sweep } from 'react-icons-kit/md/ic_delete_sweep'
import { ic_file_download_done } from 'react-icons-kit/md/ic_file_download_done'
import userProfileController from '../../controllers/userProfile.controller'
import SuccessAlert from '../../../alerts/components/successAlert'
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever'
import { ic_edit_location_outline } from 'react-icons-kit/md/ic_edit_location_outline'
import Swal from 'sweetalert2'
import Loading from '../../../loader/components/loader'
const UserEducation = () => {

    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.profile.profile);
    const addEducationStore = bindActionCreators(addEducations, dispatch);
    const user = useSelector((state) => state.login.user);
    const userEducations = useSelector((state) => state.userEducation.userEducations);

    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(userEducations && userEducations.length > 0 ? Math.max.apply(Math, userEducations.map(function (o) { return o.id + 1; })) : 1);
    const [educations, setEducations] = useState(userEducations ? userEducations.length > 0 ? userEducations : [] : []);
    const [institution, setInstitution] = useState('');
    const [direction, setDirection] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [onGoing, setOnGoing] = useState(0);
    const [updateId, setUpdateId] = useState(0);
    const [submit, setSubmit] = useState("Add Education");

    const [classList, setClassList] = useState(educations.length > 7 ? 'overflow-auto card' : '');
    const [heightList, setHeightList] = useState(educations.length > 7 ? '500px' : '');

    const getOnGoingValue = (checked) => {
        setOnGoing(checked ? 1 : 0);
    }


    const addEducation = async (e) => {
        e.preventDefault();
        let obj = {
            id: 0,
            userId: user.userId,
            aplicantProfileId: userProfile.id,
            institution: institution,
            direction: direction,
            startDate: startDate,
            endDate: endDate,
            onGoing: onGoing,
            address:address,
            city:city,
            country:country,
            isActive: 1,
            insertBy: user.userId
        }
        let added = await userProfileController.addEducation(obj);
        if (added) {
            obj.Id = added;
            setId(id + 1);
            educations.push(obj);
            addEducationStore(educations);
            SuccessAlert("Register Successful");
            clearAttributes();
        }
    }

    const clearAttributes = () => {
        setInstitution('');
        setDirection('');
        setStartDate('');
        setEndDate('');
        setAddress('');
        setCity('');
        setCountry('');
        setOnGoing(0);
        setSubmit("Update Education");
    }

    const getDataForUpdate = (id) => {
        let obj = educations.find(e => e.id === id);
        setUpdateId(id);
        setInstitution(obj.institution);
        setDirection(obj.direction);
        setStartDate(obj.startDate.split('T')[0]);
        setEndDate(obj.endDate.split('T')[0]);
        setOnGoing(obj.onGoing);
        setAddress(obj.address);
        setCity(obj.city);
        setCountry(obj.country);
        setSubmit("Update Education");
    }

    const updateData = async (e) => {
        e.preventDefault();
        let obj = {
            id: updateId,
            userId: user.userId,
            aplicantProfileId: userProfile.id,
            institution: institution,
            direction: direction,
            startDate: startDate,
            endDate: endDate,
            onGoing: onGoing,
            address:address,
            city:city,
            country:country,
            isActive: 1,
            updateBy: user.userId
        }
        let updated = await userProfileController.updateEducation(obj);
        if (updated) {
            educations.forEach(element => {
                if (element.id === updateId) {
                    element.institution = obj.institution;
                    element.direction = obj.direction;
                    element.startDate = obj.startDate;
                    element.endDate = obj.endDate;
                    element.onGoing = obj.onGoing;
                    element.address = obj.address;
                    element.city = obj.city;
                    element.country = obj.country;
                }
            });
            SuccessAlert("Update Successful");
            setSubmit("Add Education");
            clearAttributes();
            addEducationStore(educations);
        }
    }

    const deleteData = async (id) => {
        let result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            let deleted = await userProfileController.deleteEducation(userProfile.id, id);
            if (deleted) {
                SuccessAlert("Delete Successful");
                let result = educations.filter(element => {
                    return element.id !== id;
                });
                setEducations(result);
                addEducationStore(result);
                setSubmit("Add Education");
                clearAttributes();
            }
        }
    }


    if (isLoading) {
        <Loading />
    }
    else {
        return (
            <div className="container-fluid">
                <div className="card p-4">
                    <form onSubmit={submit === "Add Education" ? addEducation : updateData}>
                        <div className="row">
                            <div className="col-sm-4 mb-2">
                                <label htmlFor="">Institution</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" value={institution} onChange={(e) => setInstitution(e.target.value)} required />
                            </div>
                            <div className="col-sm-4 mb-2">
                                <label htmlFor="">Diploma</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" value={direction} onChange={(e) => setDirection(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4 mb-2">
                                <label htmlFor="">Address</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                            </div>
                            <div className="col-sm-4 mb-2">
                                <label htmlFor="">City</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
                            </div>
                            <div className="col-sm-4 mb-2">
                                <label htmlFor="">Country</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4 mb-2">
                                <label htmlFor="">Start Date</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                            </div>
                            <div className="col-sm-4 mb-2">
                                <label htmlFor="">End Date</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                            <div className="col-sm-4 mb-2" style={{ marginTop: "40px" }}>
                                <label htmlFor="">On Going</label>
                                <Switch checked={onGoing === 1 ? true : false} onChange={getOnGoingValue} className="ml-5"></Switch>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-12 d-flex justify-content-between">
                                <button onClick={clearAttributes} type="button" className="btn btn-primary"> <Icon icon={ic_delete_sweep} /> Clear</button>
                                <button type="submit" className="btn btn-primary"> <Icon icon={ic_file_download_done} /> {submit} </button>
                            </div>
                        </div>
                    </form>
                </div>
                <br />
                <div  className={`${classList}`} style={{height:`${heightList}`}}>
                    <div className="row">
                        {
                            educations.map((element, key) => {
                                return (
                                    <div className="col-sm-12 mb-2" key={key}>
                                        <div className="card">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="lead p-3 ml-4 flex-grow-1 bd-highlight" >{element.institution} - {element.direction}</h6>
                                                <button type="button" onClick={getDataForUpdate.bind(this, element.id)} className="btn btn-secondary mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_edit_location_outline} /> </button>
                                                <button type="button" onClick={deleteData.bind(this, element.id)} className="btn btn-danger mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_delete_forever} /> </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default UserEducation;