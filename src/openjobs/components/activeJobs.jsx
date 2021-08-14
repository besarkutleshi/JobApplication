import React, { useState, useEffect } from 'react'
import openJobsController from '../controllers/openJobs.controller';
import Loading from '../../loader/components/loader'
import '../style/activeJobs.css'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fillOpenJobArray } from '../reduxStore/reducers/action'
import { Link } from 'react-router-dom'
const ActiveOpenJobs = () => {

    const dispatch = useDispatch();
    const fillStoreArray  = bindActionCreators(fillOpenJobArray,dispatch);
    
    const [isLoading, setIsLoading] = useState([]);
    const [activeJobs, setActiveJobs] = useState([]);

    const getActiveJobs = async () => {
        setIsLoading(true);
        let jobs = await openJobsController.getActiveJobs();
        if (jobs) {
            setActiveJobs(jobs);
            fillStoreArray(jobs);
        }
        setIsLoading(false);
    }


    useEffect(() => {
        const getJobs = async () => {
            await getActiveJobs();
        }
        getJobs();
    }, []);


    if (isLoading) {
        return (
            <Loading />
        )
    }
    else if (activeJobs.length > 0) {
        return (
            <div className="container-fluid">
                <br /><br />
                <div className="row">
                    {
                        activeJobs.map((element, key) => {
                            return (
                                <div class="col-md-4">
                                    <div class="card p-3 mb-2">
                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex flex-row align-items-center">
                                                <div class=""> <img src={require(`../../images/jobImageDeveloper.jpeg`).default}  className="rounded" width="100px" height="100px" /> </div>
                                                <div class="ms-2 c-details">
                                                    <h6 class="mb-0">KEDS</h6> <span>{element.dayAgo} days ago</span>
                                                </div>
                                            </div>
                                            <div class="badge"> <span>{element.jobLocation}</span>  </div>
                                            
                                        </div>
                                        <div class="mt-4">
                                            <h4 class="heading">{element.experienceLevel.split(' ')[0]} {element.openJobName}</h4>
                                        </div>
                                        <div className="d-flex justify-content-between mt-3">
                                            <div class=""> <span class="text1">{element.applicationsNumber} Applied <span class="text2">of {element.noEmployeesWanted} capacity</span></span> </div>
                                            <Link to={{ pathname:`/activeJobDetails/${element.id}`, state: {id : element.id} }} className="btn btn-info">Job Details </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container-fluid">
                <br />
                <div className="row">
                    <h4 className="text-center">Sorry, does not have any open job!</h4>
                </div>
            </div>
        )
    }

}

export default ActiveOpenJobs;