import React, { useState, useEffect } from 'react'
import Icon from 'react-icons-kit'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addLanguages } from '../../reduxStore/action'
import { ic_delete_sweep } from 'react-icons-kit/md/ic_delete_sweep'
import { ic_file_download_done } from 'react-icons-kit/md/ic_file_download_done'
import userProfileController from '../../controllers/userProfile.controller'
import SuccessAlert from '../../../alerts/components/successAlert'
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever'
import { ic_edit_location_outline } from 'react-icons-kit/md/ic_edit_location_outline'
import Swal from 'sweetalert2'
import Loading from '../../../loader/components/loader'

import loader from '../../../images/loader.gif'

const UserLanguages = () => {

    const dispatch = useDispatch();
    const addLanguagesStore = bindActionCreators(addLanguages, dispatch);
    const userLanguages = useSelector((state) => state.userLanguages.userLanguages);
    const userProfile = useSelector((state) => state.profile.profile);
    const user = useSelector((state) => state.login.user);

    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(userLanguages && userLanguages.length > 0 ? Math.max.apply(Math, userLanguages.map(function (o) { return o.id + 1; })) : 1);
    const [languages, setLanguages] = useState(userLanguages ? userLanguages.length > 0 ? userLanguages : [] : []);
    const [submit, setSubmit] = useState('Add Language');
    const [language, setLanguage] = useState('');
    const [knowledgeLevel, setKnowledgeLevel] = useState('');
    const [updateId, setUpdateId] = useState(0);
    
    const [classList, setClassList] = useState(languages.length > 7 ? 'overflow-auto card' : '');
    const [heightList, setHeightList] = useState(languages.length > 7 ? '500px' : '');

    const clearAttributes = () => {
        setKnowledgeLevel('');
        setLanguage('');
        setSubmit('Add Language');
        setUpdateId(0);
    }

    const addLanguage = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        let obj = {
            id:0,
            userId: user.userId,
            aplicantProfileId:userProfile.id,
            language:language,
            knowledgeLevel:knowledgeLevel,
            isActive:1,
            insertBy:user.userId
        }
        let added = await userProfileController.addLanguage(obj);
        if(added){
            SuccessAlert("Register Successful");
            obj.id = added;
            setId(id + 1);
            languages.push(obj);
            addLanguagesStore(languages);
            clearAttributes();
        }
        setIsLoading(false);
    }

    const getDataForUpdate = (id) => {
        let obj = languages.find(l => l.id === id);
        if(obj){
            setLanguage(obj.language);
            setKnowledgeLevel(obj.knowledgeLevel);
            setUpdateId(id);
            setSubmit("Update Language");
        }
    }

    const updateLanguage = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let obj = {
            id:updateId,
            userId: user.userId,
            aplicantProfileId:userProfile.id,
            language:language,
            knowledgeLevel:knowledgeLevel,
            isActive:1,
            updateBy:user.userId
        }
        let updated = await userProfileController.updateLanguage(obj);
        if(updated){
            SuccessAlert("Update Successful");
            languages.forEach(element => {
                if(element.id === updateId){
                    element.language = obj.language;
                    element.knowledgeLevel = obj.knowledgeLevel
                }
            });
            addLanguagesStore(languages);
            clearAttributes();
        }
        setIsLoading(false);
    }

    const deleteLanguage = async (id) => {
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
            let deleted = await userProfileController.deleteLanguage(userProfile.id,id);
            if(deleted){
                SuccessAlert("Delete Successful");
                let result = languages.filter(element => {
                    return element.id !== id
                });
                setLanguages(result);
                addLanguagesStore(languages);
                clearAttributes();
            }
        }
    }


    return (
        <div className="container-fluid">
            <div className="card p-4">
                <h6 className="lead">Language's </h6>
                <hr />
                <br />
                <form onSubmit={submit === "Add Language" ? addLanguage : updateLanguage}>
                    <div className="row">
                        <div className="col-sm-4 mb-2">
                            <label htmlFor="">Language </label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <input type="text" className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)} required />
                        </div>
                        <div className="col-sm-4 mb-2">
                            <label htmlFor="">Knowledge Level</label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <select value={knowledgeLevel} onChange={(e) => setKnowledgeLevel(e.target.value)} className="form-select" required>
                                <option value="">Not Selected</option>
                                <option value="Novice">Novice</option>
                                <option value="Advanced Beginner">Advanced Beginner</option>
                                <option value="Competent">Competent</option>
                                <option value="Proficient">Proficient</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-between">
                            <button onClick={clearAttributes} type="button" className="btn btn-primary"> <Icon icon={ic_delete_sweep} /> Clear</button>
                            {isLoading && <img src={loader} alt="" className="float-right" width="80" height="80" />}
                            <button type="submit" className="btn btn-primary"> <Icon icon={ic_file_download_done} /> {submit} </button>
                        </div>
                    </div>
                </form>
            </div>
            <br />
            <div className={`${classList}`} style={{height:`${heightList}`}}>
                <div className="row">
                    {
                        languages.map((element, key) => {
                            return (
                                <div className="col-sm-12 mb-2" key={key}>
                                    <div className="card">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="lead p-3 ml-4 flex-grow-1 bd-highlight" >{element.language} - {element.knowledgeLevel}</h6>
                                            <button type="button" onClick={getDataForUpdate.bind(this, element.id)} className="btn btn-secondary mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_edit_location_outline} /> </button>
                                            <button type="button" onClick={deleteLanguage.bind(this, element.id)} className="btn btn-danger mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_delete_forever} /> </button>
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

export default UserLanguages;