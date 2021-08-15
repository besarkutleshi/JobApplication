import React from 'react';
import ReactToPrint from 'react-to-print';
import Icon from 'react-icons-kit'
import { ComponentToPrint } from './userCVClass';
import { filePdf } from 'react-icons-kit/icomoon/filePdf'
class UserCVPrint extends React.PureComponent {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <ReactToPrint
                            trigger={() => {
                                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                // to the root node of the returned component as it will be overwritten.
                                return <a className="btn btn-danger text-white"> <Icon icon={filePdf} size={20} /> Download PDF</a>;
                            }}
                            content={() => this.componentRef}
                        />
                        <ComponentToPrint ref={el => (this.componentRef = el)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCVPrint;