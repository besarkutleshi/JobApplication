import { notification } from 'antd';

function Notification(type, notificationTitle, description){
    return (
        notification[type]({
            message: notificationTitle,
            description:description,
        })
    )
}

export default Notification;