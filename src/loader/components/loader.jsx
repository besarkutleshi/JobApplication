// import React from 'react'
// import '../style/loader.css'

// const Loading = () => {
//     return(
//         <div className="container-fluid">
//             <div className="row" style={{ marginTop: '22%' }}>
//                 <div className="loader" style={{ float: 'none', margin: '0 auto' }}></div>
//             </div>
//         </div>
//     )
// }
// export default Loading;

import React from 'react'
import '../style/loader.css'
import Loader from '../../images/loader.gif'
const Loading = () => {
    return(
        <div className="d-flex justify-content-center align-content-center" style={{marginTop:"20%"}}>
            <img src={Loader} className="mx-auto d-block" />
        </div>
    )
}
export default Loading;