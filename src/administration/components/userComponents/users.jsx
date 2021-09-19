import React, { useState, useEffect } from 'react'
import userController from '../../controllers/user.controller'
import Loading from '../../../loader/components/loader'
import Icon from 'react-icons-kit'
import { ic_admin_panel_settings_outline } from 'react-icons-kit/md/ic_admin_panel_settings_outline'
import { plus } from 'react-icons-kit/icomoon/plus'
import { ic_delete_outline_outline } from 'react-icons-kit/md/ic_delete_outline_outline'
import roleController from '../../controllers/role.controller'
import Notification from '../../../alerts/components/notification'
import $ from 'jquery'
import securityController from '../../../authentication/controllers/security.controller'
import Swal from 'sweetalert2'
import {ic_refresh} from 'react-icons-kit/md/ic_refresh'
import {Pagination} from 'antd'
import { useSelector } from 'react-redux'
const Users = () => {

    const user = useSelector((state) => state.login.user);

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [userId, setUserId] = useState(0);
    const [allUsers, setAllUsers] = useState([]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRoles, setSelectedRoles] = useState('');

    const [count, setCount] = useState(12);

    const onPaginationChange = (value) => {
        let endNumber = count * value;
        let startNumber = endNumber - count === 0 ? 1 : endNumber - count; 
        filterJobPagination(users,startNumber,endNumber);
    }

    const filterJobPagination = (users,start,end) => {
        setIsLoading(true);
        let result = users.slice(start === 1 ? 0 : start, end);
        setUsers(result);
        setIsLoading(false);
    }

    const getUsers = async () => {
        setIsLoading(true);
        let result = await userController.getUsers();
        if (result) {
            setUsers(result);
            setAllUsers(result);
        }
        await getRoles();
        setIsLoading(false);
    }

    const getUserRoles = async (id) => {
        setUserRoles([]);
        setUserId(id);
        let result = await userController.getUserRoles(id);
        if (result) {
            setUserRoles(result.roles);
        }
    }

    const changeUserRole = (event) => {
        let roles = userRoles;
        roles.forEach(element => {
            if (element.roleID.toString() === event.target.value.toString()) {
                element.isChecked = event.target.checked;
                document.getElementById(element.roleID).checked = event.target.checked;
            }
        });
        setUserRoles(roles);
    }

    const changeSelectedUserRoles = (event) => {
        let roles = selectedRoles;
        roles.forEach(element => {
            if (element.roleID.toString() === event.target.value.toString()) {
                element.isChecked = event.target.checked;
                document.getElementById(element.roleID).checked = event.target.checked;
            }
        })
        setSelectedRoles(roles);
    }

    const saveRoles = async () => {
        let result = await userController.updateUserRoles(userId, userRoles);
        if (result) {
            $("#closeModal").click();
            Notification("success", "Roles", "Updated successfuly");
        }
    }

    const getRoles = async () => {
        setSelectedRoles([]);
        let result = await roleController.getRoles();
        if (result) {
            let array = [];
            result.forEach(element => {
                let obj = { roleID: element.roleID, roleName: element.roleName, isChecked: false };
                array.push(obj);
            });
            setSelectedRoles(array);
        }
    }

    const createUser = async () => {
        let obj = { Username: username, Password: securityController.encrypt(password), userRoles: selectedRoles, insertBy:user.userId };
        let result = await userController.createUser(obj);
        if (result > 0) {
            $("#closeCreateUserModal").click();
            Notification("success", "User", "Created successfuly");
            let user = { id: result, name: null, username: username, description: null, isChecked: false, isActive: 1, roles: [] };
            setUsers([...users, user]);
            clearFiles(selectedRoles);
        }
    }

    const deleteUser = async (id) => {
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
            let result = await userController.deleteUser(id);
            if (result) {
                Notification("success", "User", "Deleted successfuly");
                let array = users.filter(element => {
                    return element.id !== id;
                })
                setUsers(array);
            }
        }
    }

    const clearFiles = (array) => {
        if (array) {
            array.forEach(element => {
                let domElement = document.getElementById(element.roleID);
                if (domElement) {
                    domElement.checked = false;
                }
            })
        }
        setPassword('');
        setUsername('');
    }

    const onSearch = (event) => {
        let text = event.target.value;

        if(!text || text === ""){
            setUsers(allUsers);
            return;
        }

        let array = []
        allUsers.forEach(element => {
            if(element.name.toLowerCase().startsWith(text.toLowerCase())){
                array.push(element);
            }
        });

        setUsers(array);
    }


    const getCreateUserModal = () => {
        return(
            <div className="row">
                    <div className="col-lg-12">
                        <div class="modal fade" id="createUserModalToggle" aria-hidden="true" aria-labelledby="createUserModalToggleLabel" tabindex="-1">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="createUserModalToggleLabel">Create User</h5>
                                        <button type="button" id="closeCreateUserModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" placeholder="Email" />
                                            </div>
                                            <div className="col-lg-4">
                                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" />
                                            </div>
                                        </div>
                                        <hr />
                                        <h5>Roles</h5>
                                        <div className="row pl-1">
                                            {
                                                (selectedRoles && selectedRoles.length > 0) && selectedRoles.map((element, key) => {
                                                    return (
                                                        <div className="col-lg-12" key={key}>
                                                            <div className="form-check">
                                                                <input id={element.roleID} type="checkbox" className="form-check-input mt-1"
                                                                    value={element.roleID}
                                                                    defaultChecked={element.isChecked}
                                                                    onClick={changeSelectedUserRoles} />
                                                                <label class="form-check-label" htmlFor="isChecked">{element.roleName}</label>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-primary" onClick={() => createUser()}>Create User</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
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


                <div className="ml-3 mr-3 d-flex justify-content-between" id="searchBox">
                    <input onChange={onSearch} style={{ width: "300px" }} type="text" className="form-control" placeholder="Search Users..." />
                    <button style={{ width: "200px" }} className="btn btn-info" data-bs-toggle="modal" href="#createUserModalToggle" role="button"><Icon icon={plus} /> Create User</button>
                </div>

                {/* <div className="row mb-1 p-3">
                    <div className="col-lg-4">
                        <button className="btn btn-info" data-bs-toggle="modal" href="#createUserModalToggle" role="button"><Icon  icon={plus} /> Create User</button>
                    </div>
                </div> */}
                <div className="row p-3">
                    {
                        users.map((element, key) => {
                            return (
                                <div className="col mb-2" key={key}>
                                    <div className="card p-3">
                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex flex-row align-items-center">
                                                <div>
                                                    <h2 className="p-2 text-center rrumullaku">{element.name !== null ? element.name.split(' ')[0].substring(0, 1) : "N"}{element.name !== null ? element.name.split(' ')[1].substring(0, 1) : "P"}</h2>
                                                </div>
                                                <div class="ms-4 c-details">
                                                    <h5 class="mb-0">{element.name !== null ? element.name : "No profile created"}</h5>
                                                    <span>{element.username}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-around mt-4">
                                            <button className="btn btn-info" onClick={() => getUserRoles(element.id)} data-bs-toggle="modal" href="#exampleModalToggle" role="button"><Icon size={20} icon={ic_admin_panel_settings_outline} /> Roles</button>
                                            <button className="btn btn-danger" onClick={() => deleteUser(element.id)} ><Icon size={20} icon={ic_delete_outline_outline} /> Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>


                <div className="row">
                    <div className="col-lg-12">
                        <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalToggleLabel">User roles</h5>
                                        <button type="button" id="closeModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div className="row">
                                            {
                                                (userRoles && userRoles.length > 0) ? userRoles.map((element, key) => {
                                                    return (
                                                        <div className="col-lg-12" key={key}>
                                                            <div className="form-check">
                                                                <input id={element.roleID} type="checkbox" className="form-check-input mt-1"
                                                                    value={element.roleID}
                                                                    defaultChecked={element.isChecked}
                                                                    onClick={changeUserRole} />
                                                                <label class="form-check-label" htmlFor="isChecked">{element.roleName}</label>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                :
                                                'Loading...'
                                            }
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-primary" onClick={() => saveRoles()}>Save Roles</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    getCreateUserModal()
                }

                
                <br />
                <div className="row m-1">
                    <div className="col">
                        <Pagination className="float-right" onChange={onPaginationChange} total={users.length} />
                    </div>
                </div>

            </div>
        )
    }
    else {
        return (
            <div className="container-fluid">
                {
                    getCreateUserModal()
                }
                <div className="ml-3 mr-3 d-flex justify-content-between" id="searchBox">
                    <button style={{ width: "200px" }} className="btn btn-info" data-bs-toggle="modal" href="#createUserModalToggle" role="button"><Icon icon={plus} /> Create User</button>
                    <button style={{ width: "200px" }} className="btn btn-info" onClick={() => {
                        setUsers(allUsers)
                    }}><Icon icon={ic_refresh} size={25} /> Refresh</button>
                </div>

                <p className="text-muted text-center mt-5">Does not have any user, please refresh or create one!</p>
            </div>
        )
    }
}

export default Users;