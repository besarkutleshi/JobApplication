import React, { useState, useEffect } from 'react'
import openJobsController from '../controllers/openJobs.controller';
import Loading from '../../images/loader.gif'
import '../style/activeJobs.css'
import image from '../../images/jobImageDeveloper.jpeg'
const ActiveOpenJobs = () => {

    const [isLoading, setIsLoading] = useState([]);
    const [activeJobs, setActiveJobs] = useState([]);

    const getActiveJobs = async () => {
        setIsLoading(true);
        let jobs = await openJobsController.getActiveJobs();
        if (jobs) {
            setActiveJobs(jobs);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const getJobs = async () => {
            await getActiveJobs();
        }
        getJobs();
    }, []);


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
                                        {/* <div class="mt-5">
                                            <div class="progress">
                                                <div class="progress-bar" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <div class=""> <span class="text1">{element.applicationsNumber} Applied <span class="text2">of {element.noEmployeesWanted} capacity</span></span> </div>
                                        <button className="btn btn-secondary float-right">Job Details</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )


    // if (isLoading) {
    //     return (
    //         <Loading />
    //     )
    // }
    // else if (activeJobs.length > 0) {

    // }
    // else {
    //     return (
    //         <div className="container-fluid">
    //             <br />
    //             <div className="row">
    //                 <h4 className="text-center">Sorry, does not have any open job!</h4>
    //             </div>
    //         </div>
    //     )
    // }

}

export default ActiveOpenJobs;