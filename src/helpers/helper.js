
class Helper {

    constructor(){
        this.url = 'https://localhost:44323/api/'
    }


    validUsername = (email) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email) ? true : false;
    }

}
export default new Helper();