import axios from 'axios'
import Error from '../../error/controllers/error'
class EmailController {

    sendEmail = async (username,subject,body) => {
        try {
            let obj = {
                from:"",
                to:username,
                subject:subject,
                htmlBody:body,
                applicationId:1
            }
            let response = await axios.post('http://10.150.1.70:3001/api/emails/single',obj);
            return response.status === 200 ? true : false;
        } catch (error) {
            Error.returnError(error);
            return false;
        }
    }

}

export default new EmailController();