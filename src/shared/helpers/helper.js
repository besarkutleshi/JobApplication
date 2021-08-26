
class Helper {

    constructor(){
        this.url = 'https://localhost:44323/api/'
    }


    validUsername = (email) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email) ? true : false;
    }

    getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        return today = mm + '/' + dd + '/' + yyyy;
    }

}
export default new Helper();