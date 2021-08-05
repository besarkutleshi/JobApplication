import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addJobRequirements } from '../../reduxStore/reducers/action'
import { bindActionCreators } from 'redux'
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever'
import Icon from 'react-icons-kit'
import { ic_edit_location_outline } from 'react-icons-kit/md/ic_edit_location_outline'
import englad from '../../../images/englad.png'

const JobReuqirements = () => {

    const dispatch = useDispatch();
    const addRequirements = bindActionCreators(addJobRequirements, dispatch);
    const requirementsStore = useSelector((state) => state.jobRequirement.openJobsRequirements);

    const [requirements, setRequirements] = useState(requirementsStore ? requirementsStore : []);
    const [requirement, setRequirement] = useState('');
    const [id, setId] = useState(requirementsStore && requirementsStore.length > 0 ? Math.max.apply(Math, requirementsStore.map(function (o) { return o.Id + 1; })) : 1);
    const [updatedId, setUpdatedId] = useState(0);
    const [submit, setSubmit] = useState('Add Requirement');

    const onSubmit = (e) => {
        e.preventDefault();
        let obj = { Id: id, Requirement: requirement, IsActive: 1 };
        requirements.push(obj);
        addRequirements(requirements);
        setRequirement('');
        setId(id + 1);
    }

    const deleteRequirement = (id) => {
        let result = requirements.filter(element => {
            return element.Id !== id;
        });
        setRequirements(result);
        addRequirements(result);
    }

    const getDataForUpdate = (id) => {
        let obj = requirements.find(o => o.Id === id);
        setRequirement(obj.Requirement);
        setUpdatedId(id);
        setSubmit('Update Requirement');
    }

    const updateRequirement = (e) => {
        e.preventDefault();
        requirements.forEach(element => {
            if (element.Id === updatedId) {
                element.Requirement = requirement;
            }
        })
        setSubmit('Add Requirement')
        setRequirement('');
        addRequirements(requirements);
    }


    return (
        <div className="container-fluid">
            <div className="card p-4">
                <div className="row">
                    <div className="col-sm-12">
                        <h5 className="lead" >Please write down the requirmenets & qualifications for the job below :</h5>
                    </div>
                </div>
                <br />
                <div className="row">
                    {
                        requirements.map((element, key) => {
                            return (
                                <div className="col-sm-12 mb-2" key={key}>
                                    <div className="card">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="lead p-3 ml-4 flex-grow-1 bd-highlight" >{element.Requirement}</h6>
                                            <button type="button" onClick={getDataForUpdate.bind(this, element.Id)} className="btn btn-secondary mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_edit_location_outline} /> </button>
                                            <button type="button" onClick={deleteRequirement.bind(this, element.Id)} className="btn btn-danger mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_delete_forever} /> </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <form action="" onSubmit={submit === 'Add Requirement' ? onSubmit : updateRequirement}>
                    <br />
                    <div className="row">
                        <div className="col-sm-12">
                            <img src={englad} width="35" height="30" alt="" />
                            <label className="ml-2 mb-3"> Requirment</label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <textarea type="text" placeholder="" className="form-control" value={requirement} onChange={(e) => setRequirement(e.target.value)} required />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-primary float-right"> {submit} </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default JobReuqirements;