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
import { fillOpenJobArray } from '../reduxStore/reducers/action'
import { Link } from 'react-router-dom'
import Loading from '../../loader/components/loader'
import MUI from 'mui-datatables'
import {ic_event_available_twotone} from 'react-icons-kit/md/ic_event_available_twotone'
import {ic_event_busy_twotone} from 'react-icons-kit/md/ic_event_busy_twotone'
import {ic_disabled_by_default_twotone} from 'react-icons-kit/md/ic_disabled_by_default_twotone'
import {ic_work_twotone} from 'react-icons-kit/md/ic_work_twotone'
const OpenJobList = () => {

    const user = useSelector((state) => state.login.user);
    const config = useSelector((state) => state.config.headers);
    
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
                <div className="row">
                    <div className="col-sm-3 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-center lead">Active Jobs</h6>
                                <br />
                                    <i> <Icon size={40} icon={ic_event_available_twotone} className="text-success" /> </i>
                                    <h5 style={{marginTop:"-30px"}} className="text-center">{ openJobs.filter((e) => e.isActive === 1 && e.status === 'Open').length }</h5>
                                <div className="d-flex">
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-center lead">Expired Jobs</h6>
                                <br />
                                <i><Icon icon={ic_event_busy_twotone} size={40}  className="text-danger"></Icon></i>
                                <h5 style={{marginTop:"-30px"}} className="text-center">{ openJobs.filter((e) => e.status === 'Expired').length }</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-center lead">Pasive Jobs</h6>
                                <br />
                                <i><Icon icon={ic_disabled_by_default_twotone} size={40} className="text-warning" /></i>
                                <h5 style={{marginTop:"-30px"}} className="text-center">{openJobs.filter((e) => e.isActive === 0).length}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-center lead">Total Jobs</h6>
                                <br />
                                <i><Icon icon={ic_work_twotone} size={40} className="text-info" /></i>
                                <h5 style={{marginTop:"-30px"}} className="text-center">{openJobs.length}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-4 float-right">
                        <Link to={{pathname:"/insertJob"}} className="btn btn-primary"> <Icon icon={plus} /> Add a new job vacancy</Link>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-12">
                        <MUI 
                            title = "Job List"
                            data = {
                                openJobs.map((element, key) => {
                                    let array = [
                                        element.openJobName,element.departament,element.division,element.remainingDays + ' Days',element.expireDate.toString().split('T')[0],element.applicationsNumber,element.status,
                                        <Link to={{ pathname:`/openJobDetail/${element.id}`, state: {openJobID : element.id} }} className="btn btn-primary"><Icon icon={arrowRight2} /> </Link>]
                                    return array;
                                })
                            }
                            columns = {["Position","Departament","Division","Remaining Time","Expire Date","Number of Applicants","Status","Details"]}
                        />
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-sm-12">
                    <table id="openJobList" className="table">
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
                </div> */}
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