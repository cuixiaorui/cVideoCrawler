//生成短链接
const fetchUrl = 'http://suo.im/api.php?url=';
const fetch = require('../utils/fetch');
class ShortenURL{
    async apply(video,next){
        for(let i=0; i< video.data.length; i++){
            let list = video.data[i];
            for(let j=0; j<list.length; j++){
                let videoInfo = list[j];
                let result = await fetch(`${fetchUrl}${videoInfo.url}`);
                videoInfo.url = result;
            }
        }
        next();
    }
}

module.exports = (options)=>{
    return new ShortenURL(options);
}