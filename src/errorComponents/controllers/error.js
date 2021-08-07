import ErrorAlert from "../../alerts/components/errorAlert";
import Notification from "../../alerts/components/notification";

class Error {

    returnError = (error) => {
        if(error.response.status === 401){
            Notification("error","Session Expired", "Session has expired, login again!")
            window.location.hash = "/login";
        }   
        else if (error.response.status === 400){
            ErrorAlert(error.response.data);
        }
        else if (error.response.status === 404) {
            ErrorAlert(error.response.data);
        }
        else if (error.response.status === 500){
            ErrorAlert(error.response.data);
        }
    }

}

export default new Error();