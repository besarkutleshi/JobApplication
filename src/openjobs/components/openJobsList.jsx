import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import openJobsController from '../controllers/openJobs.controller';
import Icon from 'react-icons-kit'
import {plus} from 'react-icons-kit/fa/plus'
import '../style/style.css'
import {arrowRight2} from 'react-icons-kit/icomoon/arrowRight2'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fillOpenJobArray } from '../reduxStore/reducers/action'
import { Link } from 'react-router-dom'
import Loading from '../../loader/components/loader'
const OpenJobList = () => {

    const user = useSelector((state) => state.login.user);
    const config = {
        headers:{
            Authorization: `Bearer ${user.token != "" ? user.token : ''}`
        }
    }
    const openJobsStore = useSelector((state) => state.openJobs.openJobs);
    const [isLoading, setIsLoading] = useState(true);
    const [openJobs, setOpenJobs] = useState([]);
    const dispatch = useDispatch();
    const fillStoreArray  = bindActionCreators(fillOpenJobArray,dispatch);

    const getOpenJobs = async () => {
        setIsLoading(true);
        let openJobs = await openJobsController.getOpenJobs(config);   
        if(openJobs){
            $(document).ready(function () {
                $('#openJobList').DataTable();
            });
            setOpenJobs(openJobs);
            fillStoreArray(openJobs);
            setIsLoading(false);
        }
        else if(openJobsStore.length > 0){
            console.log(openJobsStore);
            setOpenJobs(openJobsStore)
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const getJobs = async () => {
            await getOpenJobs();
        }
        getJobs();
    }, []);

    if(isLoading){
        return(
            <Loading />
        )
    }
    else if (openJobs && openJobs.length > 0){
        return (
            <div className="container-fluid" > 
            <br />
                <h5 className="text-center lead" style={{marginTop:'-40px'}}>Jobs List</h5>
                <br />
                <div className="row">
                    <div className="col-sm-3 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-center lead">Active Jobs</h6>
                                <br />
                                <h5 className="text-center">{ openJobs.filter((e) => e.isActive === 1 && e.status === 'Open').length }</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-center lead">Expired Jobs</h6>
                                <br />
                                <h5 className="text-center">{ openJobs.filter((e) => e.status === 'Expired').length }</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-center lead">Pasive Jobs</h6>
                                <br />
                                <h5 className="text-center">{openJobs.filter((e) => e.isActive === 0).length}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-center lead">Total Jobs</h6>
                                <br />
                                <h5 className="text-center">{openJobs.length}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-12">
                        <Link to={{pathname:"/insertJob"}} className="btn btn-primary float-right"> <Icon icon={plus} /> Add a new job vacancy</Link>
                    </div>
                </div>
                <br />
                {/* <div className="row">
                    <div className="col-sm-12">
                        <MUI 
                            title = "Job List"
                            data = {
                                openJobs.map((element, key) => {
                                    let array = [
                                        element.openJobName,element.departament,element.division,61,element.expireDate.toString().split('T')[0],element.applicationsNumber,
                                        <Link to={{ pathname:`/openJobDetail/${element.id}`, state: {openJobID : element.id} }} className="btn btn-primary"><Icon icon={arrowRight2} /> </Link>]
                                    return array;
                                })
                            }
                            columns = {["Position","Departament","Division","Remaining Time","Expire Date","Number of Applicants","Details"]}
                        />
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-sm-12">
                    <table id="openJobList" className="display table">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Departament</th>
                                <th>Division</th>
                                <th>Remaining Time</th>
                                <th>Expire Date</th>
                                <th>Number of Applicants</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                openJobs.map((element,key) => {
                                    return(
                                        <tr key={key}>
                                            <td>{element.openJobName}</td>
                                            <td>{element.departament}</td>
                                            <td>{element.division}</td>
                                            <td>61</td>
                                            <td>{element.expireDate.toString().split('T')[0]}</td>
                                            <td>{element.applicationsNumber}</td>
                                            <td><Link to={{ pathname:`/openJobDetail/${element.id}`, state: {openJobID : element.id} }} className="btn btn-primary"><Icon icon={arrowRight2} /> </Link></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Position</th>
                                <th>Departament</th>
                                <th>Division</th>
                                <th>Remaining Time</th>
                                <th>Expire Date</th>
                                <th>Number of Applicants</th>
                                <th>Details</th>
                            </tr>
                        </tfoot>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="row">
                <div className="col-sm-12 text-center">
                    <h4>Does not have any registered job!</h4>
                    <br />
                    <Link to={{pathname:"/insertJob"}} className="btn btn-primary"> <Icon icon={plus} /> Add a new job vacancy</Link>
                </div>
            </div>
        )
    }
}
export default OpenJobList;