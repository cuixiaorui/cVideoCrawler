const sendMail = require('../utils/mail');
const util = require('util');
const pSendMail = util.promisify(sendMail);
let self;
class SendMail{
    constructor(options){
        this._options = options;
        self = this;
    }

    async apply(video,next){
        let data = JSON.stringify(video.data);
        let mailTitle = video.options.name + '请查收~';
        let r = await pSendMail(self._options.mailUser,mailTitle,data);
        next();
    }
}

module.exports = (options)=>{
    return new SendMail(options);
}