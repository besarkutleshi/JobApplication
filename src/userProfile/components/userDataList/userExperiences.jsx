import React,{ useState, useEffect } from 'react'
import Icon from 'react-icons-kit'
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever'
import { ic_edit_location_outline } from 'react-icons-kit/md/ic_edit_location_outline'


const UserExperiences = () => {

    return(
        <div className="container-fluid">
            <div className="row">
                <p className="lead mb-2"> Software Developer Profile</p>
                <div className="col-sm-12 mb-2">
                    <div className="card">
                        <div className="d-flex justify-content-between mt-1">
                            <p className="lead p-3 ml-4" >1.</p>
                            <h6 className="lead p-3 ml-4 flex-grow-1 bd-highlight">Naj ekperienc</h6>
                            <button type="button" className="btn btn-secondary mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_edit_location_outline} /> </button>
                            <button type="button" className="btn btn-danger mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_delete_forever} /> </button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <p className="lead mb-2"> Business Analiyst Profile</p>
                <div className="col-sm-12 mb-2">
                    <div className="card">
                        <div className="d-flex justify-content-between mt-1">
                            <p className="lead p-3 ml-4" >1.</p>
                            <h6 className="lead p-3 ml-4 flex-grow-1 bd-highlight">Naj ekperienc</h6>
                            <button type="button" className="btn btn-secondary mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_edit_location_outline} /> </button>
                            <button type="button" className="btn btn-danger mr-4 mt-2" style={{ height: "40px", borderRadius: "20px" }}> <Icon icon={ic_delete_forever} /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default UserExperiences;