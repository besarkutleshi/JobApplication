import React, { useState, useEffect } from 'react'
import Icon from 'react-icons-kit'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addExperiences } from '../../reduxStore/action'
import { Switch } from 'antd'
import { ic_delete_sweep } from 'react-icons-kit/md/ic_delete_sweep'
import { ic_file_download_done } from 'react-icons-kit/md/ic_file_download_done'
import userProfileController from '../../controllers/userProfile.controller'
import SuccessAlert from '../../../alerts/components/successAlert'
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever'
import { ic_edit_location_outline } from 'react-icons-kit/md/ic_edit_location_outline'
import Swal from 'sweetalert2'
import Loading from '../../../loader/components/loader'

const UserExperience = () => {

    const dispatch = useDispatch();
    const addExperiencesStore = bindActionCreators(addExperiences, dispatch);
    const userExperiences = useSelector((state) => state.userExperience.userExperiences);
    const userProfile = useSelector((state) => state.profile.profile);
    const user = useSelector((state) => state.login.user);

    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(userExperiences && userExperiences.length > 0 ? Math.max.apply(Math, userExperiences.map(function (o) { return o.id + 1; })) : 1);
    const [experiences, setExperiences] = useState(userExperiences ? userExperiences.length > 0 ? userExperiences : [] : []);
    const [submit, setSubmit] = useState("Add Experience");
    const [institution, setInstitution] = useState('');
    const [position, setPosition] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [onGoing, setOnGoing] = useState(0);
    const [description, setDescription] = useState('');
    const [updateId, setUpdateId] = useState(0);

    const getOnGoingValue = (checked) => {
        setOnGoing(checked ? 1 : 0);
    }
    
    const clearAttributes = () => {
        setInstitution('');
        setPosition('');
        setCity('');
        setCountry('');
        setStartDate('');
        setEndDate('');
        setOnGoing(0);
        setDescription('');
        setSubmit("Add Experience");
    }

    const addExperience = async (e) => {
        e.preventDefault();
        let obj = {
            id:0,
            userId: user.userId,
            applicantProfileId: userProfile.id,
            institution: institution,
            position: position,
            city: city,
            country: country,
            startDate: startDate,
            endDate: endDate,
            onGoing: onGoing,
            description:description,
            isActive: 1,
            insertBy: user.userId
        }
        let added = await userProfileController.addExperience(obj);
        if(added){
            obj.id = added;
            setId(id + 1);
            experiences.push(obj);
            addExperiencesStore(experiences);
            SuccessAlert("Register Successful");
            clearAttributes();
        }
    }

    const getDataForUpdate = (id) => {
        let obj = experiences.find(e => e.id === id);
        setUpdateId(id);
        setInstitution(obj.institution);
        setPosition(obj.position);
        setCity(obj.city);
        setCountry(obj.country);
        setStartDate(obj.startDate.split('T')[0]);
        setEndDate(obj.endDate.split('T')[0]);
        setOnGoing(obj.onGoing);
        setDescription(obj.description);
        setSubmit("Update Experience");
    }

    const updateExperience = async (e) => {
        e.preventDefault();
        let obj = {
            id:updateId,
            userId: user.userId,
            applicantProfileId: userProfile.id,
            institution: institution,
            position: position,
            city: city,
            country: country,
            startDate: startDate,
            endDate: endDate,
            onGoing: onGoing,
            description:description,
            isActive: 1,
            updateBy: user.userId
        }
        let updated = await userProfileController.updateExperience(obj);
        if(updated){
            experiences.forEach(element => {
                if(element.Id === updateId){
                    element.institution = obj.institution;
                    element.position = obj.position;
                    element.city = obj.city;
                    element.country = obj.country;
                    element.startDate = obj.startDate;
                    element.endDate = obj.endDate;
                    element.onGoing = obj.onGoing;
                    element.description = obj.description;
                }
            });
            SuccessAlert("Update Successful");
            addExperiencesStore(experiences);
            setSubmit("Add Experience");
            clearAttributes();
        }
    }

    const deleteExperience = async (id) => {
        let result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if(result.isConfirmed){
            let deleted = await userProfileController.deleteExperience(userProfile.id,id);
            if(deleted){
                let result = experiences.filter(element => {
                    return element.id !== id;
                });
                SuccessAlert("Delete Successful");
                setExperiences(result);
                addExperiencesStore(result);
                setSubmit("Add Experience");
                clearAttributes();
            }
        }
    }

    if(isLoading){
        <Loading />
    }
    else{

        return (
            <div className="container-fluid">
                <div className="row">
                    {
                        experiences.map((element, key) => {
                            return (
                                <div className="col-sm-12 mb-2" key={key}>
                                    <div className="card">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="lead p-3 ml-4 flex-grow-1 bd-highlight"> {element.position} - {element.institution}</h6>
                                            <button type="button" onClick={getDataForUpdate.bind(this, element.id)} className="btn btn-secondary mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_edit_location_outline} /> </button>
                                            <button type="button" onClick={deleteExperience.bind(this, element.id)} className="btn btn-danger mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_delete_forever} /> </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <div className="card p-4">
                    <form onSubmit={submit === "Add Experience" ? addExperience : updateExperience}>
                        <div className="row">
                            <div className="col-sm-3 mb-2">
                                <label htmlFor="">Institution</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" value={institution} onChange={(e) => setInstitution(e.target.value)} required />
                            </div>
                            <div className="col-sm-3 mb-2">
                                <label htmlFor="">Position</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" value={position} onChange={(e) => setPosition(e.target.value)} required />
                            </div>
                            <div className="col-sm-3 mb-2">
                                <label htmlFor="">City</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
                            </div>
                            <div className="col-sm-3 mb-2">
                                <label htmlFor="">Country</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3 mb-2">
                                <label htmlFor="">Start Date</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                            </div>
                            <div className="col-sm-3 mb-2">
                                <label htmlFor="">End Date</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                            <div className="col-sm-3 mb-2" style={{ marginTop: "40px" }}>
                                <label htmlFor="">On Going</label>
                                <Switch checked={onGoing === 1 ? true : false} onChange={getOnGoingValue} className="ml-5"></Switch>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <label htmlFor="">Main Responsibilites</label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" rows="10" required></textarea>
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
            </div>
        )
    }
}

export default UserExperience;