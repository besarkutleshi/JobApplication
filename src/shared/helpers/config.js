import { useSelector } from 'react-redux'

function Config () {
    const user = useSelector((state) => state.login.user);
    const config = {
        headers:{
            Authorization: `Bearer ${user.token != "" ? user.token : ''}`
        }
    }
    return config;
}

export default Config;