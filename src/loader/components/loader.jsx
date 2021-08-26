import React from 'react'
import '../style/loader.css'
import Loader from '../../images/loader.gif'
const Loading = () => {
    return(
        <div className="loading">
            <div className="">
                <img src={Loader} className="mx-auto d-block" />
            </div>
        </div>
    )
}
export default Loading;