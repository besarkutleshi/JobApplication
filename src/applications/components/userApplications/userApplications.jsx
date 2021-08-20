import React,{ useState, useEffect } from 'react'
import applicationController from '../../controllers/application.controller';
import { useSelector } from 'react-redux'
import Loading from '../../../loader/components/loader'
import Icon from 'react-icons-kit'
import {sad} from 'react-icons-kit/icomoon/sad'

const UserApplications = () => {

    const user = useSelector((state) => state.login.user);
    console.log(user);
    const [isLoading, setIsLaoding] = useState(false);
    const [userApplications, setUserApplications] = useState([]);


    const getUserApplications = async () => {
        setIsLaoding(true);
        let result = await applicationController.getUserApplications(user.userId);
        if(result){
            setUserApplications(result);
            console.log(result);
        }
        setIsLaoding(false);
    }

    useEffect(() => {
        const getApplications = async () => {
            await getUserApplications();
        }
        getApplications();
    },[])


    if(isLoading){
        return (
            <Loading />
        )
    }
    else if (userApplications.length > 0){
        return(
            <div className="container-fluid">
                <div className="row">
                    My Application's
                </div>
                <br />
                {
                    userApplications.map((element,key) => {
                        return(
                            <div className="row card p-4 mb-3">
                                <div className="col-sm-12 d-flex justify-content-between">
                                    <p className="ml-3 mt-2 flex-grow-1 bd-highlight" style={{color:"black"}}>Job Title</p>
                                    <span className="mr-2 mt-2" style={{color:"black"}}>Status</span>
                                    <span className="ml-3 mt-2" style={{color:"black"}}>Application Date</span>
                                </div>
                                <div className="col-sm-12 d-flex justify-content-between">
                                    <h5 className="ml-3 flex-grow-1 bd-highlight"> <a className="text-info" href={`/#/activeJobDetails/${element.openJob.id}`} > {element.openJob.jobName} </a> </h5>
                                    <h5 className="mr-5 text-info">{element.status} </h5>
                                    <h5  className="text-info">{element.applicationDate.split('T')[0]}</h5>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    else{
        return(
            <div className="container-fluid text-center">
                <h6 className="lead">You does not have any application!</h6>
                <br />
                <Icon className="mb-4" icon={sad} size={100} />
            </div>
        )
    }

}


export default UserApplications;