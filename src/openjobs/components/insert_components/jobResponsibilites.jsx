import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import albanianFlag from '../../../images/albanian.svg'
import englad from '../../../images/englad.png'
import serbian from '../../../images/serbian.png'
import { addJobResponsibilities } from '../../reduxStore/reducers/action'
import { bindActionCreators } from 'redux'
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever'
import Icon from 'react-icons-kit'
import { ic_edit_location_outline } from 'react-icons-kit/md/ic_edit_location_outline'
const JobResponsibilites = () => {

    const dispatch = useDispatch();
    const addResponsibilites = bindActionCreators(addJobResponsibilities, dispatch);
    const responsibilitesStore = useSelector((state) => state.jobResponsibility.openJobsResponsibilities);

    const [responsibilites, setResponsibilites] = useState(responsibilitesStore ? responsibilitesStore : []);
    const [id, setId] = useState(responsibilites && responsibilites.length > 0 ? Math.max.apply(Math, responsibilites.map(function (o) { return o.Id + 1; })) : 1);
    const [responsibility, setResponsibility] = useState('');
    const [updatedId, setUpdatedId] = useState(0);
    const [submit, setSubmit] = useState('Add Responsibility')

    const insertResponsibility = (e) => {
        e.preventDefault();
        let obj = { Id: id, Responsibility: responsibility, IsActive: 1 };
        responsibilites.push(obj);
        setId(id + 1);
        addResponsibilites(responsibilites);
        setResponsibility('');
    }

    const deleteResponsibility = (id) => {
        let result = responsibilites.filter(function (element) {
            return element.Id !== id;
        });
        setResponsibilites(result);
        addResponsibilites(result);
    }

    const getDataForUpdate = (id) => {
        responsibilites.forEach(element => {
            if (element.Id === id) {
                setResponsibility(element.Responsibility);
            }
        });
        setUpdatedId(id);
        setSubmit('Update Responsibility');
    }

    const updateResponsibility = (e) => {
        e.preventDefault();
        responsibilites.forEach(element => {
            if (element.Id === updatedId) {
                element.Responsibility = responsibility;
            }
        });
        setResponsibility('');
        addResponsibilites(responsibilites);
        setSubmit('Add Responsibility');
    }


    return (
        <div className="container-fluid">
            <div className="card p-4">
                <div className="row">
                    <div className="col-sm-12">
                        <h5 className="lead" >Please write down the key tasks & responsibilites for the job below :</h5>
                    </div>
                </div>
                <br />
                <div className="row">
                    {
                        responsibilites.map((element, key) => {
                            return (
                                <div className="col-sm-12 mb-2" key={key}>
                                    <div className="card">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="lead p-3 ml-4 flex-grow-1 bd-highlight" >{element.Responsibility}</h6>
                                            <button type="button" onClick={getDataForUpdate.bind(this, element.Id)} className="btn btn-secondary mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_edit_location_outline} /> </button>
                                            <button type="button" onClick={deleteResponsibility.bind(this, element.Id)} className="btn btn-danger mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_delete_forever} /> </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <form action="" onSubmit={submit === 'Add Responsibility' ? insertResponsibility : updateResponsibility}>
                    <br />
                    <div className="row">
                        <div className="col-sm-12">
                            <img src={englad} width="35" height="30" alt="" />
                            <label className="ml-2 mb-3"> Responsibility</label>
                            <label htmlFor="" className="float-right text-danger" style={{ fontSize: "13px" }}>*</label>
                            <textarea type="text" className="form-control" value={responsibility} onChange={(e) => setResponsibility(e.target.value)} required />
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

export default JobResponsibilites;