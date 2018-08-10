const sendMail = require('../utils/mail');
const util = require('util');
const pSendMail = util.promisify(sendMail);
class SendMail{
    constructor(options){
        this._options = options;
    }

    async apply(video,next){
        let data = JSON.stringify(video.data);
        let mailTitle = video.options.name + '请查收~';
        let r = await pSendMail(this._options.mailUser,mailTitle,data);
        next();
    }
}

module.exports = SendMail;