import React from 'react'
import '../style/loader.css'
import Loader from '../../images/loader.gif'
const Loading = () => {
    return(
        <div className="loading">
            <div className="d-flex justify-items-center align-items-center">
                <img src={Loader} className="mx-auto d-block" />
            </div>
        </div>
    )
}
export default Loading;