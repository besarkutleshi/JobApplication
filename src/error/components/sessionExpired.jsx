import React from 'react'
import Notification from '../../alerts/components/notification'

const SessionExpired = () => {

    return Notification("error","Session Expired", "Session has expired, please go to login page and login again!")

    // return <Notification type="error" notificationTitle="Session Expired" description="Session has expired, please go to login page and login again!" />

}

export default SessionExpired;