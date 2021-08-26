import React, { useState, useEffect } from 'react'
import openJobsController from '../controllers/openJobs.controller';
import Loading from '../../loader/components/loader'
import '../style/activeJobs.css'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fillOpenJobArray } from '../reduxStore/reducers/action'
import { Link } from 'react-router-dom'
import bg from '../../images/recruitment.jpg'
import { Input } from 'antd'
import Icon from 'react-icons-kit'
import { search } from 'react-icons-kit/icomoon/search'
import { Select } from 'antd';
import jobCategoryController from '../controllers/jobCategory.controller';
const { Option } = Select;
const ActiveOpenJobs = () => {

    const dispatch = useDispatch();
    const fillStoreArray = bindActionCreators(fillOpenJobArray, dispatch);

    const [isLoading, setIsLoading] = useState([]);
    const [activeJobs, setActiveJobs] = useState([]);

    const [jobName, setJobName] = useState();
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [city, setCity] = useState();
    
    const getJobCategories = async () => {
        let result = await jobCategoryController.getCategories({});
        if (result) {
            setCategories(result)
        }
    }

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
            await getJobCategories();
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
            <div className="" style={{ marginTop: "-38px" }}>
                <div className="container-fluid">

                </div>
                <div className="row" id="findJobRow" style={{backgroundImage: `url(${bg})`}}>
                    <div id="search" className="container">
                        <p className="float-left  text-muted lead"> <b>Find you dream job. </b></p>
                        <br />
                        <div className="p-5">
                            <div className="row">
                                <div className="col-sm-3">
                                    <Input value={jobName} onChange={(e) => setJobName(e.target.value)} size="large" className="d-flex mb-2" placeholder="Search Job" prefix={<Icon style={{ color: "gray" }} icon={search} />} />
                                </div>
                                <div className="col-sm-3">
                                    <Select
                                        showSearch
                                        style={{ width: 220 }}
                                        placeholder="Select category"
                                        size="large"
                                        className="mb-2"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e)}
                                    >
                                        {
                                            categories.map((element,key) => {
                                                return(
                                                    <Option key={key} value={element.id}>{element.category}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className="col-sm-3">
                                    <Select
                                        showSearch
                                        style={{ width: 220 }}
                                        placeholder="Select city"
                                        size="large"
                                        className="mb-2"
                                        value={city}
                                        onChange={(e) => setCity(e)}
                                    >
                                        <Option value="Ferizaj">Ferizaj</Option>
                                        <Option value="Gjakove">Gjakove</Option>
                                        <Option value="Gjilan">Gjilan</Option>
                                        <Option value="Mitrovice">Mitrovice</Option>
                                        <Option value="Peje">Peje</Option>
                                        <Option value="Prishtine">Prishtine</Option>
                                        <Option value="Prizren">Prizren</Option>
                                        <Option value="Podujeva">Podujeva </Option>	      
                                        <Option value="Vushtrri">Vushtrri	</Option>      
                                        <Option value="Suharekë">Suharekë	</Option>      
                                        <Option value="Rahovec">Rahovec	</Option>          
                                        <Option value="Drenas">Drenas	   </Option>       
                                        <Option value="Lipjan">Lipjan	  </Option>        
                                        <Option value="Malishevë">Malishevë	 </Option>     
                                        <Option value="Kamenicë">Kamenicë	 </Option>     
                                        <Option value="Viti">Viti	</Option>          
                                        <Option value="Deçan">Deçan	</Option>          
                                        <Option value="Istog">Istog	 </Option>         
                                        <Option value="Klinë">Klinë	</Option>          
                                        <Option value="Skenderaj">Skenderaj	 </Option>     
                                        <Option value="Dragash">Dragash	 </Option>         
                                        <Option value="Fushë Kosovë">Fushë Kosovë	</Option>  
                                        <Option value="Kaçanik">Kaçanik	</Option>          
                                        <Option value="Mitrovica Veriore">Mitrovica Veriore</Option>
                                        <Option value="Shtime">Shtime	    </Option>      
                                        <Option value="Obiliq">Obiliq	    </Option>      
                                        <Option value="Leposaviq">Leposaviq	 </Option>     
                                        <Option value="Graçanicë">Graçanicë	 </Option>     
                                        <Option value="Hani Elezit">Hani Elezit</Option>	  
                                        <Option value="Zveçan">Zveçan	    </Option>      
                                        <Option value="Shtërpcë">Shtërpcë	</Option>      
                                        <Option value="Novobërdë">Novobërdë	 </Option>     
                                        <Option value="Zubin Potok">Zubin Potok</Option>	      
                                        <Option value="Junik">Junik	 </Option>         
                                        <Option value="Mamusha">Mamusha</Option>	          
                                        <Option value="Ranillug">Ranillug</Option>	      
                                        <Option value="Kllokoti">Kllokoti</Option>	      
                                        <Option value="Parteshi">Parteshi	</Option>      
                                    </Select>
                                </div>
                                <div className="col-sm-3">
                                    <button style={{ width: "100%" }} className="btn btn-primary"> <Icon icon={search} /> Search</button>
                                </div>
                            </div>
                        </div>
                        <p className="float-left lead text-muted"><b>We have {activeJobs.length} job offers for you! </b></p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12 text-center">
                        <h5 style={{ fontSize: "24px" }} className="lead text-muted">Find the <b>right job</b>. <b> Right now. </b></h5>
                    </div>
                </div>
                <br /><br />
                <div className="row">
                    {
                        activeJobs.map((element, key) => {
                            return (
                                <div class="col-md-3">
                                    <div class="card p-3 mb-2">
                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex flex-row align-items-center">
                                                <div class=""> <img src={require(`../../images/jobImageDeveloper.jpeg`).default} className="rounded" width="100px" height="100px" /> </div>
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
                                            <Link to={{ pathname: `/activeJobDetails/${element.id}`, state: { id: element.id } }} className="btn btn-info">Job Details </Link>
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