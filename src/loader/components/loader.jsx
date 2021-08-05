import React from 'react'
import '../style/loader.css'

const Loading = () => {
    return(
        <div className="container-fluid">
            <div className="row" style={{ marginTop: '22%' }}>
                <div className="loader" style={{ float: 'none', margin: '0 auto' }}></div>
            </div>
        </div>
    )
}
export default Loading;