import React, { useState, useEffect } from 'react'
import roleController from '../../controllers/role.controller'
import Loading from '../../../loader/components/loader'
import Icon from 'react-icons-kit'
import { users } from 'react-icons-kit/icomoon/users'
import { plus } from 'react-icons-kit/icomoon/plus'
import { ic_delete_outline_outline } from 'react-icons-kit/md/ic_delete_outline_outline'
import Notification from '../../../alerts/components/notification'
import $ from 'jquery'
import Swal from 'sweetalert2'
import userController from '../../controllers/user.controller'
import { pencil } from 'react-icons-kit/icomoon/pencil'
import {ic_refresh} from 'react-icons-kit/md/ic_refresh'
import {Pagination} from 'antd'
import { useSelector } from 'react-redux'
const Roles = () => {
    
    const user = useSelector((state) => state.login.user);

    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [usersInRole, setUsersInRole] = useState([]);
    const [roleId, setRoleId] = useState(0);
    const [allRoles, setAllRoles] = useState([]);

    const [roleName, setRoleName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]); 
    
    const [count, setCount] = useState(12);

    const onPaginationChange = (value) => {
        let endNumber = count * value;
        let startNumber = endNumber - count === 0 ? 1 : endNumber - count; 
        filterJobPagination(roles,startNumber,endNumber);
    }

    const filterJobPagination = (roles,start,end) => {
        setIsLoading(true);
        let result = roles.slice(start === 1 ? 0 : start, end);
        setRoles(result);
        setIsLoading(false);
    }

    const getRoles = async () => {
        setIsLoading(true);
        let result = await roleController.getRoles();
        if (result) {
            setRoles(result);
            setAllRoles(result)
        }
        await getUsers();
        setIsLoading(false);
    }

    const getUsersInRole = async (roleId) => {
        setUsersInRole([]);
        setRoleId(roleId);
        let result = await roleController.getUsersInRole(roleId);
        if (result) {
            setUsersInRole(result.users);
        }
    }

    const changeUsersInRole = (event) => {
        let roles = usersInRole;
        roles.forEach(element => {
            if (element.id.toString() === event.target.value.toString()) {
                element.isChecked = event.target.checked;
                document.getElementById(element.id).checked = event.target.checked;
            }
        });
        setUsersInRole(roles);
    }

    const saveUsersInRole = async () => {
        let array = [];
        usersInRole.forEach(element => {
            let obj = { userId: element.id, roleId: roleId, isChecked: element.isChecked }
            array.push(obj);
        });
        let inserted = await roleController.saveUsersInRole(roleId, array);
        if (inserted) {
            $("#closeModal").click();
            Notification("success", "Users", "Updated successfuly!");
        }
    }

    const getUsers = async () => {
        let result = await userController.getUsers();
        if (result) {
            let array = [];
            result.forEach(element => {
                let obj = { userId: element.id, username: element.username, isChecked: false };
                array.push(obj);
            });
            setSelectedUsers(array);
        }
    }

    const changeSelectedUsersInRole = (event) => {
        let roles = selectedUsers;
        roles.forEach(element => {
            if (element.userId.toString() === event.target.value.toString()) {
                element.isChecked = event.target.checked;
                document.getElementById(element.userId).checked = event.target.checked;
            }
        });
        setSelectedUsers(roles);
    }

    const createRole = async () => {
        let obj = { RoleName: roleName, UserRoles: selectedUsers, insertBy:user.userId };
        let created = await roleController.createRole(obj);
        if (created > 0) {
            $("#closeCreateRoleModal").click();
            Notification("success", "Role", "Created successfuly!");
            let role = { roleID: created, roleName: roleName, isChecked: false, users: [] };
            setRoles([...roles, role]);
        }
        clearFields(selectedUsers);
    }

    const deleteRole = async (id) => {
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
            let result = await roleController.deleteRole(id);
            if (result) {
                Notification("success", "Role", "Deleted successfuly");
                let array = roles.filter(element => {
                    return element.roleID !== id;
                })
                setRoles(array);
            }
        }
    }

    const getDataForUpdate = (id) => {
        setRoleId(id);
        let obj = roles.find(r => r.roleID === id);
        setRoleName(obj.roleName);
    }

    const updateRole = async () => {
        let obj = { Id: roleId, RoleName: roleName, updateBy:user.userId };
        let updated = await roleController.updateRole(obj);
        if (updated) {
            $("#closeUpdateRoleModal").click();
            Notification("success", "Role", "Updated successfuly");
            roles.forEach(element => {
                if (element.roleID == roleId) {
                    element.roleName = roleName;
                }
            })
        }
        clearFields();
    }


    const clearFields = (array = null) => {
        if (array) {
            array.forEach(element => {
                let domElement = document.getElementById(element.roleID);
                if (domElement) {
                    domElement.checked = false;
                }
            })
        }
        setRoleName("");
        setRoleId(0);
    }

    const onSearch = (event) => {
        let text = event.target.value;

        if (!text || text === "") {
            setRoles(allRoles);
            return;
        }

        let array = []
        allRoles.forEach(element => {
            if (element.roleName.toLowerCase().startsWith(text.toLowerCase())) {
                array.push(element);
            }
        });

        setRoles(array);
    }

    useEffect(() => {
        const get = async () => await getRoles();
        get();
    }, [])

    const getCreateRoleModal = () => {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div class="modal fade" id="createRoleModalToggle" aria-hidden="true" aria-labelledby="createRoleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="createRoleModalToggleLabel">Create Role</h5>
                                    <button type="button" id="closeCreateRoleModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <input value={roleName} onChange={(e) => setRoleName(e.target.value)} type="text" className="form-control" placeholder="Role Name" />
                                        </div>
                                    </div>
                                    <hr />
                                    <h5>Users</h5>
                                    <div className="row pl-1">
                                        {
                                            (selectedUsers && selectedUsers.length > 0) && selectedUsers.map((element, key) => {
                                                return (
                                                    <div className="col-lg-12" key={key}>
                                                        <div className="form-check">
                                                            <input id={element.userId} type="checkbox" className="form-check-input mt-1"
                                                                value={element.userId}
                                                                defaultChecked={element.isChecked}
                                                                onClick={changeSelectedUsersInRole} />
                                                            <label class="form-check-label" htmlFor="isChecked">{element.username}</label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary" onClick={() => createRole()}>Create Role</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    if (isLoading) {
        return (
            <Loading />
        )
    }
    else if (roles.length > 0) {
        return (
            <div className="container-fluid">

                <div className="ml-3 mr-3 d-flex justify-content-between" id="searchBox">
                    <input onChange={onSearch} style={{ width: "300px" }} type="text" className="form-control" placeholder="Search Roles..." />
                    <button className="btn btn-info" data-bs-toggle="modal" href="#createRoleModalToggle" role="button"><Icon icon={plus} /> Create Role</button>
                </div>

                <div className="row p-3">
                    {
                        roles.map((element, key) => {
                            return (
                                <div className="col mb-2" key={key}>
                                    <div className="card p-3">
                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex flex-row align-items-center">
                                                <div>
                                                    <h2 className="p-2 text-center rrumullaku">{element.roleName.split(' ')[0].substring(0, 2)}</h2>
                                                </div>
                                                <div class="ms-4 c-details">
                                                    <h5 class="mb-0">{element.roleName}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-around mt-4">
                                            <button className="btn btn-primary" onClick={() => getUsersInRole(element.roleID)} data-bs-toggle="modal" href="#exampleModalToggle" role="button"><Icon size={20} icon={users} />Users</button>
                                            <button className="btn btn-info" data-bs-toggle="modal" href="#updateRoleModalToggle" onClick={() => getDataForUpdate(element.roleID)} > <Icon icon={pencil} size={17} /> Update </button>
                                            <button className="btn btn-danger" onClick={() => deleteRole(element.roleID)} ><Icon size={20} icon={ic_delete_outline_outline} />Delete</button>
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
                                                (usersInRole && usersInRole.length > 0) ? usersInRole.map((element, key) => {
                                                    return (
                                                        <div className="col-lg-12" key={key}>
                                                            <div className="form-check">
                                                                <input id={element.id} type="checkbox" className="form-check-input mt-1"
                                                                    value={element.id}
                                                                    defaultChecked={element.isChecked}
                                                                    onClick={changeUsersInRole}
                                                                />
                                                                <label class="form-check-label" htmlFor="isChecked">{element.username}</label>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                :
                                                "Loading..."
                                            }
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-primary" onClick={() => saveUsersInRole()} >Save Roles</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    getCreateRoleModal()
                }


                <div className="row">
                    <div className="col-lg-12">
                        <div class="modal fade" id="updateRoleModalToggle" aria-hidden="true" aria-labelledby="updateRoleModalToggleLabel" tabindex="-1">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="updateRoleModalToggleLabel">Update Role</h5>
                                        <button type="button" id="closeUpdateRoleModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <input value={roleName} onChange={(e) => setRoleName(e.target.value)} type="text" className="form-control" placeholder="Role Name" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-primary" onClick={() => updateRole()}>Update Role</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <div className="row m-1">
                    <div className="col">
                        <Pagination className="float-right" onChange={onPaginationChange} total={roles.length} />
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container-fluid">
                {
                    getCreateRoleModal()
                }
                <div className="ml-3 mr-3 d-flex justify-content-between" id="searchBox">
                    <button className="btn btn-info" data-bs-toggle="modal" href="#createRoleModalToggle" role="button"><Icon icon={plus} /> Create Role</button>
                    <button style={{ width: "200px" }} className="btn btn-info" onClick={() => {
                        setRoles(allRoles)
                    }}><Icon icon={ic_refresh} size={25} /> Refresh</button>
                </div>

                <p className="text-muted text-center mt-5">Does not have any role, please refresh or create one!</p>
            </div>
        )
    }

}

export default Roles;