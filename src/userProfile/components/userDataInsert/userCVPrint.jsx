import React from 'react';
import ReactToPrint from 'react-to-print';
import Icon from 'react-icons-kit'
import { ComponentToPrint } from './userCVClass';
import { filePdf } from 'react-icons-kit/icomoon/filePdf'
import { useRef } from 'react';
import { useSelector } from 'react-redux'
import {profile as IconProfile} from 'react-icons-kit/icomoon/profile'
import {sad} from 'react-icons-kit/icomoon/sad'

// class UserCVPrint extends React.PureComponent {
//     render() {
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-sm-12">
//                         <ReactToPrint
//                             trigger={() => {
//                                 // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
//                                 // to the root node of the returned component as it will be overwritten.
//                                 return <a id="downloadCv" className="btn btn-danger text-white"> <Icon icon={filePdf} size={20} /> Download PDF</a>;
//                             }}
//                             content={() => this.componentRef}
//                         />
//                         <ComponentToPrint ref={el => (this.componentRef = el)} />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

const UserCVPrint = () => {

    const userCVRef = useRef();
    const profile = useSelector((state) => state.profile.profile);

    if(profile){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <ReactToPrint
                            trigger={() => {
                                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                // to the root node of the returned component as it will be overwritten.
                                return <a id="downloadCv" className="btn btn-danger text-white"> <Icon icon={filePdf} size={20} /> Download PDF</a>
                            }}
                            content={() => userCVRef.current}
                        />
                        <ComponentToPrint ref={userCVRef} />
                    </div>
                </div>
            </div>
        );
    }
    else{
        return(
            <div className="container-fluid text-center">
                <div className="row  d-flex justify-content-center">
                    <div className="col-sm-4">
                        <h6 className="lead">You does not have profile, please create one!</h6>
                        <br />
                        <Icon className="mb-4" icon={sad} size={100} />
                        <br />
                        <a href="/#/createProfile" className="btn btn-primary"> <Icon icon={IconProfile} size={20} className="mr-3"/> Create Profile</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserCVPrint;