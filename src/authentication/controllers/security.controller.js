import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js';

class SecurityController {

    encrypt = (text) => {
        var key = CryptoJS.enc.Utf8.parse('b3$@r1$@m$un6***');  
        var iv = CryptoJS.enc.Utf8.parse('A0C6G0RC3(*@_)%)');  
        var encryptedpassword = AES.encrypt(CryptoJS.enc.Utf8.parse(text), key,  
        { 
            keySize: 128 / 8,   
            iv: iv,  
            mode: CryptoJS.mode.CBC,  
            padding: CryptoJS.pad.Pkcs7
        }); 
        return encryptedpassword.toString();
    }

}

export default new SecurityController();