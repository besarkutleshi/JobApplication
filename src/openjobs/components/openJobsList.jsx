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
import { addJob,deleteJob,fillOpenJobArray } from '../reduxStore/reducers/action'
import { Link } from 'react-router-dom'

const OpenJobList = () => {

    const [openJobs, setOpenJobs] = useState([]);
    
    const openJobsStore =  useSelector((state) => state.openJobs.openJobs);
    const dispatch = useDispatch();

    const fillStoreArray  = bindActionCreators(fillOpenJobArray,dispatch);

    const getOpenJobs = async () => {
        let openJobs = await openJobsController.getOpenJobs();
        console.log(openJobs);
        $(document).ready(function () {
            $('#openJobList').DataTable();
        });
        setOpenJobs(openJobs);
        fillStoreArray(openJobs);
        console.log(openJobsStore);
    }

    useEffect(() => {
        const getJobs = async () => {
            await getOpenJobs();
        }
        getJobs();
    }, []);


    return (
        <div className="container-fluid" > 
            <h5 className="text-center lead" style={{marginTop:'-40px'}}>Open Jobs List</h5>
            <br />
            <div className="row">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="text-center lead">Active Jobs</h6>
                            <br />
                            <h5 className="text-center">50</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="text-center lead">Expired Jobs</h6>
                            <br />
                            <h5 className="text-center">50</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="text-center lead">Active Jobs</h6>
                            <br />
                            <h5 className="text-center">50</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="text-center lead">Total Jobs</h6>
                            <br />
                            <h5 className="text-center">50</h5>
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
            <div className="row">
                <table id="openJobList" class="display">
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
                </table>
            </div>
        </div>
    )
}
export default OpenJobList;