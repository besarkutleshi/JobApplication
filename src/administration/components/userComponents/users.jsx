import React, { useState, useEffect } from 'react'
import userController from '../../controllers/user.controller'
import Loading from '../../../loader/components/loader'
import Icon from 'react-icons-kit'
import {ic_admin_panel_settings_outline} from 'react-icons-kit/md/ic_admin_panel_settings_outline'
import {ic_mode_edit} from 'react-icons-kit/md/ic_mode_edit'
import {ic_delete_outline_outline} from 'react-icons-kit/md/ic_delete_outline_outline'
const Users = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        setIsLoading(true);
        let result = await userController.getUsers();
        console.log(result);
        if (result) {
            setUsers(result);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const getAll = async () => await getUsers();
        getAll();
    }, []);

    if (isLoading) {
        return (
            <Loading />
        )
    }
    else if (users.length > 0) {
        return (
            <div className="container-fluid">
                <div className="row p-3">
                    <div className="col">
                        <div className="card p-3">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-row align-items-center">
                                    <div>
                                        <h2 className="p-2 text-center rrumullaku">BK</h2>
                                    </div>
                                    <div class="ms-4 c-details">
                                        <h4 class="mb-0">Besar Kutleshi</h4>
                                        <span>besarkutleshi@keds-energy.com</span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-around mt-4">
                                <button className="btn btn-info"><Icon size={20} icon={ic_admin_panel_settings_outline} /> Roles</button>
                                <button className="btn btn-primary"><Icon size={20} icon={ic_mode_edit}/> Update</button>
                                <button className="btn btn-danger"><Icon size={20} icon={ic_delete_outline_outline} /> Delete</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card p-3">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-row align-items-center">
                                    <div>
                                        <h2 className="p-2 text-center rrumullaku">BK</h2>
                                    </div>
                                    <div class="ms-4 c-details">
                                        <h4 class="mb-0">Besar Kutleshi</h4>
                                        <span>besarkutleshi@keds-energy.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card p-3">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-row align-items-center">
                                    <div>
                                        <h2 className="p-2 text-center rrumullaku">BK</h2>
                                    </div>
                                    <div class="ms-4 c-details">
                                        <h4 class="mb-0">Besar Kutleshi</h4>
                                        <span>besarkutleshi@keds-energy.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {
                        users.map((element, key) => {
                            return (
                                <div className="col-lg-12">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row align-items-center">
                                            <div><h2 className="p-2 text-center rrumullaku">BK</h2> </div>
                                            <div class="ms-4 c-details">
                                                <h4 class="mb-0">Besar Kutleshi</h4>
                                                <span>besarkutleshi@keds-energy.com</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    } */}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <button className="btn btn-primary">Insert User</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Users;