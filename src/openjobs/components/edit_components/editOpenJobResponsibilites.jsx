import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SuccessAlert from '../../../alerts/components/successAlert';
import ErrorAlert from '../../../alerts/components/errorAlert';
import openJobController from '../../controllers/openJobs.controller'
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever'
import Icon from 'react-icons-kit'
import { ic_edit_location_outline } from 'react-icons-kit/md/ic_edit_location_outline'
import englad from '../../../images/englad.png'
import Swal from 'sweetalert2'
import { bindActionCreators } from 'redux'
import { fillOpenJobArray } from '../../reduxStore/reducers/action'
const EditOpenJobResponsibilities = ({ openJobID }) => {

    const dispatch = useDispatch();
    const openJobs = useSelector((state) => state.openJobs.openJobs);
    const fillStoreArray  = bindActionCreators(fillOpenJobArray,dispatch);


    const [id, setId] = useState(1);
    const [updatedId, setUpdatedId] = useState(0);
    const [responsibility, setResponsibility] = useState('');
    const [submit, setSubmit] = useState('Add Responsibility');
    const [openJobResponsibilites, setOpenJobResponsibilities] = useState([]);

    useEffect(() => {
        const getData = () => {
            let obj = openJobs.find(e => parseInt(e.id) === parseInt(openJobID));
            setOpenJobResponsibilities(obj.openJobsResponsibilities);
            setId(obj.openJobsResponsibilities && obj.openJobsResponsibilities.length > 0 ? Math.max.apply(Math, obj.openJobsResponsibilities.map(function(o) { return o.id + 1; })) : 1);
        }
        getData();
    }, [])

    const addJobResponsibility = async (e) => {
        e.preventDefault();
        let obj = {Id : id, JobId: openJobID, Responsibility : responsibility, IsActive: 1, InsertBy : 1};
        let added = await openJobController.addJobResponsibility(obj);
        if(added > 0){
            fillStoreArray(await openJobController.getOpenJobs());
            let newObj = {id:added, responsibility:responsibility};
            openJobResponsibilites.push(newObj);
            setResponsibility('');
            SuccessAlert("Register Successful");
            return;
        }
        ErrorAlert("Registered Not Successful");
    }

    const deleteJobResponsibility = async (id) => {
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
            let response = await openJobController.deleteJobResponsibility(id);
            if(response){
                let result = openJobResponsibilites.filter(function(element) {
                    return element.id != id;
                })
                setOpenJobResponsibilities(result);
                fillStoreArray(await openJobController.getOpenJobs());
                SuccessAlert("Delete Successful");
                return;
            }
            ErrorAlert("Delete Not Successful");
        }
    }

    const getDataForUpdate = (id) => {
        setUpdatedId(id);
        let obj = openJobResponsibilites.find(e => e.id === id);
        setResponsibility(obj.responsibility);
        setSubmit("Update Responsibility");
    }

    const updateJobResponsibility = async (e) => {
        e.preventDefault();
        let obj = {Id:updatedId,Responsibility : responsibility, IsActive : 1, UpdateBy : 1};
        let updated = await openJobController.updateJobResponsibility(obj);
        if(updated){
            openJobResponsibilites.forEach(element => {
                if(element.id === updatedId){
                    element.responsibility = obj.Responsibility;
                }
            });
            fillStoreArray(await openJobController.getOpenJobs());
            SuccessAlert("Update Successful");
            setSubmit("Add Responsibility");
            setResponsibility('');
            return;
        }
        ErrorAlert("Update Not Successful");
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <h5 className="lead" >Please write down the key tasks & responsibilites for the job below :</h5>
                </div>
            </div>
            <br />
            <div className="card p-4">
                <div className="row">
                    {
                        openJobResponsibilites.map((element, key) => {
                            return (
                                <div className="col-sm-12 mb-2" key={key}>
                                    <div className="card">
                                        <div className="d-flex justify-content-between">
                                            <p className="lead p-3 ml-4" >{key + 1}.</p>
                                            <h6 className="lead p-3 ml-4 flex-grow-1 bd-highlight">{element.responsibility}</h6>
                                            <button type="button" onClick={getDataForUpdate.bind(this, element.id)} className="btn btn-secondary mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_edit_location_outline} /> </button>
                                            <button type="button" onClick={deleteJobResponsibility.bind(this, element.id)} className="btn btn-danger mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_delete_forever} /> </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <form action="" onSubmit={submit === 'Add Responsibility' ? addJobResponsibility : updateJobResponsibility}>
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


export default EditOpenJobResponsibilities;