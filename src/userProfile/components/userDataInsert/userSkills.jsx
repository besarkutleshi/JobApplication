import React, { useState, useEffect } from 'react'
import Icon from 'react-icons-kit'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addSkills as addSkillMeth } from '../../reduxStore/action'
import { Switch } from 'antd'
import { ic_delete_sweep } from 'react-icons-kit/md/ic_delete_sweep'
import { ic_file_download_done } from 'react-icons-kit/md/ic_file_download_done'
import userProfileController from '../../controllers/userProfile.controller'
import SuccessAlert from '../../../alerts/components/successAlert'
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever'
import { ic_edit_location_outline } from 'react-icons-kit/md/ic_edit_location_outline'
import Swal from 'sweetalert2'
import Loading from '../../../loader/components/loader'

const UserSkills = () => {

    const dispatch = useDispatch();
    const addSkillsStore = bindActionCreators(addSkillMeth, dispatch);
    const userSkills = useSelector((state) => state.userSkills.userSkills);
    const userProfile = useSelector((state) => state.profile.profile);
    const user = useSelector((state) => state.login.user);

    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(userSkills && userSkills.length > 0 ? Math.max.apply(Math, userSkills.map(function (o) { return o.Id + 1; })) : 1);
    const [skills, setSkills] = useState(userSkills ? userSkills.length > 0 ? userSkills : [] : []);
    const [submit, setSubmit] = useState('Add Skill');
    const [skill, setSkill] = useState('');
    const [knowledgeLevel, setKnowledgeLevel] = useState('');
    const [updateId, setUpdateId] = useState(0);

    const clearAttributes = () => {
        setKnowledgeLevel('');
        setSkill('');
        setSubmit('Add Skill');
        setUpdateId(0);
    }

    const addSkills = async (e) => {
        e.preventDefault();
        let obj = {
            Id:0,
            UserId:user.userId,
            AplicantProfileId:userProfile.Id,
            Skill:skill,
            KnowledgeLevel:knowledgeLevel,
            IsActive:1,
            InsertBy:user.userId
        }
        let added = await userProfileController.addSkills(obj);
        if(added){
            SuccessAlert("Register Successful");
            obj.Id = added;
            skills.push(obj);
            setId(id + 1);
            addSkillsStore(skills);
            clearAttributes();
        }
    }

    const getDataForUpdate = (id) => {
        let obj = skills.find(s => s.Id === id);
        if(obj){
            setSkill(obj.Skill);
            setKnowledgeLevel(obj.KnowledgeLevel);
            setUpdateId(id);
            setSubmit("Update Skill");
        }
    }

    const updateSkills = async (e) => {
        e.preventDefault();
        let obj = {
            Id:updateId,
            UserId:user.userId,
            AplicantProfileId:userProfile.Id,
            Skill:skill,
            KnowledgeLevel:knowledgeLevel,
            IsActive:1,
            UpdateBy:user.userId
        }
        let updated = await userProfileController.updateSkills(obj);
        if(updated){
            SuccessAlert("Update Successful");
            skills.forEach(element => {
                if(element.Id === updateId){
                    element.Skill = obj.Skill;
                    element.KnowledgeLevel = obj.KnowledgeLevel
                }
            });
            addSkillsStore(skills);
            clearAttributes();
        }
    }

    const deleteSkills = async (id) => {
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
            let deleted = await userProfileController.deleteSkills(userProfile.Id,id);
            if(deleted){
                SuccessAlert("Delete Successful");
                let result = skills.filter(element => {
                    return element.Id !== id
                });
                setSkills(result);
                addSkillsStore(result);
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
                <div className="row">
                    {
                        skills.map((element, key) => {
                            return (
                                <div className="col-sm-12 mb-2" key={key}>
                                    <div className="card">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="lead p-3 ml-4 flex-grow-1 bd-highlight" >{element.Skill} - {element.KnowledgeLevel}</h6>
                                            <button type="button" onClick={getDataForUpdate.bind(this, element.Id)} className="btn btn-secondary mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_edit_location_outline} /> </button>
                                            <button type="button" onClick={deleteSkills.bind(this, element.Id)} className="btn btn-danger mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_delete_forever} /> </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <div className="card p-4">
                    <form onSubmit={submit === "Add Skill" ? addSkills : updateSkills}>
                        <div className="row">
                            <div className="col-sm-4 mb-2">
                                <label htmlFor="">Skill </label>
                                <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                                <input type="text" className="form-control" value={skill} onChange={(e) => setSkill(e.target.value)} required />
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

export default UserSkills;