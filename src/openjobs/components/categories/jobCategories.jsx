import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { useSelector } from 'react-redux';
import jobCategoryController from '../../controllers/jobCategory.controller';
import ErrorAlert from '../../../alerts/components/errorAlert'
import SuccessAlert from '../../../alerts/components/successAlert'
import Loading from '../../../loader/components/loader'
import Icon from 'react-icons-kit'
import { edit } from 'react-icons-kit/fa/edit'
import { ic_delete_forever_outline } from 'react-icons-kit/md/ic_delete_forever_outline'
import $ from 'jquery'
import { plus } from 'react-icons-kit/fa/plus'
import { ic_done_outline_twotone } from 'react-icons-kit/md/ic_done_outline_twotone'
import { ic_close } from 'react-icons-kit/md/ic_close'
import helper from '../../../shared/helpers/helper';
import Swal from 'sweetalert2'
import MUIDataTable from 'mui-datatables';
const JobCategories = () => {

    const user = useSelector((state) => state.login.user);
    const config = useSelector((state) => state.config.headers);

    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [updateId, setUpdateId] = useState(0);
    const [categories, setCategories] = useState([]);
    const [submit, setSubmit] = useState("Regsiter");

    const getCategories = async () => {
        setIsLoading(true);
        let categories = await jobCategoryController.getCategories(config);
        if (categories) {
            $(document).ready(function () {
                $('#categoryList').DataTable();
            });
            setCategories(categories);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const categories = async () => {
            await getCategories();
        }
        categories();
    }, [])

    const addCategory = async () => {
        let obj = { id: 0, category: category, insertBy: user.userId, isActive: 1, insertDate:helper.getCurrentDate() };
        let added =  await jobCategoryController.addCategory(obj, config);
        if (added) {
            obj.id = added;
            SuccessAlert("Register Successful");
            categories.push(obj);
        }
        clearAttributes();
    }

    const deleteCategory = async (id) => {
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
            let deleted = await jobCategoryController.deleteCategory(id, config);
            if (deleted) {
                let result = categories.filter(element => {
                    return element.id !== id
                });
                setCategories(result);
                SuccessAlert("Delete Successful");
            }
        }
    }

    const getDataForUpdate = (id) => {
        let obj = categories.find(c => c.id === id);
        if (obj) {
            setCategory(obj.category);
            setUpdateId(id);
            setSubmit('Update')
        }
    }

    const updateCategory = async () => {
        alert(submit)
        let obj = { id: updateId, category: category, isActive: 1, updateBy: user.userId };
        let updated = await jobCategoryController.updateCategory(obj,config);
        if (updated) {
            categories.forEach(element => {
                if (element.id === updateId) {
                    element.category = obj.category;
                }
            });
            SuccessAlert("Update Successful");
        }
        clearAttributes();
    }

    const clearAttributes = () => {
        setCategory('');
        setUpdateId(0);
        setSubmit('Regsiter');
    }


    if (isLoading) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <div className="container-fluid">
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add Category <Icon icon={plus} size={15} /> </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">{submit} Category</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form action="" onSubmit={submit === "Regsiter" ? addCategory : updateCategory}>
                                        <div class="modal-body">
                                            <div className="col-sm-12">
                                                <label htmlFor="">Category</label>
                                                <input required type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><Icon icon={ic_close} size={20} /> Close</button>
                                            <button type="submit" class="btn btn-primary">{submit} <Icon icon={ic_done_outline_twotone} size={20} /></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <MUIDataTable 
                                    title = "Categories"
                                    data = {
                                        categories.map((element,key) => {
                                            let array = [
                                                element.id,element.category,element.isActive,element.insertDate.toString().split('T')[0]
                                            ].concat([
                                                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => getDataForUpdate(element.id)} className="btn btn-info"> <Icon icon={edit} size={15} /> </button>,
                                                <button onClick={() => deleteCategory(element.id)} className="btn btn-danger"> <Icon icon={ic_delete_forever_outline} size={20} /> </button>
                                            ])
                                            return array;
                                        })
                                    }
                                    columns = {["ID","Category","Is Active", "Insert Date", "Update", "Delete"]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }



}

export default JobCategories;