import React, {useState,useEffect} from 'react'
import MUI from 'mui-datatables'
import applicantController from '../controllers/applicant.controller';
import Loading from '../../loader/components/loader';
import Icon from 'react-icons-kit'
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { Link } from 'react-router-dom';
const Applicants = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [applicants, setApplicants] = useState([]);

    const getApplicantProfiles = async () => {
        setIsLoading(true);
        let result = await applicantController.getApplicantProfiles();
        if(result){
            setApplicants(result);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const getApplicants = async () => await getApplicantProfiles();
        getApplicants();
    },[])


    if(isLoading){
        return(
            <Loading />
        )
    }
    else if (applicants.length > 0) {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <MUI 
                            title="All Applicants"
                            data={
                                applicants.map((element,key) => {
                                    let array = [ 
                                        <img id="my-img" 
                                            height="50px" width="50px" style={{borderRadius:"50%"}} 
                                            className="img-fluid" 
                                            src={`data:image/png;base64, ${element.imageBytes}`} 
                                            alt={`${element.name.substring(0,1)} ${element.surname.substring(0,1)}`} />
                                    ]
                                    .concat(
                                    [
                                        element.name,element.middleName,element.surname,element.personalNumber,element.address,element.email,element.phone,element.gender,
                                    ])
                                    .concat(
                                    [
                                        <Link to={{pathname:`/applicantDetails/${element.id}`,state:{id:element.id}}} className="btn btn-info"><Icon icon={arrowRight2}/></Link>
                                    ])
                                    return array;
                                })
                            }
                            columns = {["Image","Name","Middle Name","Surname","Personal Number","Address","Email","Phone","Gender","Details"]}
                        />
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="container-fluid text-center">
                <h5 className="text-muted lead">Does not have any applicant</h5>
            </div>
        )
    }


}

export default Applicants;